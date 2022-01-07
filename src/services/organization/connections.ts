import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpFolder } from '../folder/data'
import { RawGcpOrganization } from './data'
import { GLOBAL_REGION } from '../../config/constants'

import services from '../../enums/services'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpOrganization
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { name: id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find Folders
   */
  const views: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.folder)

  if (views?.data?.[GLOBAL_REGION]) {
    const view = views.data[GLOBAL_REGION].find(
      ({ parent }: RawGcpFolder) => parent === id
    )

    if (view) {
      connections.push({
        id: view.name,
        resourceType: services.folder,
        relation: 'child',
        field: 'folder',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
