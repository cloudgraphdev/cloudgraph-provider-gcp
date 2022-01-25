import groupBy from 'lodash/groupBy'
import CloudGraph from '@cloudgraph/sdk'
import { BackendServicesClient } from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'CDN Backend Service'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpCdnBackendService extends Omit<google.cloud.compute.v1.IBackendService, 'id' | 'network'>    {
  id: string
  projectId: string
  region: string
  network: string[]
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpCdnBackendService[]
}> => {
  const backendServices: RawGcpCdnBackendService[] = []
  const { projectId } = config

  const computeClient = new BackendServicesClient({ ...config, apiEndpoint })

  try {
    const backendServiceIter = computeClient.listAsync({project: projectId})
    for await (const backendService of backendServiceIter) {
      backendServices.push({
        ...backendService,
        id: backendService.id.toString(),
        projectId,
        region: GLOBAL_REGION,
        network: backendService.network? [backendService.network] : [],
      }) 
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'cdnBackendService:listAsync', error)
  }

  logger.debug(lt.foundResources(serviceName, backendServices.length))

  return groupBy(backendServices, 'region')
}
