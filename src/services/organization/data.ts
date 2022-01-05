import { OrganizationsClient } from '@google-cloud/resource-manager'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Organization'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpOrganization extends google.cloud.resourcemanager.v3.IOrganization {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpOrganization[]
}> =>
  new Promise(async resolve => {
    const orgList: RawGcpOrganization[] = []
    const { projectId } = config

    /**
     * Get all the Organizations
     */
    try {
      const organizationsClient = new OrganizationsClient({ ...config, apiEndpoint });
      const iterable = organizationsClient.searchOrganizationsAsync()
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          orgList.push({
            id: response.name,
            ...response,
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'resourceManager:searchOrganizationsAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, orgList.length))
    resolve(groupBy(orgList, 'region'))
  })
