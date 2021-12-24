import cuid from 'cuid'
import { GcpDnsPolicy } from '../../types/generated'
import { RawGcpPolicy } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpPolicy
  account: string
  region: string
}): GcpDnsPolicy => {
  const {
    id,
    name,
    kind,
    enableInboundForwarding,
    description,
    networks,
    alternativeNameServerConfig,
    enableLogging,
  } = service

  return {
    id: id || cuid(),
    name,
    projectId: account,
    region,
    kind,
    enableInboundForwarding,
    description,
    networks: networks?.map(({
      kind: networkKind,
      networkUrl,
    }) => {
      return {
        id: cuid(), 
        kind: networkKind,
        networkUrl,
      }
    }) || [],
    alternativeNameServerConfigKind: alternativeNameServerConfig?.kind || '',
    alternativeNameServerConfigTargetNameServers: alternativeNameServerConfig?.targetNameServers?.map(({
      kind: targetNameServerKind,
      ipv4Address,
      forwardingPath,
    }) => {
      return {
        id: cuid(),
        kind: targetNameServerKind,
        ipv4Address,
        forwardingPath,
      }
    }) || [],
    enableLogging,
  }
}
