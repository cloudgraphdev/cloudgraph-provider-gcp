import cuid from 'cuid'
import { GcpStorageBucket } from '../../types/generated'
import { RawGcpStorageBucket } from './data'

export default ({
  service,
}: {
  service: RawGcpStorageBucket
}): GcpStorageBucket => {
  const {
    id,
    projectId,
    region,
    metadata,
    baseUrl,
    name,
    pollIntervalMs,
    userProject,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    kind: metadata.kind,
    selfLink: metadata.selfLink,
    projectNumber: metadata.projectNumber,
    metageneration: metadata.metageneration,
    location: metadata.location,
    storageClass: metadata.storageClass,
    etag: metadata.etag,
    defaultEventBasedHold: metadata.defaultEventBasedHold,
    timeCreated: metadata.timeCreated,
    updated: metadata.updated,
    labels: Object.keys(metadata.labels || {}).map(key => ({
      id: cuid(),
      key,
      value: metadata.labels[key],
    })),
    iamConfiguration: metadata.iamConfiguration,
    locationType: metadata.locationType,
    satisfiesPZS: metadata.satisfiesPZS,
    rpo: metadata.rpo,
    baseUrl,
    pollIntervalMs,
    userProject,
  }
}
