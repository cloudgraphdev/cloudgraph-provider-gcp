import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { RawGcpSubnet } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'
const aliases = {
  vmInstance: 'vmInstances',
}

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpSubnet
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services).filter(service => service !== services.subnet)

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    const regions = [region, GLOBAL_REGION]
    for (const region of regions) {
      if (instances?.data?.[region]) {
        const filtered = instances.data[region].filter(
          ({ subnet, projectId }: rawDataInterface) => projectId === service.projectId && subnet
        )

        for (const { id, subnet } of filtered) {
          for (const name of subnet) {
            if (name === service.selfLink) {
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
