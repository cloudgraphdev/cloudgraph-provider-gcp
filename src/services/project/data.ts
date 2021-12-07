import { ProjectsClient } from '@google-cloud/resource-manager'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Project'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpProject extends google.cloud.resourcemanager.v3.IProject { 
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpProject[]
}> =>
  new Promise(async resolve => {
    const projectList: RawGcpProject[] = []

    /**
     * Get all the Projects
     */
    try {
      const projectsClient = new ProjectsClient({ ...config, apiEndpoint });
      const iterable = projectsClient.searchProjectsAsync()
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          projectList.push({
            ...response,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'resourceManager:listProjects', error)
    }
    
    logger.debug(lt.foundProjects(projectList.length))
    resolve(groupBy(projectList, 'region'))
  })
