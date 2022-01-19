import { DNS } from '@google-cloud/dns'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { listData } from '../../utils/fetchUtils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph

const serviceName = 'Service Account'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpServiceAccountKey {
  name: string
  validAfterTime: string
  validBeforeTime: string
  keyAlgorithm: string
  keyOrigin: string
  keyType: string
}

export interface RawGcpServiceAccount {
  name: string
  projectId: string
  uniqueId: string
  email: string
  displayName: string
  etag: string
  oauth2ClientId: string
  region: string
  keys: RawGcpServiceAccountKey[]
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpServiceAccount[]
}> => {
  const serviceAccountList: RawGcpServiceAccount[] = []
  try {
    const service = new DNS({ ...config, apiEndpoint })

    // Fetch service accounts
    const accounts = await listData({
      service,
      apiUri: `https://iam.googleapis.com/v1/projects/${config.projectId}/serviceAccounts`,
      dataFieldName: 'accounts',
    })
    for (const account of accounts) {
      // Fetch service accounts keys
      const keys = await listData({
        service,
        apiUri: `https://iam.googleapis.com/v1/projects/${account.projectId}/serviceAccounts/${account.email}/keys`,
        dataFieldName: 'keys',
      })
      serviceAccountList.push({
        ...account,
        keys: keys ?? [],
        region: GLOBAL_REGION,
      })
    }
  } catch (error) {
    generateGcpErrorLog(
      serviceName,
      'serviceAccount:listServiceAccounts',
      error
    )
  }

  logger.debug(lt.foundResources(serviceName, serviceAccountList.length))
  return groupBy(serviceAccountList, 'region')
}
