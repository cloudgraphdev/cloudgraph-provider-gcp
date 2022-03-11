import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import { RawGcpTargetSslProxy } from './data'
import { RawGcpSslPolicy } from '../sslPolicy/data'
import { GLOBAL_REGION } from '../../config/constants'
import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  account: string
  service: RawGcpTargetSslProxy
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id, sslPolicy } = service
  const connections: ServiceConnection[] = []

  /**
   * Find related ssl policies
   */
  const sslPolicies: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.sslPolicies)

  const regions = [region, GLOBAL_REGION]
  for (const reg of regions) {
    if (sslPolicies?.data?.[reg]) {
      const policy = sslPolicies.data[reg].find(
        ({ selfLink }: RawGcpSslPolicy) => selfLink === sslPolicy
      )

      if (!isEmpty(policy)) {
        connections.push({
          id: policy.id,
          resourceType: services.sslPolicies,
          relation: 'child',
          field: 'sslPolicy',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }

  return result
}
