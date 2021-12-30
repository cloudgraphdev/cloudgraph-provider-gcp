import { ConnectionServiceClient } from '@google-cloud/bigquery-connection'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/bigquery-connection/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery'
const apiEndpoint = initTestEndpoint(serviceName)


export interface RawGcpBigqueryConnection extends google.cloud.bigquery.connection.v1.IConnection {
  projectId: string
  region: string
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigqueryConnection[]
}> => {
  const connectionClient = new ConnectionServiceClient({ ...config, apiEndpoint })
  const { projectId } = config
  const connectionResult: RawGcpBigqueryConnection[] = []
  const allRegions = regions.split(',')
  try {
    for (const region of allRegions) {
      const parent = connectionClient.locationPath(config.projectId, region)

      const connectionIter = connectionClient.listConnectionsAsync({parent})
      for await (const connection of connectionIter) {
        connectionResult.push({
          ...connection,
          projectId,
          region,
        })
      }
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'bigquery:getDatasetsStream', error)
  }
  // TODO 
  // logger.debug(lt.foundVpcs(datasetsResult.length))
  return groupBy(connectionResult, 'region')
}
