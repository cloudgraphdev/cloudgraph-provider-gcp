import { v2 } from '@google-cloud/logging'
import { google } from '@google-cloud/logging/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Log Metric'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpLogMetric extends google.logging.v2.ILogMetric {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpLogMetric[]
}> =>
  new Promise(async resolve => {
    const metricList: RawGcpLogMetric[] = []
    const { projectId } = config

    /**
     * Get all of the Log Metrics
     */
    try {
      const loggingClient = new v2.MetricsServiceV2Client({ ...config, apiEndpoint });
      const iterable = loggingClient.listLogMetricsAsync({
        parent: `projects/${projectId}`,
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          metricList.push({
            id: response.name,
            ...response,
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'logging:listLogMetricsAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, metricList.length))
    resolve(groupBy(metricList, 'region'))
  })
