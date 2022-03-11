import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpTargetHttpsProxy } from '../../types/generated'
import { RawGcpTargetHttpsProxy } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
}: {
  service: RawGcpTargetHttpsProxy
}): GcpTargetHttpsProxy => {
  const {
    id,
    projectId,
    region,
    name,
    authorizationPolicy,
    creationTimestamp,
    description,
    fingerprint,
    kind,
    proxyBind,
    quicOverride,
    selfLink,
    serverTlsPolicy,
    sslCertificates,
    urlMap,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    authorizationPolicy,
    creationTimestamp,
    description,
    fingerprint,
    kind,
    proxyBind,
    quicOverride: enumKeyToString(google.cloud.compute.v1.TargetHttpsProxy.QuicOverride, quicOverride),
    selfLink,
    serverTlsPolicy,
    sslCertificates,
    urlMap,
  }
}
