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
const serviceName = 'Log Bucket'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpLogBucket extends google.logging.v2.ILogBucket {
  id: string
  projectId: string
  region: string
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpLogBucket[]
}> =>
  new Promise(async resolve => {
    const bucketList: RawGcpLogBucket[] = []
    const { projectId } = config
    const allRegions = regions.split(',').concat([GLOBAL_REGION])
    for (const region of allRegions) {
      /**
       * Get all of the Log Buckets
       */
      try {
        const loggingClient = new Logging({ ...config, apiEndpoint });
        const iterable = loggingClient.configService.listBucketsAsync({
          parent: `projects/${projectId}/locations/${region}`,
        })
        // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
        for await (const response of iterable) {
          if (response) {
            bucketList.push({
              id: response.name,
              ...response,
              projectId,
              region: GLOBAL_REGION,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'logging:listBucketsAsync', error)
      }
    }

    logger.debug(lt.foundLogBuckets(bucketList.length))
    resolve(groupBy(bucketList, 'region'))
  })
