import groupBy from 'lodash/groupBy'
import { NotebookServiceClient } from '@google-cloud/notebooks'
import CloudGraph from '@cloudgraph/sdk'
import { google } from '@google-cloud/notebooks/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import zones from '../../enums/zones'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'AI Platform Notebook'
const apiEndpoint = initTestEndpoint(serviceName)

// TODO update SDK to stable version when available
export interface RawGcpAiPlatformNotebook extends 
Omit<google.cloud.notebooks.v1beta1.IInstance, 'labels' | 'network' | 'subnet'> {
  id: string,
  region: string,
  projectId: string,
  Labels: { [key: string]: string },
  network: string[],
  subnet: string[],
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpAiPlatformNotebook[]
}> => {
  const { projectId } = config

  const notebookData: RawGcpAiPlatformNotebook[] = []
  const notebookClient = new NotebookServiceClient({ ...config, apiEndpoint })

  for (const region of regions.split(',')) {
    for (const zone of zones.filter(zone => zone.indexOf(region) !== -1)) {
      try {
        const instanceNnotebookIter = await notebookClient.listInstancesAsync({
          parent: `projects/${projectId}/locations/${zone}`,
        })
        for await (const {name, network, subnet, labels, ...notebook} of instanceNnotebookIter) {
          notebookData.push({
            id: name,
            projectId,
            region,
            Labels: labels,
            network: [network],
            subnet: [subnet],
            ...notebook,
          })
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'aiPlatformNotebook:listInstancesAsync', error)
      }
    }
  }

  logger.debug(lt.foundResources(serviceName, notebookData.length))

  return groupBy(notebookData, 'region')
}
