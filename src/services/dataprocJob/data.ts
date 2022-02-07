import { JobControllerClient } from '@google-cloud/dataproc'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Dataproc Job'

export interface RawGcpDataprocJob extends Omit<google.cloud.dataproc.v1.IJob, 'jobUuid'|'labels'> {
  id: string
  region: string
  projectId: string
  Labels: { [key: string]: string }
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpDataprocJob[]
}> => {
    const jobList: RawGcpDataprocJob[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      /**
       * Get all the Dataproc Job
       */
        
      try {
        const dataprocClient = new JobControllerClient({ 
          ...config,
          apiEndpoint: `${region}-dataproc.googleapis.com`,
          projectId,
        })
      
        const iterable =  dataprocClient.listJobsAsync({ projectId, region })
        for await (const { jobUuid, labels, ...response } of iterable) {
          if (response) {
            jobList.push({
              ...response,
              id: jobUuid,
              projectId,
              region,
              Labels: labels,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'dataprocJob:listJobsAsync', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, jobList.length))
    return groupBy(jobList, 'region')
  }
