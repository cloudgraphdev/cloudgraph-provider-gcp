import cuid from 'cuid'
import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpSslPolicy } from '../../types/generated'
import { enumKeyToString } from '../../utils/format'
import { RawGcpSslPolicy } from './data'

export default ({
  service,
}: {
  service: RawGcpSslPolicy
}): GcpSslPolicy => {
  const {
    id,
    projectId,
    region,
    name,
    creationTimestamp,
    customFeatures,
    description,
    enabledFeatures,
    fingerprint,
    kind,
    minTlsVersion,
    profile,
    selfLink,
    warnings,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    creationTimestamp,
    customFeatures,
    description,
    enabledFeatures,
    fingerprint,
    kind,
    minTlsVersion: enumKeyToString(google.cloud.compute.v1.SslPolicy.MinTlsVersion, minTlsVersion),
    profile: enumKeyToString(google.cloud.compute.v1.SslPolicy.Profile, profile),
    selfLink,
    warnings: warnings?.map(warning => ({
      id: cuid(),
      code: enumKeyToString(google.cloud.compute.v1.Warnings.Code, warning?.code),
      data: warning?.data?.map(data => ({
        id: cuid(),
        key: data?.key,
        value: data?.value,
      })),
      message: warning?.message,
    })),
  }
}
