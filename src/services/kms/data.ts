import groupBy from 'lodash/groupBy'
import { KeyManagementServiceClient } from '@google-cloud/kms'
import { google } from '@google-cloud/kms/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput, LabelMap } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'KMS'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpKmsCryptoKey 
  extends Omit<google.cloud.kms.v1.ICryptoKey, 'labels'> {
  Labels: LabelMap
}

export interface RawGcpKms extends google.cloud.kms.v1.IKeyRing {
  cryptoKeys: RawGcpKmsCryptoKey[]
  importJobs: google.cloud.kms.v1.IImportJob[]
  projectId: string
  region: string
  Labels: LabelMap
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpKms[]
}> => {
  const keyRings: RawGcpKms[] = []
  const { projectId } = config

  const client = new KeyManagementServiceClient({ ...config, apiEndpoint });
  for (const region of regions.split(',')) {
    try {
      const locationName = client.locationPath(projectId, region);
      const iterableKeyRings = client.listKeyRingsAsync({
        parent: locationName,
      })
      for await (const keyRing of iterableKeyRings) {
        const rawGcpKms = {
          ...keyRing,
          cryptoKeys: [],
          importJobs: [],
          projectId,
          region,
          Labels: {},
        }

        try {
          const iterableKeyRingCryptoKeys = client.listCryptoKeysAsync({parent: keyRing.name})
          for await (const {name, labels, ...rest} of iterableKeyRingCryptoKeys) {
            rawGcpKms.cryptoKeys.push({
              name,
              ...rest,
              Labels: labels,
            })
            Object.keys(labels).forEach(key => {
              rawGcpKms.Labels[`${name}:${key}`] = labels[key]
            })
          }
        } catch (error) {
          generateGcpErrorLog(serviceName, 'kms:listCryptoKeys', error)
        }

        try {
          const iterableKeyRingImportJobs = client.listImportJobsAsync({parent: keyRing.name})
          for await (const importJob of iterableKeyRingImportJobs) {
            rawGcpKms.importJobs.push(importJob)
          }
        } catch (error) {
          generateGcpErrorLog(serviceName, 'kms:listImportJobs', error)
        }

        keyRings.push(rawGcpKms)
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'kms:listKeyRings', error)
    }
  }
  logger.debug(lt.foundResources(serviceName, keyRings.length))

  return groupBy(keyRings, 'region')
}
