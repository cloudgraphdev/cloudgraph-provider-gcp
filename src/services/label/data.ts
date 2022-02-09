import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import CloudGraph from '@cloudgraph/sdk'
import gcpLoggerText from '../../properties/logger'
import { generateGcpErrorLog } from '../../utils'
import { GcpServiceInput } from '../../types'
import { GcpLabel } from '../../types/generated'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'Label'

export interface RawGcpLabel extends GcpLabel {
  id: string
  projectId: string
  region: string
}

export default async ({
  config,
  rawData,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpLabel[]
}> =>
  new Promise(async resolve => {
    const labelList: RawGcpLabel[] = []
    const { projectId } = config

    try {
      for (const { data: entityData } of rawData) {
        for (const region of Object.keys(entityData)) {
          const dataAtRegion = entityData[region]
          dataAtRegion.forEach(singleEntity => {
            if (!singleEntity.id) console.log(singleEntity)
            if (!isEmpty(singleEntity.labels)) {
              for (const [key, value] of Object.entries(singleEntity.labels)) {
                if (
                  !labelList.find(
                    ({ id }) => id === `${singleEntity.id}:${key}:${value}`
                  )
                ) {
                  labelList.push({
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

    logger.debug(lt.foundResources(serviceName, labelList.length))
    resolve(groupBy(labelList, 'region'))
  })
