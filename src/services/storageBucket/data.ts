import { Storage, GetBucketsRequest } from '@google-cloud/storage'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import regions from '../../enums/regions'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Storage Bucket'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpStorageBucket { 
  id: string
  projectId: string
  region: string
  metadata: any
  baseUrl?: string
  name: string
  iam: any
  pollIntervalMs?: number
  userProject?: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpStorageBucket[]
}> =>
  new Promise(async resolve => {
    const bucketList: RawGcpStorageBucket[] = []
    const { projectId } = config

    /**
     * Get all Storage Buckets
     */
    try {
      const reqOpts: GetBucketsRequest = { autoPaginate: true, project: projectId }
      const storageClient = new Storage({ ...config, apiEndpoint })
      const [buckets] = await storageClient.getBuckets(reqOpts)
      for (const bucket of buckets) {
        const location = bucket.metadata.location?.toLowerCase()
        bucketList.push({
          id: bucket.name,
          ...bucket,
          projectId,
          region: regions.includes(location) ? location : GLOBAL_REGION,
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'storage:getBuckets', error)
    }

    logger.debug(lt.foundResources(serviceName, bucketList.length))
    resolve(groupBy(bucketList, 'region'))
  })
