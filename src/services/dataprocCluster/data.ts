import cuid from 'cuid'
import { ClusterControllerClient } from '@google-cloud/dataproc'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Dataproc Cluster'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpDataprocCluster extends Omit<google.cloud.dataproc.v1.ICluster, 'projectId' | 'labels'> {
  id: string
  region: string
  projectId: string
  Labels: { [key: string]: string }
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpDataprocCluster[]
}> => {
    const clusterList: RawGcpDataprocCluster[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      /**
       * Get all the Dataproc Cluster
       */
        
      try {
        const dataprocClient = new ClusterControllerClient({ ...config, apiEndpoint })
      
        const iterable =  dataprocClient.listClustersAsync({ projectId, region })
        for await (const { labels, ...response } of iterable) {
          if (response) {
            clusterList.push({
              ...response,
              id: cuid(),
              projectId,
              region,
              Labels: labels,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'dataprocCluster:listClustersAsync', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, clusterList.length))
    return groupBy(clusterList, 'region')
  }
