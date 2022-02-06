import groupBy from 'lodash/groupBy'
import CloudGraph from '@cloudgraph/sdk'
import { ApiGatewayServiceClient } from '@google-cloud/api-gateway'
import { google } from '@google-cloud/api-gateway/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput, LabelMap } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'API Gateway Gateway'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpApiGatewayGateway extends 
Omit<google.cloud.apigateway.v1.IGateway, 'labels'> {
  id: string,
  region: string,
  projectId: string,
  Labels: LabelMap,
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpApiGatewayGateway[]
}> => {
  const { projectId } = config

  const gatewayData: RawGcpApiGatewayGateway[] = []
  const apiGatewayClient = new ApiGatewayServiceClient({ ...config, apiEndpoint })
  const allRegions = regions.split(',')

  for (const region of allRegions) {
    try {
      const gatewayIter = apiGatewayClient.listGatewaysAsync({
        parent: `projects/${projectId}/locations/${region}`,
      })
      for await (const {name, labels, ...gateway} of gatewayIter) {
        gatewayData.push({
          id: name,
          projectId,
          region,
          Labels: labels,
          ...gateway,
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'ApiGateway:listGatewaysAsync', error)
    }
  }

  logger.debug(lt.foundResources(serviceName, gatewayData.length))

  return groupBy(gatewayData, 'region')
}
