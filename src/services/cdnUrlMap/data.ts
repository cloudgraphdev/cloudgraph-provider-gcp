import groupBy from 'lodash/groupBy'
import CloudGraph from '@cloudgraph/sdk'
import { UrlMapsClient } from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'CDN Url Map'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpCdnUrlMap extends Omit<google.cloud.compute.v1.IUrlMap, 'id'>    {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpCdnUrlMap[]
}> => {
  const urlMaps: RawGcpCdnUrlMap[] = []
  const { projectId } = config

  const computeClient = new UrlMapsClient({ ...config, apiEndpoint })

  try {
    const urlMapIter = computeClient.listAsync({project: projectId})
    for await (const urlMap of urlMapIter) {
      urlMaps.push({
        ...urlMap,
        id: urlMap.id.toString(),
        projectId,
        region: GLOBAL_REGION,
      }) 
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'cdnUrlMap:listAsync', error)
  }

  logger.debug(lt.foundResources(serviceName, urlMaps.length))

  return groupBy(urlMaps, 'region')
}
