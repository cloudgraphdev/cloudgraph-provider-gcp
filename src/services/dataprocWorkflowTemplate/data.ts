import { WorkflowTemplateServiceClient } from '@google-cloud/dataproc'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Dataproc Job'

export interface RawGcpDataprocWorkflowTemplate extends Omit<google.cloud.dataproc.v1.IWorkflowTemplate, 'labels'> {
  region: string
  projectId: string
  Labels: { [key: string]: string }
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpDataprocWorkflowTemplate[]
}> => {
  const workflowTemplateList: RawGcpDataprocWorkflowTemplate[] = []
  const { projectId } = config
  
  for (const region of regions.split(',')) {
    /**
     * Get all the Dataproc Workflow Template
     */
    
    try {
        const dataprocClient = new WorkflowTemplateServiceClient({ 
          ...config,
          apiEndpoint: `${region}-dataproc.googleapis.com`,
          projectId,
        })

        const iterable =  dataprocClient.listWorkflowTemplatesAsync({ 
          parent: `projects/${projectId}/regions/${region}`
        })
        for await (const { labels, ...response } of iterable) {
          if (response) {
            workflowTemplateList.push({
              ...response,
              projectId,
              region,
              Labels: labels,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'dataprocWorkflowTemplate:listWorkflowTemplatesAsync', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, workflowTemplateList.length))
    return groupBy(workflowTemplateList, 'region')
  }
  