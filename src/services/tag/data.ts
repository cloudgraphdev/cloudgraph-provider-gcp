import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import CloudGraph from '@cloudgraph/sdk'
import gcpLoggerText from '../../properties/logger'
import { generateGcpErrorLog } from '../../utils'
import { GcpServiceInput } from '../../types'
import { GcpTag } from '../../types/generated'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Tag'

export interface RawGcpTag extends GcpTag {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpTag[]
}> =>
  new Promise(async resolve => {
    const tagList: RawGcpTag[] = []
    const { projectId } = config

    try {
      for (const { data: entityData } of rawData) {
        for (const region of Object.keys(entityData)) {
          const dataAtRegion = entityData[region]
          dataAtRegion.forEach(singleEntity => {
            if (!isEmpty(singleEntity.tags)) {
              for (const [key, value] of Object.entries(singleEntity.tags)) {
                if (
                  !tagList.find(
                    ({ id }) => id === `${singleEntity.id}:${key}:${value}`
                  )
                ) {
                  tagList.push({
                    id: `${singleEntity.id}:${key}:${value}`,
                    projectId,
                    key,
                    value: String(value),
                    region,
                  })
                }
              }
            }
          })
        }
      }
    } catch (error: any) {
      generateGcpErrorLog(serviceName, '', error)
    }

    logger.debug(lt.foundResources(serviceName, tagList.length))
    resolve(groupBy(tagList, 'region'))
  })
