import groupBy from 'lodash/groupBy'
import { ApiGatewayServiceClient } from '@google-cloud/api-gateway'
import CloudGraph from '@cloudgraph/sdk'
import { google } from '@google-cloud/api-gateway/build/protos/protos'
import isEmpty from 'lodash/isEmpty'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput, LabelMap } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'
import { listApiGatewayApiData, RawGcpApiGatewayApi } from '../apiGatewayApi/data'
import services from '../../enums/services'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'API Gateway Api Config'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpApiGatewayApiConfig extends 
Omit<google.cloud.apigateway.v1.IApiConfig, 'labels'> {
  id: string,
  region: string,
  projectId: string,
  Labels: LabelMap,
}

export default async ({
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpApiGatewayApiConfig[]
}> => {
  const { projectId } = config

  const routerData: RawGcpApiGatewayApiConfig[] = []
  const apiGatewayClient = new ApiGatewayServiceClient({ ...config, apiEndpoint })

  /**
   * Find Gateway Api
   */
  const apis: RawGcpApiGatewayApi[] =
    rawData.find(({ name }) => name === services.project)?.data[
      GLOBAL_REGION
    ] || []

  if (isEmpty(apis)) {
    // Refresh data
    await listApiGatewayApiData(apiGatewayClient, projectId, apis)
  }

  try {
    for await (const api of apis) {
      const apiIdSessions = api.id.split('/')
      const apiName = apiIdSessions[apiIdSessions.length - 1]
      const apiConfigIter = apiGatewayClient.listApiConfigsAsync({
        parent: `projects/${projectId}/locations/${GLOBAL_REGION}/apis/${apiName}`,
      })

      for await (const {name, labels, ...apiConfig} of apiConfigIter) {
        routerData.push({
          id: name,
          projectId,
          region: GLOBAL_REGION,
          Labels: labels,
          ...apiConfig,
        })
      }
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'ApiGateway:listApiConfigsAsync', error)
  }

  logger.debug(lt.foundResources(serviceName, routerData.length))

  return groupBy(routerData, 'region')
}
