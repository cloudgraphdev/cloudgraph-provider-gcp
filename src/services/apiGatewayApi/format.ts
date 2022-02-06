import { google } from '@google-cloud/api-gateway/build/protos/protos'
import { RawGcpApiGatewayApi } from './data'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'
import { GcpApiGatewayApi } from '../../types/generated'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpApiGatewayApi
  account: string
  region: string
}): GcpApiGatewayApi => {
  const {
    id,
    Labels,
    createTime,
    updateTime,
    displayName,
    managedService,
    state,
  } = service

  return {
    id,
    name: displayName,
    projectId: account,
    region,
    labels: formatLabelsFromMap(Labels),
    createTime: toISOString(createTime?.seconds?.toString()) || '',
    updateTime: toISOString(updateTime?.seconds?.toString()) || '',
    managedService,
    state: enumKeyToString(google.cloud.apigateway.v1.Api.State, state),
  }
}
