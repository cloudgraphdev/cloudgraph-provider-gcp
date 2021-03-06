import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { RawGcpProject } from './data'
import { GLOBAL_REGION, MULTI_REGIONS } from '../../config/constants'
import services from '../../enums/services'
import aliases from '../../enums/serviceAliases'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpProject
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { name: id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services).filter(
    service => service !== services.project
  )

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    const regions = [region, GLOBAL_REGION, ...MULTI_REGIONS]
    for (const region of regions) {
      if (instances?.data?.[region]) {
        const filtered = instances.data[region].filter(
          ({ projectId }: rawDataInterface) => projectId === service.projectId
        )

        for (const instance of filtered) {
          if (instance) {
            connections.push({
              id: instance.id,
              resourceType: serviceName,
              relation: 'child',
              field: aliases[serviceName] ? aliases[serviceName] : serviceName,
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
