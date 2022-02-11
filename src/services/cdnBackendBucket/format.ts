import { google } from '@google-cloud/compute/build/protos/protos'

import cuid from 'cuid'
import { RawGcpCdnBackendBucket } from './data'
import { enumKeyToString } from '../../utils/format'
import {
  GcpCdnBackendBucket,
  GcpCdnBackendBucketCdnPolicy,
  GcpCdnBackendBucketCdnPolicyNegativeCachingPolicy,
} from '../../types/generated'

const formatCdnPolicyNegativeCachingPolicy = ({
  code,
  ttl,
}: google.cloud.compute.v1.IBackendBucketCdnPolicyNegativeCachingPolicy): GcpCdnBackendBucketCdnPolicyNegativeCachingPolicy => {
  return {
    id: cuid(),
    code,
    ttl,
  }
}

const formatCdnPolicy = ({
  bypassCacheOnRequestHeaders,
  cacheMode,
  clientTtl,
  defaultTtl,
  maxTtl,
  negativeCaching,
  negativeCachingPolicy,
  requestCoalescing,
  serveWhileStale,
  signedUrlCacheMaxAgeSec,
  signedUrlKeyNames,
}: google.cloud.compute.v1.IBackendBucketCdnPolicy): GcpCdnBackendBucketCdnPolicy => {
  return {
    bypassCacheOnRequestHeaderNames: bypassCacheOnRequestHeaders?.map(
      header => header?.headerName || ''
    ) || [],
    cacheMode: enumKeyToString(google.cloud.compute.v1.BackendBucketCdnPolicy.CacheMode, cacheMode),
    clientTtl,
    defaultTtl,
    maxTtl,
    negativeCaching,
    negativeCachingPolicy: negativeCachingPolicy?.map(policy => formatCdnPolicyNegativeCachingPolicy(policy)) || [],
    requestCoalescing,
    serveWhileStale,
    signedUrlCacheMaxAgeSec: signedUrlCacheMaxAgeSec?.toString() || '',
    signedUrlKeyNames,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpCdnBackendBucket
  account: string
  region: string
}): GcpCdnBackendBucket => {
  const {
    bucketName,
    cdnPolicy = {},
    creationTimestamp,
    customResponseHeaders,
    description,
    enableCdn,
    id,
    kind,
    name,
    selfLink,
  } = service

  return {
    id,
    projectId: account,
    region,
    name,
    bucketName,
    cdnPolicy: formatCdnPolicy(cdnPolicy),
    creationTimestamp,
    customResponseHeaders,
    description,
    enableCdn,
    kind,
    selfLink,
  }
}
