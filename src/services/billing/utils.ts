import { head, sumBy } from 'lodash'
import { costInterface } from './data'

export interface RawGcpUsageTime {
  value: string
}

export interface RawGcpUsageDetail {
  billingAccountId?: string
  service?: string
  usageStartTime?: RawGcpUsageTime
  usageEndTime?: RawGcpUsageTime
  cost?: number
  currency?: string
}

export interface RawGcpTotalCost {
  service?: string
  currency?: string
  total?: number
}

export const totalCostQuery = (
  billingTable: string,
  startDate: string,
  endDate: string,
): string => {
  return `SELECT
  currency,
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
                  FROM UNNEST(credits) c
                  WHERE c.amount > 0), 0))
    AS total
  FROM \`${billingTable}\`
  WHERE \`usage_start_time\` >= TIMESTAMP('${startDate}') AND \`usage_end_time\` < TIMESTAMP(DATE_ADD(DATE '${endDate}', INTERVAL 1 DAY))
  GROUP BY 1
  ORDER BY 1 ASC`
}

export const totalCostGroupByServiceQuery = (
  billingTable: string,
  startDate: string,
  endDate: string,
): string => {
  return `SELECT
  service.description as \`service\`,
  currency,
  SUM(cost)
    + SUM(IFNULL((SELECT SUM(c.amount)
                  FROM UNNEST(credits) c
                  WHERE c.amount > 0), 0))
    AS total
  FROM \`${billingTable}\`
  WHERE \`usage_start_time\` >= TIMESTAMP('${startDate}') AND \`usage_end_time\` < TIMESTAMP(DATE_ADD(DATE '${endDate}', INTERVAL 1 DAY))
  GROUP BY 1,2
  ORDER BY 1 ASC`
}

export const formatCostData = (costData: {
  [key: string]: costInterface
}): {
  name: string
  cost?: number
  currency?: string
  formattedCost?: string
}[] =>
  Object.keys(costData).map(name => ({
    name,
    ...costData[name],
  }))

export const getRoundedAmount = (amount: number): number =>
  Math.round((amount + Number.EPSILON) * 100) / 100

export const formatAmmountAndUnit = ({
  Amount: amount = 0,
  Unit: currency = 'USD',
}: {
  Amount?: number
  Unit?: string
}): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    getRoundedAmount(amount)
  )

export const getTotalCost = (usages: RawGcpTotalCost[]): number => {
  const cost = sumBy(usages, usage => {
    return usage.total
  })

  return getRoundedAmount(cost)
}

export const getCurrency = (usages: RawGcpTotalCost[]): string =>
  head(usages).currency