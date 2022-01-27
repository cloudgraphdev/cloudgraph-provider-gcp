import { Logging } from '@google-cloud/logging'
import { google } from '@google-cloud/logging/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Log Sink'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpLogSink extends google.logging.v2.ILogSink {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpLogSink[]
}> =>
  new Promise(async resolve => {
    const sinkList: RawGcpLogSink[] = []
    const { projectId } = config
    /**
     * Get all of the Log Sinks
     */
    try {
      const loggingClient = new Logging({ ...config, apiEndpoint })
      const iterable = loggingClient.configService.listSinksAsync({
        parent: `projects/${projectId}`,
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          sinkList.push({
            id: response.name,
            projectId,
            ...response,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'logging:listSinksAsync', error)
    }

    logger.debug(lt.foundLogSinks(sinkList.length))
    resolve(groupBy(sinkList, 'region'))
  })
