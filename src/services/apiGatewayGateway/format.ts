import { google } from '@google-cloud/api-gateway/build/protos/protos'
import { RawGcpApiGatewayGateway } from './data'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'
import { GcpApiGatewayGateway } from '../../types/generated'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpApiGatewayGateway
  account: string
  region: string
}): GcpApiGatewayGateway => {
  const {
    id,
    createTime,
    updateTime,
    displayName,
    state,
    Labels = {},
  } = service

  return {
    id,
    name: displayName,
    projectId: account,
    region,
    labels: formatLabelsFromMap(Labels),
    createTime: toISOString(createTime?.seconds?.toString()) || '',
    updateTime: toISOString(updateTime?.seconds?.toString()) || '',
    state: enumKeyToString(google.cloud.apigateway.v1.Gateway.State, state),
  }
}
