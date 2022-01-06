import cuid from 'cuid'
import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpSubnet } from '../../types/generated'
import { RawGcpSubnet } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpSubnet
  account: string
  region: string
}): GcpSubnet => {
  const {
    id,
    name,
    projectId,
    creationTimestamp,
    description,
    enableFlowLogs,
    fingerprint,
    gatewayAddress,
    ipCidrRange,
    ipv6CidrRange,
    kind,
    logConfig,
    privateIpGoogleAccess,
    privateIpv6GoogleAccess,
    purpose,
    role,
    secondaryIpRanges,
    selfLink,
    state,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    creationTimestamp,
    description,
    enableFlowLogs,
    fingerprint,
    gatewayAddress,
    ipCidrRange,
    ipv6CidrRange,
    kind,
    logConfig: {
      enable: logConfig?.enable,
      filterExpr: logConfig?.filterExpr,
      flowSampling: logConfig?.flowSampling?.toString(),
      metadataFields: logConfig?.metadataFields,
      aggregationInterval: enumKeyToString(google.cloud.compute.v1.SubnetworkLogConfig.AggregationInterval, logConfig?.aggregationInterval),
      metadata: enumKeyToString(google.cloud.compute.v1.SubnetworkLogConfig.Metadata, logConfig?.metadata),
    },
    privateIpGoogleAccess,
    privateIpv6GoogleAccess: enumKeyToString(google.cloud.compute.v1.Subnetwork.PrivateIpv6GoogleAccess, privateIpv6GoogleAccess),
    purpose: enumKeyToString(google.cloud.compute.v1.Subnetwork.Purpose, purpose),
    role: enumKeyToString(google.cloud.compute.v1.Subnetwork.Role, role),
    secondaryIpRanges: secondaryIpRanges?.map(ranges => ({
      id: cuid(),
      ipCidrRange: ranges?.ipCidrRange,
      rangeName: ranges?.rangeName,
    })),
    selfLink,
    state: enumKeyToString(google.cloud.compute.v1.Subnetwork.State, state),
  }
}
