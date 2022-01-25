import { google } from '@google-cloud/compute/build/protos/protos'

import cuid from 'cuid'
import { RawGcpCdnUrlMap } from './data'
import { enumKeyToString } from '../../utils/format'
import {
  GcpCdnUrlMap,
  GcpCdnUrlMapPathMatcher,
  GcpCdnUrlMapPathMatcherPathRule,
  GcpCdnUrlMapPathMatcherRouteRule,
  GcpCdnUrlMapPathMatcherRouteRuleMatchRule,
  GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpHeaderMatch,
  GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpQueryParameterMatch,
  GcpCdnUrlMapPathMatcherRouteRuleMatchRuleMetadataFilter,
  GcpCdnUrlMapRouteAction,
  GcpCdnUrlMapRouteActionWeightedBackendService,
  GcpCdnUrlMapTest,
} from '../../types/generated'
import { toISOString } from '../../utils/dateutils'

const formatWeightedBackendService = ({
  backendService,
  headerAction,
  weight,
}: google.cloud.compute.v1.IWeightedBackendService): GcpCdnUrlMapRouteActionWeightedBackendService => {
  return {
    id: cuid(),
    backendService,
    headerActionRequestHeadersToAdd: headerAction?.requestHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionRequestHeadersToRemove: headerAction?.requestHeadersToRemove || [],
    headerActionResponseHeadersToAdd: headerAction?.responseHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionResponseHeadersToRemove: headerAction?.responseHeadersToRemove || [],
    weight,
  }
}

const formatRouteAction = ({
  corsPolicy,
  faultInjectionPolicy,
  maxStreamDuration,
  requestMirrorPolicy,
  retryPolicy,
  timeout,
  urlRewrite,
  weightedBackendServices = [],
}: google.cloud.compute.v1.IHttpRouteAction): GcpCdnUrlMapRouteAction => {
  return {
    corsPolicyAllowCredentials: corsPolicy?.allowCredentials || false,
    corsPolicyAllowHeaders: corsPolicy?.allowHeaders || [],
    corsPolicyAllowMethods: corsPolicy?.allowMethods || [],
    corsPolicyAllowOriginRegexes: corsPolicy?.allowOriginRegexes || [],
    corsPolicyAllowOrigins: corsPolicy?.allowOrigins || [],
    corsPolicyDisabled: corsPolicy?.disabled || false,
    corsPolicyExposeHeaders: corsPolicy?.exposeHeaders || [],
    corsPolicyMaxAge: corsPolicy?.maxAge || 0,
    faultInjectionPolicyAbortHttpStatus: faultInjectionPolicy?.abort?.httpStatus || 0,
    faultInjectionPolicyAbortPercentage: faultInjectionPolicy?.abort?.percentage || 0,
    faultInjectionPolicyDelayFixedDelay: toISOString(faultInjectionPolicy?.delay?.fixedDelay?.seconds?.toString()) || '',
    faultInjectionPolicyDelayPercentage: faultInjectionPolicy?.delay?.percentage || 0,
    maxStreamDuration: toISOString(maxStreamDuration?.seconds?.toString()) || '',
    requestMirrorPolicyBackendService: requestMirrorPolicy?.backendService || '',
    retryPolicyNumRetries: retryPolicy?.numRetries || 0,
    retryPolicyPerTryTimeout: toISOString(retryPolicy?.perTryTimeout?.seconds?.toString()) || '',
    retryPolicyRetryConditions: retryPolicy?.retryConditions || [],
    timeout: toISOString(timeout?.seconds?.toString()) || '',
    urlRewriteHostRewrite: urlRewrite?.hostRewrite || '',
    urlRewritePathPrefixRewrite: urlRewrite?.pathPrefixRewrite || '',
    weightedBackendServices: weightedBackendServices?.map(backendService => formatWeightedBackendService(backendService))
  }
}

const formatPathMatcherPathRule = ({
  paths,
  routeAction = {},
  service,
  urlRedirect,
}: google.cloud.compute.v1.IPathRule): GcpCdnUrlMapPathMatcherPathRule => {
  return {
    id: cuid(),
    paths,
    routeAction: formatRouteAction(routeAction),
    service,
    urlRedirectHostRedirect: urlRedirect?.hostRedirect || '',
    urlRedirectHttpsRedirect: urlRedirect?.httpsRedirect || false,
    urlRedirectPathRedirect: urlRedirect?.pathRedirect || '',
    urlRedirectPrefixRedirect: urlRedirect?.prefixRedirect || '',
    urlRedirectRedirectResponseCode:
      enumKeyToString(google.cloud.compute.v1.HttpRedirectAction.RedirectResponseCode, urlRedirect?.redirectResponseCode) || '',
    urlRedirectStripQuery: urlRedirect?.stripQuery || false,
  }
}

