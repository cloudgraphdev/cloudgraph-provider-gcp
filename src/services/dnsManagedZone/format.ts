import cuid from 'cuid'
import { GcpDnsManagedZone } from '../../types/generated'
import { formatLabelsFromMap } from '../../utils/format'
import { RawGcpManagedZone } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpManagedZone
  account: string
  region: string
}): GcpDnsManagedZone => {
  const {
    id,
    name,
    kind,
    dnsName,
    description,
    nameServers,
    dnssecConfig,
    nameServerSet,
    visibility,
    privateVisibilityConfig,
    forwardingConfig,
    Labels = {},
    peeringConfig,
    reverseLookupConfig,
    serviceDirectoryConfig,
    cloudLoggingConfig,
  } = service

  return {
    id: id || cuid(),
    name,
    projectId: account,
    region,
    kind,
    dnsName,
    description,
    nameServers,
    dnssecConfigKind: dnssecConfig?.kind || '',
    dnssecConfigState: dnssecConfig?.state || '',
    dnssecConfigDefaultKeySpecs: dnssecConfig?.defaultKeySpecs?.map(
      ({ 
        kind: defaultKeySpecKind,
        keyType,
        algorithm,
        keyLength,}) => {
          return {
            id: cuid(),
            kind: defaultKeySpecKind,
            keyType,
            algorithm,
            keyLength,
          }
        }
    ) || [],
    dnssecConfigNonExistence: dnssecConfig?.nonExistence || '',
    nameServerSet,
    visibility,
    privateVisibilityConfigKind: privateVisibilityConfig?.kind || '',
    privateVisibilityConfigNetworks: privateVisibilityConfig?.networks?.map(
      ({kind: networkKind, networkUrl}) => {
        return {
          id: cuid(),
          kind: networkKind,
          networkUrl,
        }}
    ) || [],
    forwardingConfigKind: forwardingConfig?.kind || '',
    forwardingConfigTargetNameServers: forwardingConfig?.targetNameServers?.map(
      ({kind: targetNameServerKind, ipv4Address, forwardingPath}) => {
        return {
          id: cuid(),
          kind: targetNameServerKind,
          ipv4Address,
          forwardingPath,
        }}
    ) || [],
    labels: formatLabelsFromMap(Labels),
    peeringConfigKind: peeringConfig?.kind || '',
    peeringConfigTargetNetworkKind: peeringConfig?.targetNetwork?.kind || '',
    peeringConfigTargetNetworkUrl: peeringConfig?.targetNetwork?.networkUrl || '',
    peeringConfigTargetNetworkDeactivateTime: peeringConfig?.targetNetwork?.deactivateTime || '',
    reverseLookupConfigKind: reverseLookupConfig?.kind || '',
    serviceDirectoryConfigKind: serviceDirectoryConfig?.kind || '',
    serviceDirectoryConfigNamespaceKind: serviceDirectoryConfig?.namespace?.kind || '',
    serviceDirectoryConfigNamespaceUrl: serviceDirectoryConfig?.namespace?.namespaceUrl || '',
    serviceDirectoryConfigNamespaceDeactivateTime: serviceDirectoryConfig?.namespace?.deletionTime || '',
    cloudLoggingConfigKind: cloudLoggingConfig?.kind || '',
    cloudLoggingConfigEnableLogging: cloudLoggingConfig?.enableLogging || false,
  }
}
