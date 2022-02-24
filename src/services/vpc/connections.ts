import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { RawGcpVpc } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'
const aliases = {
  cloudFunction: 'cloudFunctions',
  subnet: 'subnets',
}

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpVpc
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services).filter(
    service => service !== services.vpcConnector
  )

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    const regions = [region, GLOBAL_REGION]
    for (const region of regions) {
      if (instances?.data?.[region]) {
        const filtered = instances.data[region].filter(
          ({ vpcConnector, projectId }: rawDataInterface) =>
            projectId === service.projectId && vpcConnector
        )

        for (const { id, vpcConnector } of filtered) {
          for (const name of vpcConnector) {
            if (name === service.name) {
              connections.push({
                id,
                resourceType: serviceName,
                relation: 'child',
                field: aliases[serviceName] ? aliases[serviceName] : serviceName,
              })
            }
          }
        }
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
