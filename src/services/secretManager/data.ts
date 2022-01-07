import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { google } from '@google-cloud/secret-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Secret Manager'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpSecret extends google.cloud.secretmanager.v1.ISecret {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpSecret[]
}> =>
  new Promise(async resolve => {
    const secretList: RawGcpSecret[] = []
    const { projectId } = config

    /**
     * Get all of the Secrets
     */
    try {
      const secretManagerClient = new SecretManagerServiceClient({ ...config, apiEndpoint });
      const iterable = secretManagerClient.listSecretsAsync({
        parent: `projects/${projectId}`,
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          secretList.push({
            id: response.name,
            ...response,
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'secretManager:listSecretsAsync', error)
    }
    
    logger.debug(lt.foundResources(serviceName, secretList.length))
    resolve(groupBy(secretList, 'region'))
  })
