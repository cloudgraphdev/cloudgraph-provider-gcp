import bigqueryDataTransfer from '@google-cloud/bigquery-data-transfer'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/bigquery-data-transfer/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { RawGcpBigqueryDataTransfer } from '../bigqueryDataTransfer/data'
import services from '../../enums/services'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery Data Transfer Run'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpBigqueryDataTransferRun extends google.cloud.bigquery.datatransfer.v1.ITransferRun {
  id: string
  projectId: string
  dataTransferId: string
  region: string
}

export default async ({
  regions,
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigqueryDataTransferRun[]
}> => {
  
  const dataTransferClient = new bigqueryDataTransfer.v1.DataTransferServiceClient({ ...config, apiEndpoint })
  const { projectId } = config
  const dataTransferRunResult = []
  const allRegions = regions.split(',')

  for (const region of allRegions) {
    /**
     * Find BigQuery Data Transfer
     */
    const dataTransferConfigs: RawGcpBigqueryDataTransfer[] = 
      rawData.find(({ name }) => name === services.bigqueryDataTransfer)?.data[region] || []

    for (const dataTransferConfig of dataTransferConfigs) {
      try {
        const dataTransferRunsIter = dataTransferClient.listTransferRunsAsync({
          parent: dataTransferConfig.name
        })
        for await (const dataTransferRun of dataTransferRunsIter) {
          dataTransferRunResult.push({
            id: dataTransferRun.name,
            ...dataTransferRun,
            projectId,
            dataTransferId: dataTransferConfig.id,
            region,
          })
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'bigqueryDataTransferRun:listTransferRunsAsync', error)
      }
    }
  }

  logger.debug(lt.foundResources(serviceName, dataTransferRunResult.length))
  return groupBy(dataTransferRunResult, 'region')
}
