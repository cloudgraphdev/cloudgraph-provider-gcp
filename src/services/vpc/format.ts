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
    name,
    network,
    ipCidrRange,
    state,
    minThroughput,
    maxThroughput,
    connectedProjects,
    subnet,
  } = service

  return {
    id: name,
    projectId: account,
    region,
    name,
    network,
    ipCidrRange,
    state: enumKeyToString(google.cloud.vpcaccess.v1.Connector.State, state),
    minThroughput,
    maxThroughput,
    connectedProjects,
    subnet: subnet?.name,
  }
}
