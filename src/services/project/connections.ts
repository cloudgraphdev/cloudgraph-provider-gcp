import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpVpc } from '../vpc/data'
import { RawGcpProject } from './data'

import services from '../../enums/services'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpProject
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { projectId: id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find VPCs
   */
  const vpcs: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.vpc)

  if (vpcs?.data?.[region]) {
    const vpc = vpcs.data[region].find(
      ({ projectId }: RawGcpVpc) => projectId === id
    )

    if (vpc) {
      connections.push({
        id: vpc.name,
        resourceType: services.vpc,
        relation: 'child',
        field: 'vpc',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
