import {
  OrganizationsClient,
  TagKeysClient,
  TagValuesClient,
} from '@google-cloud/resource-manager'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput, TagMap } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Organization'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpOrganization
  extends google.cloud.resourcemanager.v3.IOrganization {
  id: string
  projectId: string
  region: string
  tags?: TagMap
}

export const listOrganizationsData = async (
  organizationsClient: OrganizationsClient,
  projectId: string,
  orgList: RawGcpOrganization[]
): Promise<void> =>
  new Promise<void>(async resolve => {
    /**
     * Get all the Organizations
     */
    try {
      const iterable = organizationsClient.searchOrganizationsAsync()
      // https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination
      for await (const response of iterable) {
        if (response) {
          orgList.push({
            id: response.name,
            ...response,
            projectId,
            region: GLOBAL_REGION,
          })
        }
      }
    } catch (error) {
      generateGcpErrorLog(
        serviceName,
        'resourceManager:searchOrganizationsAsync',
        error
      )
    }

    resolve()
  })

export const getTags = async ({
  tagKeysClient,
  tagValuesClient,
  resourceId,
}: {
  tagKeysClient: TagKeysClient
  tagValuesClient: TagValuesClient
  resourceId: string
}): Promise<TagMap> =>
  new Promise(async resolve => {
    const tags: TagMap = {}
    try {
      const iterable = tagKeysClient.listTagKeysAsync({ parent: resourceId })
      for await (const response of iterable) {
        if (response) {
          const { name: parent,  shortName: tagKey } = response
          const tagValuesIterable = await tagValuesClient.listTagValuesAsync({ parent })
          const tagValues: string[] = []
          for await (const tagValue of tagValuesIterable) {
            if (tagValue) {
              tagValues.push(tagValue.shortName)
            }
          }
          tags[tagKey] = tagValues
        }
      }
    } catch (error) {
      generateGcpErrorLog(
        serviceName,
        'resourceManager:listTagKeysAsync',
        error
      )
    }
    resolve(tags)
  })

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpOrganization[]
}> =>
  new Promise(async resolve => {
    const orgList: RawGcpOrganization[] = []
    const tagKeysClient = new TagKeysClient({ ...config, apiEndpoint })
    const tagValuesClient = new TagValuesClient({ ...config, apiEndpoint })
    const tagsPromises = []
    const { projectId } = config

    const organizationsClient = new OrganizationsClient({
      ...config,
      apiEndpoint,
    })

    // Get all Organizations
    await listOrganizationsData(organizationsClient, projectId, orgList)

    // Add tags to each Organization
    orgList.map(({ id }, idx) => {
      const tagsPromise = new Promise<void>(async resolveTags => {
        const tags = await getTags({
          tagKeysClient,
          tagValuesClient,
          resourceId: id,
        })

        orgList[idx].tags = tags || {}
        resolveTags()
      })
      tagsPromises.push(tagsPromise)
    })
    await Promise.all(tagsPromises)

    logger.debug(lt.foundResources(serviceName, orgList.length))
    resolve(groupBy(orgList, 'region'))
  })
