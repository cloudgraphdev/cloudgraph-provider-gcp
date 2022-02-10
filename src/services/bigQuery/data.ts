import { DNS } from '@google-cloud/dns'
import bigquery from '@google-cloud/bigquery/build/src/types'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import gcpLoggerText from '../../properties/logger'
import { GcpCredentials, GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { listData }  from '../../utils/fetchUtils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery Dataset'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpBigQueryDataset extends bigquery.IDataset {
  projectId: string
  region: string
  tables: RawGcpBigQueryTable[]
}

export interface RawGcpBigQueryTable extends bigquery.ITable {
  projectId: string
  region: string
}

export const listBigQueryDatasets = async (
  config: GcpCredentials,
  datasetsResult: RawGcpBigQueryDataset[]
): Promise<void> =>
  new Promise(async resolve => {
    const { projectId } = config

    try {
      const service = new DNS({ ...config, apiEndpoint })
      const dataSetlist = await listData({
        service,
        apiUri: `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets`,
        dataFieldName: 'datasets',
      })

      for (const { datasetReference } of dataSetlist) {
        const dataSetResponse = await listData({
          service,
          apiUri: `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetReference?.datasetId}`,
        })

        if (!isEmpty(dataSetResponse)) {
          const result = {
            ...dataSetResponse[0],
            region: dataSetResponse[0].location,
            tables: [],
            projectId,
          }

          const tableResponse = await listData({
            service,
            apiUri: `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetReference?.datasetId}/tables`,
            dataFieldName: 'tables',
          })

          for (const table of tableResponse) {
            result.tables.push(table)
          }
          datasetsResult.push(result)
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'bigquery:datasets', error)
    }
    resolve()
  })

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigQueryDataset[]
}> =>
  new Promise(async resolve => {
    const datasetsResult: RawGcpBigQueryDataset[] = []

    await listBigQueryDatasets(config, datasetsResult)

    logger.debug(lt.foundResources(serviceName, datasetsResult.length))
    resolve(groupBy(datasetsResult, 'region'))
  })
