import cuid from 'cuid'
import { AlertPolicyServiceClient } from '@google-cloud/monitoring'
import { google } from '@google-cloud/monitoring/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Alert Policy'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpAlertPolicy extends google.monitoring.v3.IAlertPolicy {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpAlertPolicy[]
}> =>
  new Promise(async resolve => {
    const alertPolicyList: RawGcpAlertPolicy[] = []
    const { projectId } = config

    /**
     * Get all the Alert Policies
     */
    try {
      const alertPolicyClient = new AlertPolicyServiceClient({ ...config, apiEndpoint });
      const iterable =  alertPolicyClient.listAlertPoliciesAsync({
        name: `projects/${projectId}`,
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          alertPolicyList.push({
            ...response,
            id: cuid(),
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'monitoring:listAlertPoliciesAsync', error)
    }

    logger.debug(lt.foundResources(serviceName, alertPolicyList.length))
    resolve(groupBy(alertPolicyList, 'region'))
  })