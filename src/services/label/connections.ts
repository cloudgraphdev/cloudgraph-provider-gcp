import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  service: any
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services)

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    const regions = [region, GLOBAL_REGION]
    for (const region of regions) {
      if (instances?.data?.[region]) {
        const filtered = instances.data[region].filter(
          ({ labels }: rawDataInterface) => !!labels
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
  
  const labelResult = {
    [id]: connections,
  }
  return labelResult
}
