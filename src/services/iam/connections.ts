import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpProject } from '../project/data'
import { RawGcpIamPolicy } from './data'
import { GLOBAL_REGION } from '../../config/constants'

import services from '../../enums/services'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpIamPolicy
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id, resource } = service
  const connections: ServiceConnection[] = []

  /**
   * Find Projects
   */
  const projects: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.projects)

  if (projects?.data?.[GLOBAL_REGION]) {
    const project = projects.data[GLOBAL_REGION].find(
      ({ name }: RawGcpProject) => name === resource
    )

    if (project) {
      connections.push({
        id: project.name,
        resourceType: services.projects,
        relation: 'child',
        field: 'project',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
