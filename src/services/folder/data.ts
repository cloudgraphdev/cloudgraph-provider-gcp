import {
  FoldersClient,
  OrganizationsClient,
} from '@google-cloud/resource-manager'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { isEmpty } from 'lodash'
import gcpLoggerText from '../../properties/logger'
import { GcpCredentials, GcpServiceInput, rawDataInterface } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'
import { RawGcpOrganization, listOrganizationsData } from '../organization/data'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Folder'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpFolder extends google.cloud.resourcemanager.v3.IFolder {
  id: string
  projectId: string
  region: string
}

export const listFoldersData = async (
  config: GcpCredentials,
  rawData: rawDataInterface[],
  folderList: RawGcpFolder[]
): Promise<void> =>
  new Promise<void>(async resolve => {
    const { projectId } = config
    const foldersClient = new FoldersClient({ ...config, apiEndpoint })

    /**
     * Find Organizations
     */
    const organizations: RawGcpOrganization[] =
      rawData.find(({ name }) => name === services.organization)?.data[
        GLOBAL_REGION
      ] || []

    if (isEmpty(organizations)) {
      // Refresh data
      const organizationsClient = new OrganizationsClient({
        ...config,
        apiEndpoint,
      })
      await listOrganizationsData(organizationsClient, projectId, organizations)
    }

    for (const { name } of organizations) {
      /**
       * Get all the Folders
       */
      try {
        const iterable = foldersClient.listFoldersAsync({
          parent: name,
        })

        // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
        for await (const response of iterable) {
          if (response) {
            folderList.push({
              id: response.name,
              ...response,
              projectId,
              region: GLOBAL_REGION,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(
          serviceName,
          'resourceManager:listFoldersAsync',
          error
        )
      }
      resolve()
    }
  })

export default async ({
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpFolder[]
}> =>
  new Promise(async resolve => {
    const folderList: RawGcpFolder[] = []

    await listFoldersData(config, rawData, folderList)

    logger.debug(lt.foundResources(serviceName, folderList.length))
    resolve(groupBy(folderList, 'region'))
  })
