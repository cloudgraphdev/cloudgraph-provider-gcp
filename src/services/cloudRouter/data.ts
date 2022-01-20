import groupBy from 'lodash/groupBy'
import { RoutersClient } from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Cloud Router'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpCloudRouter extends 
Omit<google.cloud.compute.v1.IRouter, 'id' | 'region' | 'network'> {
  id: string,
  region: string,
  projectId: string,
  network: string[],
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpCloudRouter[]
}> => {
  const { projectId } = config

  const routerData: RawGcpCloudRouter[] = []
  const computeClient = new RoutersClient({ ...config, apiEndpoint })
  const allRegions = regions.split(',')
  for (const region of allRegions) {
    try {
      const cloudRoutersIter = computeClient.listAsync({
        project: projectId,
        region,
      })
      for await (const {id, network, ...cloudRouter} of cloudRoutersIter) {
        routerData.push({
          id: id.toString(),
          projectId,
          ...cloudRouter,
          region,
          network: [network]
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'cloud router:listAsync', error)
    }
  }

  logger.debug(lt.foundResources(serviceName, routerData.length))

  return groupBy(routerData, 'region')
}