const formatPathMatcherRouteRuleMatchRuleHttpHeaderMatch = ({
  exactMatch,
  headerName,
  invertMatch,
  prefixMatch,
  presentMatch,
  rangeMatch,
  regexMatch,
  suffixMatch,
}: google.cloud.compute.v1.IHttpHeaderMatch): GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpHeaderMatch => {
  return {
    id: cuid(),
    exactMatch,
    headerName,
    invertMatch,
    prefixMatch,
    presentMatch,
    rangeMatchEnd: rangeMatch?.rangeEnd?.toString() || '',
    rangeMatchStart: rangeMatch?.rangeStart?.toString() || '',
    regexMatch,
    suffixMatch,
  }
}

const formatPathMatcherRouteRuleMatchRuleMetadataFilter = ({
  filterLabels = [],
  filterMatchCriteria,
}: google.cloud.compute.v1.IMetadataFilter): GcpCdnUrlMapPathMatcherRouteRuleMatchRuleMetadataFilter => {
  return {
    id: cuid(),
    filterLabels: filterLabels?.map(
      ({
        name,
        value,
      }) => {
        return{
          id: cuid(),
          name,
          value,
        }}
    ),
    filterMatchCriteria: enumKeyToString(google.cloud.compute.v1.MetadataFilter.FilterMatchCriteria, filterMatchCriteria) || '',
  }
}

const formatPathMatcherRouteRuleMatchRuleHttpQueryParameterMatch = ({
  exactMatch,
  name,
  presentMatch,
  regexMatch,
}: google.cloud.compute.v1.IHttpQueryParameterMatch): GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpQueryParameterMatch => {
  return {
    id: cuid(),
    exactMatch,
    name,
    presentMatch,
    regexMatch,
  }
}

const formatPathMatcherRouteRuleMatchRules = ({
  fullPathMatch,
  headerMatches = [],
  ignoreCase,
  metadataFilters = [],
  prefixMatch,
  queryParameterMatches = [],
  regexMatch,
}: google.cloud.compute.v1.IHttpRouteRuleMatch): GcpCdnUrlMapPathMatcherRouteRuleMatchRule => {
  return {
    id: cuid(),
    fullPathMatch,
    headerMatches: headerMatches?.map(headerMatche => formatPathMatcherRouteRuleMatchRuleHttpHeaderMatch(headerMatche)),
    ignoreCase,
    metadataFilters: metadataFilters?.map(metadataFilter => formatPathMatcherRouteRuleMatchRuleMetadataFilter(metadataFilter)),
    prefixMatch,
    queryParameterMatches: queryParameterMatches?.map(
      queryParameterMatch => formatPathMatcherRouteRuleMatchRuleHttpQueryParameterMatch(queryParameterMatch)
    ),
    regexMatch,
  }
}

const formatPathMatcherRouteRule = ({
  description,
  headerAction,
  matchRules = [],
  priority,
  routeAction = {},
  service,
  urlRedirect = {},
}: google.cloud.compute.v1.IHttpRouteRule): GcpCdnUrlMapPathMatcherRouteRule => {
  return {
    id: cuid(),
    description,
    headerActionRequestHeadersToAdd: headerAction?.requestHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionRequestHeadersToRemove: headerAction?.requestHeadersToRemove || [],
    headerActionResponseHeadersToAdd: headerAction?.responseHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionResponseHeadersToRemove: headerAction?.responseHeadersToRemove || [],
    matchRules: matchRules?.map(matchRule => formatPathMatcherRouteRuleMatchRules(matchRule)),
    priority,
    routeAction: formatRouteAction(routeAction),
    service,
    urlRedirectHostRedirect: urlRedirect?.hostRedirect || '',
    urlRedirectHttpsRedirect: urlRedirect?.httpsRedirect || false,
    urlRedirectPathRedirect: urlRedirect?.pathRedirect || '',
    urlRedirectPrefixRedirect: urlRedirect?.prefixRedirect || '',
    urlRedirectRedirectResponseCode:
      enumKeyToString(google.cloud.compute.v1.HttpRedirectAction.RedirectResponseCode, urlRedirect?.redirectResponseCode) || '',
    urlRedirectStripQuery: urlRedirect?.stripQuery || false,
  }
}


