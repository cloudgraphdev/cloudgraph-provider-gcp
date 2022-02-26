import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpFolder } from './data'
import { RawGcpIamPolicy } from '../iam/data'
import { GLOBAL_REGION } from '../../config/constants'

import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpFolder
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { name: id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find IAM Policies
   */
  const iamPolicies: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.iamPolicy)

  const regions = [region, GLOBAL_REGION]
  for (const reg of regions) {
    if (iamPolicies?.data?.[reg]) {
      
      const policy = iamPolicies.data[reg].find(
        ({ folderId }: RawGcpIamPolicy) => folderId === id
      )
  
      if (policy) {
        connections.push({
          id: policy.id,
          resourceType: services.iamPolicy,
          relation: 'child',
          field: 'iamPolicies',
        })
      }
    }
  }
  
  const result = {
    [id]: connections,
  }
  return result
}
