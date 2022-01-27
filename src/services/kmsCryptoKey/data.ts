import groupBy from 'lodash/groupBy'
import { KeyManagementServiceClient } from '@google-cloud/kms'
import { google } from '@google-cloud/kms/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput, LabelMap,rawDataInterface } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'
import { listKmsData, RawGcpKms } from '../kms/data'
import services from '../../enums/services'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Kms Crypto Key'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpKmsCryptoKey
  extends Omit<google.cloud.kms.v1.ICryptoKey, 'labels'> {
  id: string
  name: string
  projectId: string
  region: string
  Labels: LabelMap
  kmsId: string
}

export const listCryptoKeysData = async (
  client: KeyManagementServiceClient,
  regions: string,
  projectId: string,
  rawData: rawDataInterface[],
  cryptoKeys: RawGcpKmsCryptoKey[]
): Promise<void> =>
  new Promise<void>(async resolve => {

    /**
     * Find Kms
     */
     const iterableKeyRings: RawGcpKms[] =
     rawData.find(({ name }) => name === services.kms)?.data[
       GLOBAL_REGION
     ] || []


    if (isEmpty(iterableKeyRings)) {
      // Refresh data
      await listKmsData(client, regions, projectId, iterableKeyRings)
    }

    for (const keyRing of iterableKeyRings) {
      try {

        const iterableKeyRingCryptoKeys = await client.listCryptoKeys({parent: keyRing.name})
       
        if (isEmpty(iterableKeyRingCryptoKeys)) {
          resolve()
        }

        for (const {
          name,
          labels,
          ...rest
        } of iterableKeyRingCryptoKeys[0]) {
          cryptoKeys.push({
            id: name,
            name,
            kmsId: keyRing.name,
            projectId,
            region: keyRing.region,
            Labels: labels,
            ...rest,
          })
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'kms:listCryptoKeys', error)
      }
    }

    resolve()
  })

export default async ({
  regions,
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpKmsCryptoKey[]
}> =>
  new Promise(async resolve => {
    const cryptoKeys: RawGcpKmsCryptoKey[] = []
    const { projectId } = config

    const client = new KeyManagementServiceClient({ ...config, apiEndpoint })

    await listCryptoKeysData(client, regions, projectId, rawData, cryptoKeys)

    logger.debug(lt.foundResources(serviceName, cryptoKeys.length))
    resolve(groupBy(cryptoKeys, 'region'))
  })
