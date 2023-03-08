import { AutoscalingPolicyServiceClient } from '@google-cloud/dataproc'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Dataproc Autoscaling Policy'

export interface RawGcpDataprocAutoscalingPolicy extends Omit<google.cloud.dataproc.v1.IAutoscalingPolicy, 'id'|'labels'> {
  id: string
  region: string
  projectId: string
  Labels: { [key: string]: string }
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpDataprocAutoscalingPolicy[]
}> => {
    const autoscalingPolicyList: RawGcpDataprocAutoscalingPolicy[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      /**
       * Get all the Dataproc Autoscaling Policies
       */
      try {
        const dataprocClient = new AutoscalingPolicyServiceClient({ 
          ...config,
          apiEndpoint: `${region}-dataproc.googleapis.com`,
          projectId,
        })
        const locationName = dataprocClient.locationPath(projectId, region)
        const iterable =  dataprocClient.listAutoscalingPoliciesAsync({
          parent: locationName,
        })
        for await (const { id, labels, ...response } of iterable) {
          if (response) {
            autoscalingPolicyList.push({
              ...response,
              id,
              projectId,
              region,
              Labels: labels,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'dataprocAutoscalingPolicy:listAutoscalingPoliciesAsync', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, autoscalingPolicyList.length))
    return groupBy(autoscalingPolicyList, 'region')
  }
