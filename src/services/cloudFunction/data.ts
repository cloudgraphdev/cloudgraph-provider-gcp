import cuid from 'cuid'
import { CloudFunctionsServiceClient } from '@google-cloud/functions'
import { google } from '@google-cloud/functions/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Cloud Function'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpCloudFunction extends Omit<google.cloud.functions.v1.ICloudFunction, 'vpcConnector'> {
  id: string
  projectId: string
  region: string
  vpcConnector: string[]
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpCloudFunction[]
}> =>
  new Promise(async resolve => {
    const fnList: RawGcpCloudFunction[] = []
    const { projectId } = config

    for (const region of regions.split(',')) {
      /**
       * Get all the Cloud Functions
       */
      try {
        const functionsClient = new CloudFunctionsServiceClient({ ...config, apiEndpoint });
        const iterable =  functionsClient.listFunctionsAsync({
          parent: `projects/${projectId}/locations/${region}`,
        })
        // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
        for await (const response of iterable) {
          if (response) {
            fnList.push({
              ...response,
              id: cuid(),
              projectId,
              region,
              vpcConnector: [response?.vpcConnector],
            })
          }
        }
      } catch (error) {
        generateGcpErrorLog(serviceName, 'functions:listFunctionsAsync', error)
      }
    }

    logger.debug(lt.foundResources(serviceName, fnList.length))
    resolve(groupBy(fnList, 'region'))
  })
