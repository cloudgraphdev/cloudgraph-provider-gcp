import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { RawGcpNetwork } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'

export default ({
  account,
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpNetwork
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services).filter(service => service !== services.network)
  const toUri = (projectId, network) => 
    `https://www.googleapis.com/compute/v1/projects/${projectId}/${GLOBAL_REGION}/networks/${network}`

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    const regions = [region, GLOBAL_REGION]
    for (const region of regions) {
      if (instances?.data?.[region]) {
        const filtered = instances.data[region].filter(
          ({ network, projectId }: rawDataInterface) => {
            return projectId === service.projectId && network
          }
        )

        for (const { id, network, projectId } of filtered) {
          for (const name of network) {
            // expect full network URI and network name
            const uri = (name?.indexOf('https://') === -1) ? toUri(projectId, name) : name
            if (uri === service.selfLink) {
              connections.push({
                id,
                resourceType: serviceName,
                relation: 'child',
                field: serviceName,
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
