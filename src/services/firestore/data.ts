import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { Datastore } from '@google-cloud/datastore'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'
import { listData } from '../../utils/fetchUtils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Firestore Database'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpFirestoreDatabase {
  id: string
  projectId: string
  region: string
  name: string
  createTime: string
  updateTime: string
  locationId: string
  type: string
  concurrencyMode: string
  appEngineIntegrationMode: string
  keyPrefix: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpFirestoreDatabase[]
}> =>
  new Promise(async resolve => {
    const firestoreDatabaseList: RawGcpFirestoreDatabase[] = []
    const { projectId } = config

    try {
      const service = new Datastore({ ...config, apiEndpoint })
      const data = await listData({
        accessToken: await service.auth.getAccessToken(),
        apiUri: `https://firestore.googleapis.com/v1/projects/${projectId}/databases`,
        dataFieldName: 'databases',
      })
      
      for (const {name, createTime, updateTime, locationId, type, concurrencyMode, appEngineIntegrationMode, keyPrefix} of data) {
        firestoreDatabaseList.push({
          id: name,
          projectId,
          region: GLOBAL_REGION,
          name,
          createTime,
          updateTime,
          locationId,
          type,
          concurrencyMode,
          appEngineIntegrationMode,
          keyPrefix,
        })
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'firestore:listDatabase', error)
    }
    
    logger.debug(lt.foundResources(serviceName, firestoreDatabaseList.length))
    resolve(groupBy(firestoreDatabaseList, 'region'))
  })
