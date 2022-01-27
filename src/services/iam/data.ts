import cuid from 'cuid'
import { ProjectsClient, FoldersClient } from '@google-cloud/resource-manager'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { RawGcpFolder } from '../folder/data'
import { RawGcpProject } from '../project/data'
import { RawGcpStorageBucket } from '../storageBucket/data'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'IAM Policy'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpIamPolicy extends google.iam.v1.IPolicy {
  id: string
  region: string
  projectId?: string
  folderId?: string
  storageBucketId?: string
}

export default async ({
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpIamPolicy[]
}> =>
  new Promise(async resolve => {
    const policyList: RawGcpIamPolicy[] = []
    const { projectId } = config

    /**
     * Find Projects
     */
    const projectsClient = new ProjectsClient({ ...config, apiEndpoint })
    const projects: RawGcpProject[] =
      rawData.find(({ name }) => name === services.project)?.data[
        GLOBAL_REGION
      ] || []

    /**
     * Get all the IAM policies for projects
     */
    try {
      for (const { name } of projects) {
        const response = await projectsClient.getIamPolicy({ resource: name })
        if (response && response[0]) {
          policyList.push({
            id: cuid(),
            ...response[0],
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'resourceManager:getIamPolicy', error)
    }

    /**
     * Find Folders
     */
    const foldersClient = new FoldersClient({ ...config, apiEndpoint })
    const folders: RawGcpFolder[] =
      rawData.find(({ name }) => name === services.folder)?.data[
        GLOBAL_REGION
      ] || []

    /**
     * Get all the IAM policies for folders
     */
    try {
      for (const { name } of folders) {
        const response = await foldersClient.getIamPolicy({ resource: name })
        if (response && response[0]) {
          policyList.push({
            id: cuid(),
            ...response[0],
            folderId: name,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'resourceManager:getIamPolicy', error)
    }

    /**
     * Find Storage Buckets
     */
    const storageBuckets: RawGcpStorageBucket[] =
      rawData.find(({ name }) => name === services.storageBucket)?.data[
        GLOBAL_REGION
      ] || []

    /**
    * Get all the IAM policies for Storage Buckets
    */
    try {
      for (const { iam } of storageBuckets) {
        const response = await iam.getPolicy()
        if (!isEmpty(response) && response[0]) {
          policyList.push({
            id: cuid(),
            ...response[0],
            storageBucketId: (response[0]?.resourceId || '').split('/').pop(),
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'storage:getPolicy', error)
    }

    logger.debug(lt.foundPolicies(policyList.length))
    resolve(groupBy(policyList, 'region'))
  })
