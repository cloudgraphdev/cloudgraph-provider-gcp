import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpTargetSslProxy } from '../../types/generated'
import { RawGcpTargetSslProxy } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
}: {
  service: RawGcpTargetSslProxy
}): GcpTargetSslProxy => {
  const {
    id,
    projectId,
    region,
    name,
    creationTimestamp,
    description,
    kind,
    proxyHeader,
    selfLink,
    sslCertificates,
    sslPolicy,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    creationTimestamp,
    description,
    kind,
    proxyHeader: enumKeyToString(google.cloud.compute.v1.TargetSslProxy.ProxyHeader, proxyHeader),
    selfLink,
    service: service?.service,
    sslCertificates,
    sslPolicy,
  }
}