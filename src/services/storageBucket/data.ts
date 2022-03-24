import { Storage, GetBucketsRequest } from '@google-cloud/storage'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpCredentials, GcpServiceInput } from '../../types'
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
  labels?: {
    [key: string]: string
  }
}

export const listStorageBucketsData = async (
  config: GcpCredentials,
  bucketList: RawGcpStorageBucket[]
): Promise<void> =>
  new Promise(async resolve => {
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
          labels: bucket?.metadata?.labels,
          region: regions.includes(location) ? location : GLOBAL_REGION,
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'storage:getBuckets', error)
    }
    resolve()
  })

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpStorageBucket[]
}> =>
  new Promise(async resolve => {
    const bucketList: RawGcpStorageBucket[] = []

    await listStorageBucketsData(config, bucketList)

    logger.debug(lt.foundResources(serviceName, bucketList.length))
    resolve(groupBy(bucketList, 'region'))
  })
