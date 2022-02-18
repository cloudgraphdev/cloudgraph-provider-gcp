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
  id: string
  region: string
}

export const listProjectsData = async (
  projectsClient: ProjectsClient,
  projectList: RawGcpProject[]
): Promise<void> =>
  new Promise(async resolve => {
    /**
     * Get all the Projects
     */
    try {
      const iterable = projectsClient.searchProjectsAsync()
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          projectList.push({
            id: response?.name,
            ...response,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(
        serviceName,
        'resourceManager:searchProjectsAsync',
        error
      )
    }
    resolve()
  })

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpProject[]
}> =>
  new Promise(async resolve => {
    const projectList: RawGcpProject[] = []
    const projectsClient = new ProjectsClient({ ...config, apiEndpoint })

    await listProjectsData(projectsClient, projectList)

    logger.debug(lt.foundResources(serviceName, projectList.length))
    resolve(groupBy(projectList, 'region'))
  })
