import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { RawGcpSubnet } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'

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
          ({ subnet, projectId }: rawDataInterface) => projectId === service.projectId && subnet === service.name
        )

        for (const instance of filtered) {
          if (instance) {
            connections.push({
              id: instance.id,
              resourceType: serviceName,
              relation: 'child',
              field: serviceName,
            })
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
