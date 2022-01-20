import cuid from 'cuid'
import { TargetSslProxiesClient } from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Target SSL Proxy'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpTargetSslProxy extends google.cloud.compute.v1.ITargetSslProxy {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpTargetSslProxy[]
}> =>
  new Promise(async resolve => {
    const proxyList: RawGcpTargetSslProxy[] = []
    const { projectId } = config

    /**
     * Get all the Target SSL Proxies
     */
    try {
      const computeClient = new TargetSslProxiesClient({ ...config, apiEndpoint });
      const iterable =  computeClient.listAsync({
        project: projectId,
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          proxyList.push({
            ...response,
            id: response.id?.toString() || cuid(),
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'targetSslProxies:listAsync', error)
    }

    logger.debug(lt.foundResources(serviceName, proxyList.length))
    resolve(groupBy(proxyList, 'region'))
  })