import groupBy from 'lodash/groupBy'
import CloudGraph from '@cloudgraph/sdk'
import { BackendBucketsClient } from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'CDN Backend Bucket'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpCdnBackendBucket extends Omit<google.cloud.compute.v1.IBackendBucket, 'id'>    {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpCdnBackendBucket[]
}> => {
    const backendBuckets: RawGcpCdnBackendBucket[] = []
    const { projectId } = config

    const computeClient = new BackendBucketsClient({ ...config, apiEndpoint })

    try {
      const backendBucketIter = computeClient.listAsync({project: projectId})
      for await (const backendBucket of backendBucketIter) {
        backendBuckets.push({
          ...backendBucket,
          id: backendBucket.id.toString(),
          projectId,
          region: GLOBAL_REGION,
        }) 
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'cdnBackendBucket:listAsync', error)
    }

    logger.debug(lt.foundResources(serviceName, backendBuckets.length))

  return groupBy(backendBuckets, 'region')
}
