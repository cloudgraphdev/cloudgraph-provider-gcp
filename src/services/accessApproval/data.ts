import { AccessApprovalClient } from '@google-cloud/access-approval'
import { google } from '@google-cloud/access-approval/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'AccessApproval'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpAccessApproval extends google.cloud.accessapproval.v1.IApprovalRequest {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpAccessApproval[]
}> =>
  new Promise(async resolve => {
    const accessApprovalList: RawGcpAccessApproval[] = []
    const { projectId } = config

    /**
     * Get all EssentialContacts
     */
    try {
      const accessApprovalClient = new AccessApprovalClient({ ...config, apiEndpoint });
      const iterable = accessApprovalClient.listApprovalRequestsAsync({
        parent: `projects/${projectId}`,
      })

      for await (const response of iterable) {
        if (response) {
          accessApprovalList.push({
            id: response.name,
            projectId,
            region: GLOBAL_REGION,
            ...response,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'accessApproval:listApprovalRequestsAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, accessApprovalList.length))
    resolve(groupBy(accessApprovalList, 'region'))
  })
