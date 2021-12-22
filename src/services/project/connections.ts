import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpVpc } from '../vpc/data'
import { RawGcpProject } from './data'

import services from '../../enums/services'
import { RawGcpKms } from '../kms/data'

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
  const { name: id } = service
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
      ({ projectId }: RawGcpVpc) => projectId === service.projectId
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

  /**
   * Find kms
   */
  const kmss: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.kms)
  if (kmss?.data?.[region]) {
    const kms = kmss.data[region].find(
      ({ projectId }: RawGcpKms) => projectId === service.projectId
    )

    if (kms) {
      connections.push({
        id: kms.name,
        resourceType: services.kms,
        relation: 'child',
        field: 'kms',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
