import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpApiGatewayApiConfig } from './data'

import services from '../../enums/services'
import { RawGcpApiGatewayGateway } from '../apiGatewayGateway/data'

export default ({
  service,
  data,
}: {
  service: RawGcpApiGatewayApiConfig
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find Api Gateway Gateways
   */
  const gateways: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.apiGatewayGateway)

  if (gateways?.data) {
    for (const region of Object.keys(gateways.data)) {
      const filteredGateways = gateways.data[region].filter(
        ({ apiConfig }: RawGcpApiGatewayGateway) => {
          const idSessions = apiConfig.split('/')
          idSessions[1] = service.projectId
          const configIdWithNumber =  idSessions.join('/')
          return configIdWithNumber === id
        }
      )
  
      if (filteredGateways) {
        for (const filteredGateway of filteredGateways) {
          connections.push({
            id: filteredGateway.id,
            resourceType: services.apiGatewayGateway,
            relation: 'child',
            field: 'apiGatewayGateways',
          })
        }
      }
    }
  }

  const result = {
    [service.id]: connections,
  }
  return result
}
