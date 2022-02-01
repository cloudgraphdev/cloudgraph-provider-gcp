import { Logging } from '@google-cloud/logging'
import { google } from '@google-cloud/logging/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import { isEmpty, groupBy } from 'lodash'

import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import services from '../../enums/services'
import { listLogBucketData, RawGcpLogBucket } from '../logBucket/data'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Log View'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpLogView extends google.logging.v2.ILogView {
  id: string
  bucketName: string
  projectId: string
  region: string
}

export default async ({
  config,
  regions,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpLogView[]
}> =>
  new Promise(async resolve => {
    const viewList: RawGcpLogView[] = []
    const { projectId } = config
    const allRegions = regions.split(',').concat([GLOBAL_REGION])
    const loggingClient = new Logging({ ...config, apiEndpoint })

    for (const region of allRegions) {
      /**
       * Find Log Buckets
       */
      const buckets: RawGcpLogBucket[] =
        rawData.find(({ name }) => name === services.logBucket)?.data[region] ||
        []

      if (isEmpty(buckets)) {
        // Refresh data
        await listLogBucketData(loggingClient, projectId, region, buckets)
      }

      for (const { name } of buckets) {
        /**
         * Get all of the Log Views
         */
        try {
          const iterable = loggingClient.configService.listViewsAsync({
            parent: name,
          })
          // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
          for await (const response of iterable) {
            if (response) {
              viewList.push({
                id: response.name,
                ...response,
                bucketName: name,
                projectId,
                region,
              })
            }
          }
        } catch (error) {
          generateGcpErrorLog(serviceName, 'logging:listViewsAsync', error)
        }
      }
    }

    logger.debug(lt.foundLogViews(viewList.length))
    resolve(groupBy(viewList, 'region'))
  })
