import cuid from 'cuid'
import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpNetwork } from '../../types/generated'
import { RawGcpNetwork } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpNetwork
  account: string
  region: string
}): GcpNetwork => {
  const {
    id,
    name,
    projectId,
    IPv4Range,
    autoCreateSubnetworks,
    creationTimestamp,
    description,
    gatewayIPv4,
    kind,
    mtu,
    peerings,
    routingConfig,
    selfLink,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    ipV4Range: IPv4Range,
    autoCreateSubnetworks,
    creationTimestamp,
    description,
    gatewayIPv4,
    kind,
    mtu,
    peerings: peerings?.map(peering => ({
      id: cuid(),
      autoCreateRoutes: peering?.autoCreateRoutes,
      exchangeSubnetRoutes: peering?.exchangeSubnetRoutes,
      exportCustomRoutes: peering?.exportCustomRoutes,
      exportSubnetRoutesWithPublicIp: peering?.exportSubnetRoutesWithPublicIp,
      importCustomRoutes: peering?.importCustomRoutes,
      importSubnetRoutesWithPublicIp: peering?.importSubnetRoutesWithPublicIp,
      name: peering?.name,
      network: peering?.network,
      peerMtu: peering?.peerMtu,
      stateDetails: peering?.stateDetails,
      state: enumKeyToString(google.cloud.compute.v1.NetworkPeering.State, peering?.state),
    })),
    routingConfig: {
      routingMode: enumKeyToString(google.cloud.compute.v1.NetworkRoutingConfig.RoutingMode, routingConfig?.routingMode),
    },
    selfLink,
  }
}
