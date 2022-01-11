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
const serviceName = 'VPC Network'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpNetwork extends google.cloud.compute.v1.INetwork {
  id: string
  projectId: string
  region: string
  subnet: string[]
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpNetwork[]
}> =>
  new Promise(async resolve => {
    const networksList: RawGcpNetwork[] = []
    const { projectId } = config

    /**
     * Get all VPC Networks
     */
    try {
      const networksClient = new compute.NetworksClient({ ...config, apiEndpoint });
      const iterable = networksClient.listAsync({
        project: projectId
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          networksList.push({
            ...response,
            id: response.id?.toString() || cuid(),
            subnet: response.subnetworks,
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'network:listAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, networksList.length))
    resolve(groupBy(networksList, 'region'))
  })
