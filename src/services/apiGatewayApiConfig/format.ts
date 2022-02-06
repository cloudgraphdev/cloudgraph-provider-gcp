import cuid from 'cuid'
import { google } from '@google-cloud/api-gateway/build/protos/protos'
import { RawGcpApiGatewayApiConfig } from './data'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'
import { GcpApiGatewayApiConfig, GcpApiGatewayConfigGrpcServiceDefinition } from '../../types/generated'
import { toISOString } from '../../utils/dateutils'

const formatGrpcServiceDefinition = ({
  fileDescriptorSet = {},
  source = [],
}: google.cloud.apigateway.v1.ApiConfig.IGrpcServiceDefinition): GcpApiGatewayConfigGrpcServiceDefinition => {
  return {
    id: cuid(),
    // document does not contain contents data
    fileDescriptorSet: fileDescriptorSet?.path || '',
    // document does not contain contents data
    source: source?.map(s => s?.path)
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpApiGatewayApiConfig
  account: string
  region: string
}): GcpApiGatewayApiConfig => {
  const {
    id,
    Labels,
    createTime,
    updateTime,
    displayName,
    gatewayServiceAccount,
    serviceConfigId,
    state,
    openapiDocuments = [],
    grpcServices = [],
    managedServiceConfigs = [],
  } = service

  return {
    id,
    name: displayName,
    projectId: account,
    region,
    labels: formatLabelsFromMap(Labels),
    createTime: toISOString(createTime?.seconds?.toString()) || '',
    updateTime: toISOString(updateTime?.seconds?.toString()) || '',
    gatewayServiceAccount,
    serviceConfigId,
    state: enumKeyToString(google.cloud.apigateway.v1.ApiConfig.State, state),
    // document does not contain contents data
    openapiDocuments: openapiDocuments?.map(openapiDocument => openapiDocument?.document?.path),
    grpcServices: grpcServices?.map(grpcService => formatGrpcServiceDefinition(grpcService)),
    // document does not contain contents data
    managedServiceConfigs: managedServiceConfigs?.map(config => config.path),
  }
}
