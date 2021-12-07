import { google } from '@google-cloud/vpc-access/build/protos/protos'
import { GcpVpcConnector } from '../../types/generated'
import { RawGcpVpc } from './data'

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

  const states = Object.keys(google.cloud.vpcaccess.v1.Connector.State)
  const stateIndex = google.cloud.vpcaccess.v1.Connector.State[state]

  return {
    id: name,
    projectId: account,
    region,
    name,
    network,
    ipCidrRange,
    state: states[stateIndex],
    minThroughput,
    maxThroughput,
    connectedProjects,
    subnet: subnet?.name,
  }
}
