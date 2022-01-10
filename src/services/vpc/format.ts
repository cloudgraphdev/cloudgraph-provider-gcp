import { google } from '@google-cloud/vpc-access/build/protos/protos'
import { GcpVpcConnector } from '../../types/generated'
import { RawGcpVpc } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpVpc
  account: string
  region: string
}): GcpVpcConnector => {
  const {
    id,
    name,
    projectId,
    ipCidrRange,
    state,
    minThroughput,
    maxThroughput,
    connectedProjects,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    ipCidrRange,
    state: enumKeyToString(google.cloud.vpcaccess.v1.Connector.State, state),
    minThroughput,
    maxThroughput,
    connectedProjects,
  }
}
