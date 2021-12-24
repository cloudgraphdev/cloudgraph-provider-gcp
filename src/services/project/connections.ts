import { ServiceConnection } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { RawGcpProject } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'
import { RawGcpManagedZone } from '../dnsManagedZone/data'
import { RawGcpPolicy } from '../dnsPolicies/data'

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
  const connectTo = Object.values(services).filter(service => service !== services.project)

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)
    /**
     * Find DNS Managed Zones
     */
    const dnsManagedZones: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.dnsManagedZone)

    if (dnsManagedZones?.data?.[region]) {
      const dnsManagedZone = dnsManagedZones.data[region].find(
        ({ projectId }: RawGcpManagedZone) => projectId === id
      )

      if (dnsManagedZone) {
        connections.push({
          id: dnsManagedZone.name,
          resourceType: services.dnsManagedZone,
          relation: 'child',
          field: 'dnsManagedZones',
        })
      }
    }
    if (dnsManagedZones?.data?.[region]) {
      const dnsManagedZone = dnsManagedZones.data[region].find(
        ({ projectId }: RawGcpManagedZone) => projectId === id
      )
    
      if (dnsManagedZone) {
        connections.push({
          id: dnsManagedZone.id,
          resourceType: services.dnsManagedZone,
          relation: 'child',
          field: 'dnsManagedZones',
        })
      }
    }
    /**
     * Find DNS Policies
     */
    const dnsPolicies: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.dnsPolicy)

    if (dnsPolicies?.data?.[region]) {
      const dnsPolicy = dnsPolicies.data[region].find(
        ({ projectId }: RawGcpPolicy) => projectId === id
      )

      if (dnsPolicy) {
        connections.push({
          id: dnsPolicy.id,
          resourceType: services.dnsPolicy,
          relation: 'child',
          field: 'dnsPolicies',
        })
      }
    }
    /**
     * Find VPCs
     */
    const vpcs: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.vpc)

    const regions = [region, GLOBAL_REGION]
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
