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

export interface RawGcpPolicy {
  projectId?: string
  kind?: string
  name?: string
  id?: string
  enableInboundForwarding?: boolean
  description?: string
  networks?: {
    kind?: string
    networkUrl?: string
  }[]
  alternativeNameServerConfig?: {
    kind: string
    targetNameServers: {
      kind?: string
      ipv4Address?: string
      forwardingPath?: string
    }[]
  }
  enableLogging?: boolean
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpPolicy[]
}> => {
  const policyList: RawGcpPolicy[] = []
  try {
    const service = new DNS({ ...config, apiEndpoint })
    const data = await listData({
      service,
      apiUri: `https://dns.googleapis.com/dns/v1/projects/${config.projectId}/policies`,
      dataFieldName: 'policies',
    })
    for (const dnsPolicy of data) {
      policyList.push({
        projectId: config.projectId,
        ...dnsPolicy,
        region: GLOBAL_REGION,
      })
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'vpc:listConnectors', error)
  }

  logger.debug(lt.foundResources(serviceName, policyList.length))
  return groupBy(policyList, 'region')
}
