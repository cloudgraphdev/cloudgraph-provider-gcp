import cuid from 'cuid'
import { ProjectsClient } from '@google-cloud/resource-manager'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { RawGcpProject } from './../project/data'
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
  projectId: string
  region: string
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
    const projects: RawGcpProject[] = 
      rawData.find(({ name }) => name === services.project)?.data[GLOBAL_REGION] || []

    /**
     * Get all the IAM policies for projects
     */
    try {
      const projectsClient = new ProjectsClient({ ...config, apiEndpoint });
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

    logger.debug(lt.foundPolicies(policyList.length))
    resolve(groupBy(policyList, 'region'))
  })
