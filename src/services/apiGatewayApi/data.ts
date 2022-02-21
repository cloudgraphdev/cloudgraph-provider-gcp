import groupBy from 'lodash/groupBy'
import { ApiGatewayServiceClient } from '@google-cloud/api-gateway'
import CloudGraph from '@cloudgraph/sdk'
import { google } from '@google-cloud/api-gateway/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput, LabelMap } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'API Gateway Api'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpApiGatewayApi extends 
Omit<google.cloud.apigateway.v1.IApi, 'labels'> {
  id: string,
  region: string,
  projectId: string,
  Labels: LabelMap,
}

export const listApiGatewayApiData = async (
  apiGatewayClient: ApiGatewayServiceClient,
  projectId: string,
  apiData: RawGcpApiGatewayApi[],
): Promise<void> => {
  try {
    const apiIter = apiGatewayClient.listApisAsync({
      parent: `projects/${projectId}/locations/${GLOBAL_REGION}`,
    })
    for await (const {name, labels, ...api} of apiIter) {
      apiData.push({
        id: name,
        projectId,
        region: GLOBAL_REGION,
        Labels: labels,
        ...api,
      })
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'ApiGateway:listApisAsync', error)
  }
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpApiGatewayApi[]
}> => {
  const { projectId } = config

  const apiData: RawGcpApiGatewayApi[] = []
  const apiGatewayClient = new ApiGatewayServiceClient({ ...config, apiEndpoint })

  await listApiGatewayApiData(apiGatewayClient, projectId, apiData)

  logger.debug(lt.foundResources(serviceName, apiData.length))

  return groupBy(apiData, 'region')
}
