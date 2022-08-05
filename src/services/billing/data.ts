import CloudGraph from '@cloudgraph/sdk'
import { BigQuery, RowMetadata } from '@google-cloud/bigquery'
import * as _ from 'lodash'
import { GLOBAL_REGION } from '../../config/constants'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import {
  createDiffSecs,
  getCurrentDayOfMonth,
  getDaysAgo,
  getFirstDayOfMonth,
} from '../../utils/dateutils'
import {
  formatAmmountAndUnit,
  getCurrency,
  getTotalCost,
  RawGcpTotalCost,
  totalCostQuery,
  totalCostGroupByServiceQuery,
} from './utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Billing'
const apiEndpoint = initTestEndpoint(serviceName)

export interface costInterface {
  cost?: number
  currency?: string
  formattedCost?: string
}

export interface RawGcpBilling {
  totalCostLast30Days: costInterface
  totalCostMonthToDate: costInterface
  monthToDateDailyAverage: { [key: string]: costInterface }
  last30DaysDailyAverage: { [key: string]: costInterface }
  monthToDate: { [key: string]: costInterface }
  last30Days: { [key: string]: costInterface }
  individualData: { [key: string]: costInterface }
}

export const listBillingData = async (
  client: BigQuery,
  projectId: string,
  billings: RawGcpTotalCost[],
  billingAccountId: string,
  dataset: string,
  groupBy?: boolean,
  startDate?: string,
  endDate?: string
): Promise<void> =>
  new Promise<void>(async resolve => {
    try {
      const billingTable = `${projectId}.${dataset}.gcp_billing_export_resource_v1_${billingAccountId}`

      let sqlQuery = ''
      if (groupBy) {
        sqlQuery = totalCostGroupByServiceQuery(billingTable, startDate, endDate)
      } else {
        sqlQuery = totalCostQuery(billingTable, startDate, endDate)
      }

      const options = {
        query: sqlQuery,
      }

      // Run the query
      const [rows] = await client.query(options)

      if (!_.isEmpty(rows)) {
        billings.push(...rows)
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'bigQuery:getTotalCost', error)
    }

    resolve()
  })

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBilling[]
}> => {
  const startDate = new Date()
  const region = GLOBAL_REGION
  const results: RawGcpBilling = {
    totalCostLast30Days: {},
    totalCostMonthToDate: {},
    monthToDateDailyAverage: {},
    last30DaysDailyAverage: {},
    monthToDate: {},
    last30Days: {},
    individualData: {},
  }
  const resultPromises = []
  const {
    projectId,
    billing: { billingAccountId, bigQueryDataset },
  } = config

  try {
    const client = new BigQuery({ ...config, apiEndpoint })

    const listAggregateFinOpsData = async ({
      resolve,
      type,
      groupBy = true,
      individualData = false,
      timePeriod: TimePeriod,
    }: {
      resolve: () => void
      type: string
      groupBy?: boolean
      individualData?: boolean
      timePeriod: { Start: string; End: string }
    }): Promise<void> => {
      logger.debug(lt.queryingAggregateFinOpsDataForRegion(region, type))
      const billingData: RowMetadata[] = []

      await listBillingData(
        client,
        projectId,
        billingData,
        billingAccountId,
        bigQueryDataset,
        groupBy,
        TimePeriod.Start,
        TimePeriod.End
      )

      if (_.isEmpty(billingData)) {
        logger.debug(lt.unableToFindFinOpsAggregateData)
        return resolve()
      }

      if (groupBy || individualData) {
        const services = _.groupBy(billingData, u => u.service)
        Object.keys(services).map(name => {
          const serviceUsages = services[name]
          const currency = getCurrency(serviceUsages)
          const cost = getTotalCost(serviceUsages)
          const costData = {
            cost,
            currency,
            formattedCost: formatAmmountAndUnit({
              Amount: cost,
              Unit: currency,
            }),
          }
          if (individualData) {
            results.individualData[name] = costData
          } else {
            results[type][name] = costData
          }
        })
      } else {
        const currency = getCurrency(billingData)
        const cost = getTotalCost(billingData)
        results[type] = {
          cost,
          currency,
          formattedCost: formatAmmountAndUnit({
            Amount: cost,
            Unit: currency,
          }),
        }
      }

      resolve()
    }

    /**
     * Now we make 4 queries to the api in order to get aggregate pricing data sliced in various ways
     */

    const today = new Date().toLocaleDateString('en-ca')
    const startOfMonth = getFirstDayOfMonth()

    const commonArgs = {
      timePeriod: {
        Start: getDaysAgo(60), // TODO: change to 30 !!!
        End: today,
      },
    }

    /**
     * Breakdown by service types and spend for last 30 days
     */
    const last30DaysData = new Promise<void>(resolve =>
      listAggregateFinOpsData({
        ...commonArgs,
        resolve,
        type: 'last30Days',
      })
    )
    resultPromises.push(last30DaysData)

    /**
     * Breakdown by service types and spend since the beginning of the month
     */
    if (!(today === startOfMonth)) {
      const monthToDateData = new Promise<void>(resolve =>
        listAggregateFinOpsData({
          resolve,
          type: 'monthToDate',
          timePeriod: {
            Start: startOfMonth,
            End: today,
          },
        })
      )
      resultPromises.push(monthToDateData)
    }

    /**
     * The single total cost of everything in the last 30 days
     */
    const totalCostLast30Days = new Promise<void>(resolve =>
      listAggregateFinOpsData({
        ...commonArgs,
        resolve,
        type: 'totalCostLast30Days',
        groupBy: false,
      })
    )
    resultPromises.push(totalCostLast30Days)

    /**
     * The single total cost of everything in the current month
     */
    if (!(today === startOfMonth)) {
      const totalCostMonthToDate = new Promise<void>(resolve =>
        listAggregateFinOpsData({
          resolve,
          type: 'totalCostMonthToDate',
          groupBy: false,
          timePeriod: {
            Start: startOfMonth,
            End: today,
          },
        })
      )
      resultPromises.push(totalCostMonthToDate)
    }

    const individualDataPromise = new Promise<void>(resolve =>
      listAggregateFinOpsData({
        resolve,
        type: 'individualData',
        individualData: true,
        timePeriod: {
          Start: getDaysAgo(1), // i.e. get the daily cost
          End: today,
        },
      })
    )
    resultPromises.push(individualDataPromise)

    await Promise.all(resultPromises)

    /**
     * Create Daily Averages
     */

    const createDailyAverage = ({
      days,
      resultMonthlyData,
      resultAverageData,
    }): void[] =>
      Object.keys(resultMonthlyData).map(service => {
        const { cost: aggregateCost, currency } = resultMonthlyData[service]
        const cost = parseFloat((aggregateCost / days).toFixed(10))
        results[resultAverageData][service] = {
          cost,
          currency,
          formattedCost: formatAmmountAndUnit({ Amount: cost, Unit: currency }),
        }
      })

    if (!_.isEmpty(results.monthToDate)) {
      createDailyAverage({
        days: parseInt(getCurrentDayOfMonth(), 10),
        resultMonthlyData: results.monthToDate,
        resultAverageData: 'monthToDateDailyAverage',
      })
    }
    if (!_.isEmpty(results.last30Days)) {
      createDailyAverage({
        days: 30,
        resultMonthlyData: results.last30Days,
        resultAverageData: 'last30DaysDailyAverage',
      })
    }

    logger.debug(lt.doneFetchingAggregateFinOpsData(createDiffSecs(startDate)))
    return { [region]: [results] }
  } catch (e) {
    logger.error(e)
  }

  logger.debug(lt.doneFetchingAggregateFinOpsData(createDiffSecs(startDate)))
  return { [region]: [results] }
}
