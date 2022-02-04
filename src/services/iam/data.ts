import cuid from 'cuid'
import { ProjectsClient, FoldersClient } from '@google-cloud/resource-manager'
import { KeyManagementServiceClient } from '@google-cloud/kms'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import { DNS } from '@google-cloud/dns'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { RawGcpFolder, listFoldersData } from '../folder/data'
import { RawGcpProject, listProjectsData } from '../project/data'
import {
  RawGcpStorageBucket,
  listStorageBucketsData,
} from '../storageBucket/data'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { listData }  from '../../utils/fetchUtils'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'
import { RawGcpKmsCryptoKey, listCryptoKeysData } from '../kmsCryptoKey/data'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'IAM Policy'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpIamPolicyAuditLogConfig {
  logType?: string
  exemptedMembers?: string[]
}

export interface RawGcpIamPolicyAuditConfig {
  service?: string
  exemptedMembers?: string[]
  auditLogConfigs?: RawGcpIamPolicyAuditLogConfig[]
}

export interface RawGcpIamPolicy extends google.iam.v1.IPolicy {
  id: string
  region: string
  projectId?: string
  folderId?: string
  storageBucketId?: string
  cryptoKeyId?: string
  auditConfigs?: RawGcpIamPolicyAuditConfig[]
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

    if (isEmpty(projects)) {
      // Refresh data
      await listProjectsData(projectsClient, projects)
    }
    
    /**
     * Get all the IAM policies for projects
     */
    try {
      const service = new DNS({ ...config, apiEndpoint })
      const data = await listData({
        service,
        apiUri: `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:getIamPolicy`,
        method: 'POST',
      })
      for (const instance of data) {
        policyList.push({
          id: cuid(),
          projectId,
          ...instance,
          region: GLOBAL_REGION,
        })
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

    if (isEmpty(folders)) {
      // Refresh data
      await listFoldersData(config, rawData, folders)
    }

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

    if (isEmpty(storageBuckets)) {
      // Refresh data
      await listStorageBucketsData(config, storageBuckets)
    }

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

    /**
     * Find Kms Crypto Keys
     */
    const kmsClient = new KeyManagementServiceClient({ ...config, apiEndpoint })
    const cryptoKeys: RawGcpKmsCryptoKey[] =
      rawData.find(({ name }) => name === services.kmsCryptoKeys)?.data[
        GLOBAL_REGION
      ] || []

    if (isEmpty(cryptoKeys)) {
      // Refresh data
      await listCryptoKeysData(
        kmsClient,
        GLOBAL_REGION,
        projectId,
        rawData,
        cryptoKeys
      )
    }

    /**
     * Get all the IAM policies for kms crypto keys
     */
    try {
      for (const { name } of cryptoKeys) {
        const request = new google.iam.v1.GetIamPolicyRequest({
          resource: name,
        })
        const response = await kmsClient.getIamPolicy(request)

        if (response && response[0]) {
          policyList.push({
            id: cuid(),
            ...response[0],
            cryptoKeyId: name,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'kms:getIamPolicy', error)
    }

    logger.debug(lt.foundPolicies(policyList.length))
    resolve(groupBy(policyList, 'region'))
  })