const formatPathMatcher = ({
  name,
  defaultRouteAction = {},
  defaultService,
  defaultUrlRedirect,
  description,
  headerAction,
  pathRules = [],
  routeRules = [],
}: google.cloud.compute.v1.IPathMatcher): GcpCdnUrlMapPathMatcher => {
  return {
    id: cuid(),
    name,
    defaultRouteAction: formatRouteAction(defaultRouteAction),
    defaultService,
    defaultUrlRedirectHostRedirect: defaultUrlRedirect?.hostRedirect || '',
    defaultUrlRedirectHttpsRedirect: defaultUrlRedirect?.httpsRedirect || false,
    defaultUrlRedirectPathRedirect: defaultUrlRedirect?.pathRedirect || '',
    defaultUrlRedirectPrefixRedirect: defaultUrlRedirect?.prefixRedirect || '',
    defaultUrlRedirectRedirectResponseCode:
      enumKeyToString(google.cloud.compute.v1.HttpRedirectAction.RedirectResponseCode, defaultUrlRedirect?.redirectResponseCode) || '',
    defaultUrlRedirectStripQuery: defaultUrlRedirect?.stripQuery || false,
    description,
    headerActionRequestHeadersToAdd: headerAction?.requestHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionRequestHeadersToRemove: headerAction?.requestHeadersToRemove || [],
    headerActionResponseHeadersToAdd: headerAction?.responseHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionResponseHeadersToRemove: headerAction?.responseHeadersToRemove || [],
    pathRules: pathRules?.map(pathRule => formatPathMatcherPathRule(pathRule)),
    routeRules: routeRules?.map(routeRule => formatPathMatcherRouteRule(routeRule)),
  }
}



const formatCdnUrlMapTest = ({
  description,
  expectedOutputUrl,
  expectedRedirectResponseCode,
  headers = [],
  host,
  path,
  service,
}: google.cloud.compute.v1.IUrlMapTest): GcpCdnUrlMapTest => {
  return {
    id: cuid(),
    description,
    expectedOutputUrl,
    expectedRedirectResponseCode,
    headers: headers?.map(({
      name,
      value,
    }) => {
      return {
        id: cuid(),
        name,
        value,
      }
    }),
    host,
    path,
    service,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpCdnUrlMap
  account: string
  region: string
}): GcpCdnUrlMap => {
  const {
    id,
    creationTimestamp,
    defaultRouteAction = {},
    defaultService,
    defaultUrlRedirect,
    description,
    fingerprint,
    headerAction,
    hostRules = [],
    kind,
    name,
    pathMatchers = [],
    selfLink,
    tests = [],
  } = service

  return {
    id,
    projectId: account,
    region,
    name,
    creationTimestamp,
    defaultRouteAction: formatRouteAction(defaultRouteAction),
    defaultService,
    defaultUrlRedirectHostRedirect: defaultUrlRedirect?.hostRedirect || '',
    defaultUrlRedirectHttpsRedirect: defaultUrlRedirect?.httpsRedirect || false,
    defaultUrlRedirectPathRedirect: defaultUrlRedirect?.pathRedirect || '',
    defaultUrlRedirectPrefixRedirect: defaultUrlRedirect?.prefixRedirect || '',
    defaultUrlRedirectRedirectResponseCode: 
      enumKeyToString(google.cloud.compute.v1.HttpRedirectAction.RedirectResponseCode, defaultUrlRedirect?.redirectResponseCode) || '',
    defaultUrlRedirectStripQuery: defaultUrlRedirect?.stripQuery || false,
    description,
    fingerprint,
    headerActionRequestHeadersToAdd: headerAction?.requestHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionRequestHeadersToRemove: headerAction?.requestHeadersToRemove || [],
    headerActionResponseHeadersToAdd: headerAction?.responseHeadersToAdd?.map(({
      headerName,
      headerValue,
      replace,
    }: google.cloud.compute.v1.IHttpHeaderOption) => {
      return {
        id: cuid(),
        headerName,
        headerValue,
        replace,
      }
    }) || [],
    headerActionResponseHeadersToRemove: headerAction?.responseHeadersToRemove || [],
    hostRules: hostRules?.map(({
      description: hostRuleDescription,
      hosts,
      pathMatcher,
    }) => {
      return {
        id: cuid(),
        description: hostRuleDescription || '',
        hosts,
        pathMatcher,
      }
    }),
    kind,
    pathMatchers: pathMatchers?.map(pathMatcher => formatPathMatcher(pathMatcher)),
    selfLink,
    tests: tests?.map(test => formatCdnUrlMapTest(test))
  }
}
