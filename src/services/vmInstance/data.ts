import cuid from 'cuid'
import compute from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import zones from '../../enums/zones'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'VM Instance'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpVmInstance extends google.cloud.compute.v1.IInstance {
  id: string
  projectId: string
  region: string
  network: string[]
  subnet: string[]
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpVmInstance[]
}> =>
  new Promise(async resolve => {
    const vmList: RawGcpVmInstance[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      for (const zone of zones.filter(zone => zone.indexOf(region) !== -1)) {
        /**
         * Get all the VM Instances
         */
        try {
          const instancesClient = new compute.InstancesClient({ ...config, apiEndpoint });
          const iterable =  instancesClient.listAsync({
            project: projectId,
            zone,
          })
          // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
          for await (const response of iterable) {
            if (response) {
              vmList.push({
                ...response,
                id: response.id?.toString() || cuid(),
                network: response.networkInterfaces?.map(ni => ni?.network),
                subnet: response.networkInterfaces?.map(ni => ni?.subnetwork),
                projectId,
                region,
              })
            }
          }
        } catch (error) {
          generateGcpErrorLog(serviceName, 'instance:listAsync', error)
        }
      }
    }

    logger.debug(lt.foundResources(serviceName, vmList.length))
    resolve(groupBy(vmList, 'region'))
  })
