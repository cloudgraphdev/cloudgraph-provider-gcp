import cuid from 'cuid'
import compute from '@google-cloud/compute'
import { google } from '@google-cloud/compute/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Compute Project'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpComputeProject extends google.cloud.compute.v1.IProject {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpComputeProject[]
}> =>
  new Promise(async resolve => {
    const projectList: RawGcpComputeProject[] = []
    const { projectId } = config

    /**
     * Get all Compute Project info
     */
    try {
      const projectsClient = new compute.ProjectsClient({ ...config, apiEndpoint });
      const response = await projectsClient.get({
        project: projectId
      })

      if (!isEmpty(response) && response[0]) {
        const project = response[0]
        projectList.push({
          ...project,
          id: project?.id?.toString() || cuid(),
          projectId,
          region: GLOBAL_REGION,
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'compute:getProject', error)
    }
    
    logger.debug(lt.foundResources(serviceName, projectList.length))
    resolve(groupBy(projectList, 'region'))
  })
