import cuid from 'cuid'
import { SslPoliciesClient } from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'SSL Policy'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpSslPolicy extends google.cloud.compute.v1.ISslPolicy {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpSslPolicy[]
}> =>
  new Promise(async resolve => {
    const policyList: RawGcpSslPolicy[] = []
    const { projectId } = config

    /**
     * Get all the SSL Policies
     */
    try {
      const computeClient = new SslPoliciesClient({ ...config, apiEndpoint });
      const iterable =  computeClient.listAsync({
        project: projectId,
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          policyList.push({
            ...response,
            id: response.id?.toString() || cuid(),
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'sslPolicies:listAsync', error)
    }

    logger.debug(lt.foundResources(serviceName, policyList.length))
    resolve(groupBy(policyList, 'region'))
  })