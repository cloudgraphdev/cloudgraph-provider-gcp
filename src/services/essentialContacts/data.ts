import { EssentialContactsServiceClient } from '@google-cloud/essential-contacts'
import { google } from '@google-cloud/essential-contacts/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'EssentialContacts'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpEssentialContact extends google.cloud.essentialcontacts.v1.IContact {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpEssentialContact[]
}> =>
  new Promise(async resolve => {
    const essentialContactList: RawGcpEssentialContact[] = []
    const { projectId } = config

    /**
     * Get all EssentialContacts
     */
    try {
      const essentialContactsClient = new EssentialContactsServiceClient({ ...config, apiEndpoint });
      const iterable = essentialContactsClient.listContactsAsync({
        parent: `projects/${projectId}`,
      })

      for await (const response of iterable) {
        if (response) {
          essentialContactList.push({
            id: response.name,
            projectId,
            region: GLOBAL_REGION,
            ...response,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'essentialContacts:listContactsAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, essentialContactList.length))
    resolve(groupBy(essentialContactList, 'region'))
  })
