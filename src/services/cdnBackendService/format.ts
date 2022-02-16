import { google } from '@google-cloud/compute/build/protos/protos'

import cuid from 'cuid'
import { RawGcpCdnBackendService } from './data'
import { enumKeyToString } from '../../utils/format'
import {
  GcpCdnBackendService,
  GcpCdnBackendServiceBackend,
  GcpCdnBackendServiceCdnPolicy,
  GcpCdnBackendServiceCdnPolicyNegativeCachingPolicy,
  GcpCdnBackendServiceOutlierDetection,
} from '../../types/generated'

const formatBackend = ({
  balancingMode,
  capacityScaler,
  description,
  failover,
  group,
  maxConnections,
  maxConnectionsPerEndpoint,
  maxConnectionsPerInstance,
  maxRate,
  maxRatePerEndpoint,
  maxRatePerInstance,
  maxUtilization,
}: google.cloud.compute.v1.IBackend): GcpCdnBackendServiceBackend => {
  return {
    id: cuid(),
    balancingMode: enumKeyToString(google.cloud.compute.v1.Backend.BalancingMode, balancingMode),
    capacityScaler,
    description,
    failover,
    group,
    maxConnections,
    maxConnectionsPerEndpoint,
    maxConnectionsPerInstance,
    maxRate,
    maxRatePerEndpoint,
    maxRatePerInstance,
    maxUtilization,
  }
}

const formatCdnPolicyNegativeCachingPolicy = ({
  code,
  ttl,
}: google.cloud.compute.v1.IBackendServiceCdnPolicyNegativeCachingPolicy): GcpCdnBackendServiceCdnPolicyNegativeCachingPolicy => {
  return {
    id: cuid(),
    code,
    ttl,
  }
}

const formatCdnPolicy = ({
  bypassCacheOnRequestHeaders = [],
  cacheKeyPolicy,
  cacheMode,
  clientTtl,
  defaultTtl,
  maxTtl,
  negativeCaching,
  negativeCachingPolicy = [],
  requestCoalescing,
  serveWhileStale,
  signedUrlCacheMaxAgeSec,
  signedUrlKeyNames,
}: google.cloud.compute.v1.IBackendServiceCdnPolicy): GcpCdnBackendServiceCdnPolicy => {
  return {
    bypassCacheOnRequestHeaderNames: bypassCacheOnRequestHeaders?.map(
      header => header?.headerName || ''
    ),
    cacheKeyPolicyIncludeHost: cacheKeyPolicy?.includeHost || false,
    cacheKeyPolicyIncludeProtocol: cacheKeyPolicy?.includeProtocol || false,
    cacheKeyPolicyIncludeQueryString: cacheKeyPolicy?.includeQueryString || false,
    cacheKeyPolicyQueryStringBlacklist: cacheKeyPolicy?.queryStringBlacklist || [],
    cacheKeyPolicyQueryStringWhitelist: cacheKeyPolicy?.queryStringWhitelist || [], 
    cacheMode: enumKeyToString(google.cloud.compute.v1.BackendServiceCdnPolicy.CacheMode, cacheMode),
    clientTtl,
    defaultTtl,
    maxTtl,
    negativeCaching,
    negativeCachingPolicy: negativeCachingPolicy?.map(policy => formatCdnPolicyNegativeCachingPolicy(policy)),
    requestCoalescing,
    serveWhileStale,
    signedUrlCacheMaxAgeSec: signedUrlCacheMaxAgeSec?.toString() || '',
    signedUrlKeyNames,
  }
}

