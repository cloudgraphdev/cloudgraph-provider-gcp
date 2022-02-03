import cuid from 'cuid'
import { google } from '@google-cloud/compute/build/protos/protos'
import { RawGcpCloudRouter } from './data'
import { enumKeyToString } from '../../utils/format'
import { GcpCloudRouter, GcpCloudRouterBgpPeer, GcpCloudRouterNat } from '../../types/generated'

const formatBgpPeer = ({
  advertisedGroups,
  advertisedIpRanges,
  advertisedRoutePriority,
  advertiseMode,
  interfaceName,
  ipAddress,
  managementType,
  name,
  peerAsn,
  peerIpAddress,
}: google.cloud.compute.v1.IRouterBgpPeer): GcpCloudRouterBgpPeer => {
  return {
    id: cuid(),
    advertiseMode: enumKeyToString(google.cloud.compute.v1.RouterBgpPeer.AdvertiseMode, advertiseMode),
    advertisedGroups: advertisedGroups?.map(
      advertisedGroup => enumKeyToString(google.cloud.compute.v1.RouterBgpPeer.AdvertisedGroups, advertisedGroup)
    ) || [],
    advertisedIpRanges:
      advertisedIpRanges?.map(({ description, range }) => ({
        id: cuid(),
        description,
        range,
      })) || [],
    advertisedRoutePriority,
    interfaceName,
    ipAddress,
    managementType: enumKeyToString(google.cloud.compute.v1.RouterInterface.ManagementType, managementType),
    name,
    peerAsn,
    peerIpAddress,
  }
}

const formatNat = ({
  drainNatIps,
  enableEndpointIndependentMapping,
  icmpIdleTimeoutSec,
  logConfig,
  minPortsPerVm,
  name: natName,
  natIpAllocateOption,
  natIps,
  sourceSubnetworkIpRangesToNat,
  subnetworks,
  tcpEstablishedIdleTimeoutSec,
  tcpTransitoryIdleTimeoutSec,
  udpIdleTimeoutSec,
}: google.cloud.compute.v1.IRouterNat): GcpCloudRouterNat => {
  return {
    id: cuid(),
    drainNatIps,
    enableEndpointIndependentMapping,
    icmpIdleTimeoutSec,
    logConfigEnable: logConfig?.enable,
    logConfigFilter: enumKeyToString(google.cloud.compute.v1.RouterNatLogConfig.Filter, logConfig?.filter),
    minPortsPerVm,
    name: natName,
    natIpAllocateOption: enumKeyToString(google.cloud.compute.v1.RouterNat.NatIpAllocateOption, natIpAllocateOption),
    natIps,
    sourceSubnetworkIpRangesToNat:
      enumKeyToString(google.cloud.compute.v1.RouterNat.SourceSubnetworkIpRangesToNat, sourceSubnetworkIpRangesToNat),
    subnetworks:
      subnetworks?.map(
        ({ name, secondaryIpRangeNames, sourceIpRangesToNat }) => ({
          id: cuid(),
          name,
          secondaryIpRangeNames,
          sourceIpRangesToNat: sourceIpRangesToNat?.map(
            sourceIpRangeToNat => enumKeyToString(google.cloud.compute.v1.RouterNatSubnetworkToNat.SourceIpRangesToNat, sourceIpRangeToNat)
          ) || [],
        })
      ) || [],
    tcpEstablishedIdleTimeoutSec,
    tcpTransitoryIdleTimeoutSec,
    udpIdleTimeoutSec,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpCloudRouter
  account: string
  region: string
}): GcpCloudRouter => {
  const {
    bgp,
    bgpPeers,
    creationTimestamp,
    description,
    encryptedInterconnectRouter,
    id,
    interfaces,
    kind,
    name,
    nats,
    selfLink,
  } = service

  return {
    id,
    projectId: account,
    region,
    bgpAdvertiseMode: enumKeyToString(google.cloud.compute.v1.RouterBgp.AdvertiseMode, bgp?.advertiseMode),
    bgpAdvertisedGroups: bgp?.advertisedGroups?.map(
      advertisedGroup => enumKeyToString(google.cloud.compute.v1.RouterBgp.AdvertiseMode, advertisedGroup)
    ) || [],
    bgpAdvertisedIpRanges:
      bgp?.advertisedIpRanges?.map(({ description: advIpRangeDDesc, range }) => ({
        id: cuid(),
        description: advIpRangeDDesc,
        range,
      })) || [],
    bgpAsn: bgp?.asn || 0,
    bgpPeers: bgpPeers?.map(bgpPeer => formatBgpPeer(bgpPeer)) || [],
    creationTimestamp,
    description,
    encryptedInterconnectRouter,
    interfaces: interfaces?.map(
      ({
        ipRange,
        linkedInterconnectAttachment,
        linkedVpnTunnel,
        managementType,
        name: interfaceName,
      }) => ({
        id: cuid(),
        ipRange,
        linkedInterconnectAttachment,
        linkedVpnTunnel,
        managementType: enumKeyToString(google.cloud.compute.v1.RouterInterface.ManagementType, managementType),
        name: interfaceName,
      })
    ) || [],
    kind,
    name,
    nats: nats?.map(nat => formatNat(nat)) || [],
    selfLink,
  }
}
