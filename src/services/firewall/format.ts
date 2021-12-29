import cuid from 'cuid'
import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpFirewall } from '../../types/generated'
import { RawGcpFirewall } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpFirewall
  account: string
  region: string
}): GcpFirewall => {
  const {
    id,
    projectId,
    name,
    allowed,
    creationTimestamp,
    denied,
    description,
    destinationRanges,
    direction,
    disabled,
    kind,
    logConfig,
    network,
    priority,
    selfLink,
    sourceRanges,
    sourceServiceAccounts,
    sourceTags,
    targetServiceAccounts,
    targetTags,
  } = service

  return {
    id,
    projectId,
    name,
    allowed: allowed?.map(access => ({
      id: cuid(),
      ipProtocol: access?.IPProtocol,
      ports: access?.ports,
    })),
    creationTimestamp,
    denied: denied?.map(access => ({
      id: cuid(),
      ipProtocol: access?.IPProtocol,
      ports: access?.ports,
    })),
    description,
    destinationRanges,
    direction: enumKeyToString(google.cloud.compute.v1.Firewall.Direction, direction),
    disabled,
    kind,
    logConfig: {
      enable: logConfig?.enable,
      metadata: enumKeyToString(google.cloud.compute.v1.FirewallLogConfig.Metadata, logConfig?.metadata),
    },
    network,
    priority,
    selfLink,
    sourceRanges,
    sourceServiceAccounts,
    sourceTags,
    targetServiceAccounts,
    targetTags,
  }
}
