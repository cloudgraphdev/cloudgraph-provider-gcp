import bigqueryDataTransfer from '@google-cloud/bigquery-data-transfer'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/bigquery-data-transfer/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { MULTI_REGIONS } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery Data Transfer'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpBigQueryDataTransfer extends google.cloud.bigquery.datatransfer.v1.ITransferConfig {
  id: string
  projectId: string
  region: string
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigQueryDataTransfer[]
}> => {
  const dataTransferClient = new bigqueryDataTransfer.v1.DataTransferServiceClient({ ...config, apiEndpoint })
  const { projectId } = config
  const dataTransferResult: RawGcpBigQueryDataTransfer[] = []
  const allRegions = regions.split(',').concat(MULTI_REGIONS)
  try {
    for (const region of allRegions) {
      const parent = dataTransferClient.projectPath(projectId)
      const dataTransferConfigsIter = dataTransferClient.listTransferConfigsAsync({
        parent: `${parent}/locations/${region}`,
      })
      for await (const dataTransferConfig of dataTransferConfigsIter) {
        dataTransferResult.push({
          id: dataTransferConfig.name,
          ...dataTransferConfig,
          projectId,
          region,
        })
      }

    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'bigQueryDataTransfer:listTransferConfigsAsync', error)
  }

  logger.debug(lt.foundResources(serviceName, dataTransferResult.length))
  return groupBy(dataTransferResult, 'region')
}
