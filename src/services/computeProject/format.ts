import cuid from 'cuid'
import { google } from '@google-cloud/compute/build/protos/protos'
import { GcpComputeProject } from '../../types/generated'
import { RawGcpComputeProject } from './data'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  region,
}: {
  service: RawGcpComputeProject
  region: string
}): GcpComputeProject => {
  const {
    id,
    projectId,
    name,
    commonInstanceMetadata,
    creationTimestamp,
    defaultNetworkTier,
    defaultServiceAccount,
    description,
    enabledFeatures,
    kind,
    quotas,
    selfLink,
    usageExportLocation,
    xpnProjectStatus,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    commonInstanceMetadata: {
      fingerprint: commonInstanceMetadata?.fingerprint,
      items: commonInstanceMetadata?.items?.map(item => ({
        id: cuid(),
        key: item?.key,
        value: item?.value,
      })),
      kind: commonInstanceMetadata?.kind,
    },
    creationTimestamp,
    defaultNetworkTier: enumKeyToString(google.cloud.compute.v1.Project.DefaultNetworkTier, defaultNetworkTier),
    defaultServiceAccount,
    description,
    enabledFeatures,
    kind,
    quotas: quotas?.map(quota => ({
      id: cuid(),
      limit: quota?.limit,
      metric: enumKeyToString(google.cloud.compute.v1.Quota.Metric, quota?.metric),
      owner: quota?.owner,
      usage: quota?.usage,
    })),
    selfLink,
    usageExportLocation,
    xpnProjectStatus: enumKeyToString(google.cloud.compute.v1.Project.XpnProjectStatus, xpnProjectStatus),
  }
}
