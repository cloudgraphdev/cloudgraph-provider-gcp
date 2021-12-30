import { BigQuery } from '@google-cloud/bigquery'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { RawGcpBigqueryDataset } from './types'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery'
const apiEndpoint = initTestEndpoint(serviceName)

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigqueryDataset[]
}> => {
  const bigqueryClient = new BigQuery({ ...config, apiEndpoint })

  const datasetsResult: RawGcpBigqueryDataset[] = []
  const allRegions = regions.split(',')
  try {
    const dataSetIter = bigqueryClient.getDatasetsStream()
    for await (const dataSetResponse of dataSetIter) {
      if (allRegions.includes(dataSetResponse.location)) {
        const dsMetaData = dataSetResponse.metadata
        const result = {
          ...dsMetaData,
          region: dataSetResponse.location,
          Labels: dataSetResponse.labels,
          tables: [],
        }
        try {
          const tableIter = dataSetResponse.getTablesStream()
          for await (const tableResponse of tableIter) {
            result.tables.push(tableResponse.metadata)
          }
          datasetsResult.push(result)
        } catch (error) {
          generateGcpErrorLog(serviceName, 'bigquery:getTablesStream', error)
        }
      }
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'bigquery:getDatasetsStream', error)
  }

  logger.debug(lt.foundResources(serviceName, datasetsResult.length))
  return groupBy(datasetsResult, 'region')
}
