import { DNS } from '@google-cloud/dns'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { listData }  from '../../utils/fetchUtils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph

const serviceName = 'DNS Managed Zone'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpManagedZone {
  projectId?: string
  kind?: string
  name?: string
  dnsName?: string
  description?: string
  id?: string
  nameServers?: string[]
  creationTime?: string
  dnssecConfig?: {
    kind?: string
    state?: string
    defaultKeySpecs?: {
      kind?: string
      keyType?: string
      algorithm?: string
      keyLength?: number
    }[]
    nonExistence?: string
  }
  nameServerSet?: string
  visibility?: string
  privateVisibilityConfig?: {
    kind?: string
    networks?: {
      kind?: string
      networkUrl?: string
    }[]
  }
  forwardingConfig?: {
    kind?: string
    targetNameServers?: {
      kind?: string
      ipv4Address?: string
      forwardingPath?: string
    }[]
  }
  labels?: {
    [key: string]: string
  }
  peeringConfig?: {
    kind?: string
    targetNetwork?: {
      kind: string
      networkUrl: string
      deactivateTime: string
    }
  }
  reverseLookupConfig?: {
    kind?: string
  }
  serviceDirectoryConfig?: {
    kind?: string
    namespace: {
      kind?: string
      namespaceUrl?: string
      deletionTime?: string
    }
  }
  cloudLoggingConfig?: {
    kind: string
    enableLogging: boolean
  }
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpManagedZone[]
}> => {
  const zoneList: RawGcpManagedZone[] = []
  try {
    const service = new DNS({ ...config, apiEndpoint })
    const data = await listData({
      service,
      apiUri: `https://dns.googleapis.com/dns/v1/projects/${config.projectId}/managedZones`,
      dataFieldName: 'managedZones',
    })
    for (const dnsZone of data) {
      zoneList.push({
        projectId: config.projectId,
        ...dnsZone,
        region: GLOBAL_REGION,
      })
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'vpc:listConnectors', error)
  }

  logger.debug(lt.foundResources(serviceName, zoneList.length))
  return groupBy(zoneList, 'region')
}