const formatOutlierDetection = ({
  baseEjectionTime,
  consecutiveErrors,
  consecutiveGatewayFailure,
  enforcingConsecutiveErrors,
  enforcingConsecutiveGatewayFailure,
  enforcingSuccessRate,
  interval,
  maxEjectionPercent,
  successRateMinimumHosts,
  successRateRequestVolume,
  successRateStdevFactor,
}: google.cloud.compute.v1.IOutlierDetection): GcpCdnBackendServiceOutlierDetection => {
  return {
    baseEjectionTime: baseEjectionTime?.seconds?.toString() || '',
    consecutiveErrors,
    consecutiveGatewayFailure,
    enforcingConsecutiveErrors,
    enforcingConsecutiveGatewayFailure,
    enforcingSuccessRate,
    interval: interval?.seconds?.toString() || '',
    maxEjectionPercent,
    successRateMinimumHosts,
    successRateRequestVolume,
    successRateStdevFactor,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpCdnBackendService
  account: string
  region: string
}): GcpCdnBackendService => {
  const {
    affinityCookieTtlSec,
    backends = [],
    cdnPolicy = {},
    circuitBreakers,
    connectionDraining,
    consistentHash,
    creationTimestamp,
    customRequestHeaders,
    customResponseHeaders,
    description,
    enableCDN,
    failoverPolicy,
    fingerprint,
    healthChecks,
    iap,
    id,
    kind,
    loadBalancingScheme,
    localityLbPolicy,
    logConfig,
    maxStreamDuration,
    name,
    outlierDetection = {},
    port,
    portName,
    protocol,
    securityPolicy,
    securitySettings,
    selfLink,
    sessionAffinity,
    timeoutSec,
  } = service

  return {
    id,
    projectId: account,
    region,
    name,
    affinityCookieTtlSec,
    backends: backends?.map(backend => formatBackend(backend)),
    cdnPolicy: formatCdnPolicy(cdnPolicy),
    circuitBreakersMaxConnections: circuitBreakers?.maxConnections || 0,
    circuitBreakersMaxPendingRequests: circuitBreakers?.maxPendingRequests || 0,
    circuitBreakersMaxRequests: circuitBreakers?.maxRequests || 0,
    circuitBreakersMaxRequestsPerConnection: circuitBreakers?.maxRequestsPerConnection || 0,
    circuitBreakersMaxRetries: circuitBreakers?.maxRetries || 0,
    connectionDrainingTimeoutSec: connectionDraining?.drainingTimeoutSec || 0,
    consistentHashLoadBalancerSettingHttpCookieName: consistentHash?.httpCookie?.name || '',
    consistentHashLoadBalancerSettingHttpCookiePath: consistentHash?.httpCookie?.path || '',
    consistentHashLoadBalancerSettingHttpCookie: consistentHash?.httpCookie?.ttl.seconds?.toString() || '',
    consistentHashLoadBalancerSettingHttpHeaderName: consistentHash?.httpHeaderName || '',
    consistentHashLoadBalancerSettingMinimumRingSize: consistentHash?.minimumRingSize?.toString() || '',
    creationTimestamp,
    customRequestHeaders,
    customResponseHeaders,
    description,
    enableCDN,
    failoverPolicyDisableConnectionDrainOnFailover: failoverPolicy?.disableConnectionDrainOnFailover || false,
    failoverPolicyDropTrafficIfUnhealthy: failoverPolicy?.dropTrafficIfUnhealthy || false,
    failoverPolicyFailoverRatio: failoverPolicy?.failoverRatio || 0,
    fingerprint,
    healthChecks,
    iapEnabled: iap?.enabled || false,
    iapOauth2ClientId: iap?.oauth2ClientId || '',
    // remove the secrets
    // oauth2ClientSecret
    // oauth2ClientSecretSha256
    kind,
    loadBalancingScheme: enumKeyToString(google.cloud.compute.v1.BackendService.LoadBalancingScheme, loadBalancingScheme),
    localityLbPolicy: enumKeyToString(google.cloud.compute.v1.BackendService.LocalityLbPolicy, localityLbPolicy),
    logConfigEnable: logConfig?.enable || false,
    logConfigSampleRate: logConfig?.sampleRate || 0,
    maxStreamDuration: maxStreamDuration?.seconds?.toString() || '',
    outlierDetection: formatOutlierDetection(outlierDetection),
    port,
    portName,
    protocol: enumKeyToString(google.cloud.compute.v1.BackendService.Protocol, protocol),
    securityPolicy,
    securitySettingClientTlsPolicy: securitySettings?.clientTlsPolicy || '',
    securitySettingSubjectAltNames: securitySettings?.subjectAltNames || [],
    selfLink,
    sessionAffinity: enumKeyToString(google.cloud.compute.v1.BackendService.SessionAffinity, sessionAffinity),
    timeoutSec,
  }
}
