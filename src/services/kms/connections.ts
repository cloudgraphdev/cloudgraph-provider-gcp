import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpKms } from './data'
import { GLOBAL_REGION } from '../../config/constants'
import { RawGcpKmsCryptoKey } from '../kmsCryptoKey/data'

import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpKms
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { name: id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find Kms Crypto Keys
   */
  const cryptoKeys: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.kmsCryptoKeys)

  const regions = [region, GLOBAL_REGION]
  for (const reg of regions) {
    if (cryptoKeys?.data?.[reg]) {
      const cryptoKey = cryptoKeys.data[reg].find(
        ({ kmsId }: RawGcpKmsCryptoKey) => kmsId === id
      )

      if (cryptoKey) {
        connections.push({
          id: cryptoKey.id,
          resourceType: services.kmsCryptoKeys,
          relation: 'child',
          field: 'kmsCryptoKeys',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
