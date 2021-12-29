import cuid from 'cuid'
import compute from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Firewall'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpFirewall extends google.cloud.compute.v1.IFirewall {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpFirewall[]
}> =>
  new Promise(async resolve => {
    const firewallList: RawGcpFirewall[] = []
    const { projectId } = config

    /**
     * Get all Firewalls
     */
    try {
      const firewallsClient = new compute.FirewallsClient({ ...config, apiEndpoint });
      const iterable = firewallsClient.listAsync({
        project: projectId
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          firewallList.push({
            ...response,
            id: response.id?.toString() || cuid(),
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'firewall:listAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, firewallList.length))
    resolve(groupBy(firewallList, 'region'))
  })
