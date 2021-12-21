import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpLogView } from '../logView/data'
import { RawGcpLogBucket } from './data'
import { GLOBAL_REGION } from '../../config/constants'

import services from '../../enums/services'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpLogBucket
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { name: id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find Log Views
   */
  const views: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.logView)

  if (views?.data?.[GLOBAL_REGION]) {
    const view = views.data[GLOBAL_REGION].find(
      ({ bucketName }: RawGcpLogView) => bucketName === id
    )

    if (view) {
      connections.push({
        id: view.name,
        resourceType: services.logView,
        relation: 'child',
        field: 'logView',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
