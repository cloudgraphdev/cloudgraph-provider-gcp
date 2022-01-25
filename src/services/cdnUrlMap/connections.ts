import isEmpty from 'lodash/isEmpty'
import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpCdnUrlMap } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpCdnUrlMap
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  let connectedBackendBuckets: string[] = []
  let connectedBackendServices: string[] = []
  const {
    id,
    defaultService,
    defaultRouteAction = {},
    pathMatchers = [],
  } = service

  connectedBackendBuckets.push(
    ...(pathMatchers?.flatMap(
      pathMatcher => pathMatcher?.pathRules?.flatMap(
        pathRule => pathRule?.service
      ) || []
    ) || []), // backend bucket
  )

  connectedBackendServices.push(
    defaultService,
    ...(defaultRouteAction?.weightedBackendServices?.flatMap(weightedBackendService => weightedBackendService.backendService) || []),
    ...(pathMatchers?.flatMap(pathMatcher => pathMatcher?.defaultService) || []),
    ...(pathMatchers?.flatMap(pathMatcher => pathMatcher?.defaultRouteAction?.requestMirrorPolicy?.backendService) || []), // undefined
    ...(pathMatchers?.flatMap(
      pathMatcher => pathMatcher?.defaultRouteAction?.weightedBackendServices?.flatMap(
        weightedBackendService => weightedBackendService.backendService
      ) || []
    ) || []),
    ...(pathMatchers?.flatMap(
      pathMatcher => pathMatcher?.pathRules?.flatMap(
        pathRule => pathRule?.routeAction?.requestMirrorPolicy?.backendService
      ) || []
    ) || []),
    ...(pathMatchers?.flatMap(
      pathMatcher => pathMatcher?.pathRules?.flatMap(
        pathRule => pathRule?.routeAction?.weightedBackendServices?.flatMap(
          weightedBackendService => weightedBackendService.backendService
        ) || []
      ) || []
    ) || []),
  )

  connectedBackendBuckets = [...new Set(connectedBackendBuckets)].filter(bucket => {return bucket})
  connectedBackendServices = [...new Set(connectedBackendServices)].filter(service => {return service})

  const connections: ServiceConnection[] = []
  const toServiceUri = (projectId, backendService): string => 
    `https://www.googleapis.com/compute/v1/projects/${projectId}/${GLOBAL_REGION}/backendServices/${backendService}`
  const toBucketUri = (projectId, bucketService): string => 
    `https://www.googleapis.com/compute/v1/projects/${projectId}/${GLOBAL_REGION}/backendBuckets/${bucketService}`
  /**
   * Find CDN Backend Bucket
   * related to this Url Map
   */
  const backendBuckets: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.cdnBackendBucket)

  if (backendBuckets?.data?.[GLOBAL_REGION]) {

    const filteredCdnBackendBucketsInRegion = backendBuckets.data[GLOBAL_REGION].filter(
      ({ name, projectId }: RawGcpCdnUrlMap) => {
        return connectedBackendBuckets.includes(toBucketUri(projectId, name))
      }
    )

    if (!isEmpty(filteredCdnBackendBucketsInRegion)) {
      for (const cdnBackendBucket of filteredCdnBackendBucketsInRegion) {
        connections.push({
          id: cdnBackendBucket.id,
          resourceType: services.cdnBackendBucket,
          relation: 'child',
          field: 'cdnBackendBucket',
        })
      }
    }
  }

  /**
   * Find CDN Backend Services
   * related to this Url Map
   */
  const backendServices: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.cdnBackendService)

  if (backendServices?.data?.[GLOBAL_REGION]) {

    const filteredCdnBackendServiceInRegion = backendServices.data[GLOBAL_REGION].filter(
      ({ name, projectId }: RawGcpCdnUrlMap) => {
        return connectedBackendServices.includes(toServiceUri(projectId, name))
      }
    )

    if (!isEmpty(filteredCdnBackendServiceInRegion)) {
      for (const cdnBackendService of filteredCdnBackendServiceInRegion) {
        connections.push({
          id: cdnBackendService.id,
          resourceType: services.cdnBackendService,
          relation: 'child',
          field: 'cdnBackendService',
        })
      }

    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
