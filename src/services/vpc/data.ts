import { VpcAccessServiceClient } from '@google-cloud/vpc-access'
import { google } from '@google-cloud/vpc-access/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'VPC'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpVpc extends Omit<google.cloud.vpcaccess.v1.IConnector, 'network'|'subnet'> {
  id: string
  projectId: string
  region: string
  network: string[]
  subnet: string[]
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpVpc[]
}> =>
  new Promise(async resolve => {
    const vpcList: RawGcpVpc[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      /**
       * Get all the VPS connectors
       */
      try {
        const vpc = new VpcAccessServiceClient({ ...config, apiEndpoint });
        const iterable =  vpc.listConnectorsAsync({
          parent: `projects/${projectId}/locations/${region}`,
        })
        // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
        for await (const response of iterable) {
          if (response) {
            vpcList.push({
              id: response.name,
              ...response,
              network: [response.network],
              subnet: [response.subnet?.name],
              projectId,
              region,
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'vpc:listConnectors', error)
      }
    }

    logger.debug(lt.foundVpcs(vpcList.length))
    resolve(groupBy(vpcList, 'region'))
  })
