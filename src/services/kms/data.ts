import groupBy from 'lodash/groupBy'
import { KeyManagementServiceClient } from '@google-cloud/kms'
import { google } from '@google-cloud/kms/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'KMS'
const apiEndpoint = initTestEndpoint(serviceName)
export interface RawGcpKms extends google.cloud.kms.v1.IKeyRing {
  id: string
  importJobs: google.cloud.kms.v1.IImportJob[]
  projectId: string
  region: string
}

export const listKmsData = async (
  client: KeyManagementServiceClient,
  regions: string,
  projectId: string,
  keyRings: RawGcpKms[]
): Promise<void> =>
  new Promise<void>(async resolve => {
    const allRegions = regions.split(',').concat([GLOBAL_REGION])
    for (const region of allRegions) {
      try {
        const locationName = client.locationPath(projectId, region)
        const iterableKeyRings = client.listKeyRingsAsync({
          parent: locationName,
        })

        for await (const keyRing of iterableKeyRings) {
          const rawGcpKms = {
            id: keyRing.name,
            ...keyRing,
            importJobs: [],
            projectId,
            region,
          }

          try {
            const iterableKeyRingImportJobs = client.listImportJobsAsync({
              parent: keyRing.name,
            })
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
    resolve()
  })

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpKms[]
}> =>
  new Promise(async resolve => {
    const keyRings: RawGcpKms[] = []
    const { projectId } = config

    const client = new KeyManagementServiceClient({ ...config, apiEndpoint })

    await listKmsData(client, regions, projectId, keyRings)

    logger.debug(lt.foundResources(serviceName, keyRings.length))
    return resolve(groupBy(keyRings, 'region'))
  })
