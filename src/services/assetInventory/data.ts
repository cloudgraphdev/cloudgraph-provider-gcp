import cuid from 'cuid'
import { AssetServiceClient } from '@google-cloud/asset'
import { google } from '@google-cloud/asset/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Asset Inventory'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpAsset extends google.cloud.asset.v1.IAsset {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpAsset[]
}> =>
  new Promise(async resolve => {
    const assetList: RawGcpAsset[] = []
    const { projectId } = config

    /**
     * Get all Assets
     */
    try {
      const assetClient = new AssetServiceClient({ ...config, apiEndpoint });
      const iterable = assetClient.listAssetsAsync({
        contentType: "RESOURCE",
        parent: `projects/${projectId}`
      })
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          assetList.push({
            ...response,
            id: cuid(),
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(serviceName, 'asset:listAssetsAsync', error)
    }

    logger.debug(lt.foundResources(serviceName, assetList.length))
    resolve(groupBy(assetList, 'region'))
  })
