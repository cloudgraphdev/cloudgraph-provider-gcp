import { DNS } from '@google-cloud/dns'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { listData }  from '../../utils/fetchUtils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'API Key'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpApiKey {
  id: string
  projectId: string
  region?: string
  name?: string
  uid?: string
  displayName?: string
  keyString?: string
  createTime?: string
  updateTime?: string
  deleteTime?: string
  restrictions?: {
    apiTargets?: {
      service?: string
      methods?: string[]
    }[]
    browserKeyRestrictions?: {
      allowedReferrers?: string[]
    }
    serverKeyRestrictions?: {
      allowedIps?: string[]
    }
    androidKeyRestrictions?: {
      allowedApplications?: {
        sha1Fingerprint?: string
        packageName?: string
      }[]
    }
    iosKeyRestrictions?: {
      allowedBundleIds?: string[]
    }
  }
  etag?: string
}

export default async ({
  config,
  regions,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpApiKey[]
}> => {
  const keyList: RawGcpApiKey[] = []
  const { projectId } = config
  const allRegions = regions.split(',').concat([GLOBAL_REGION])

  for (const region of allRegions) {
    try {
      const service = new DNS({ ...config, apiEndpoint })
      const data = await listData({
        service,
        apiUri: `https://apikeys.googleapis.com/v2/projects/${projectId}/locations/${region}/keys`,
        dataFieldName: 'keys',
      })
      for (const instance of data) {
        keyList.push({
          id: instance.uid,
          projectId: config.projectId,
          ...instance,
          region: GLOBAL_REGION,
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'apikeys:listKeys', error)
    }
  }

  logger.debug(lt.foundResources(serviceName, keyList.length))
  return groupBy(keyList, 'region')
}
