import cuid from 'cuid'
import compute from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Subnet'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpSubnet extends Omit<google.cloud.compute.v1.ISubnetwork, 'network'> {
  id: string
  projectId: string
  region: string
  network: string[]
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpSubnet[]
}> =>
  new Promise(async resolve => {
    const subnetList: RawGcpSubnet[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      /**
       * Get all Subnets
       */
      try {
        const subnetClient = new compute.SubnetworksClient({ ...config, apiEndpoint });
        const iterable = subnetClient.listAsync({
          project: projectId, region,
        })
        // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
        for await (const response of iterable) {
          if (response) {
            subnetList.push({
              ...response,
              id: response.id?.toString() || cuid(),
              network: [response.network],
              projectId,
              region,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'subnet:listAsync', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, subnetList.length))
    resolve(groupBy(subnetList, 'region'))
  })
