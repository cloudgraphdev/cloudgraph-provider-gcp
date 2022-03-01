import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpAiPlatformNotebook } from './data'
import services from '../../enums/services'
import { RawGcpKmsCryptoKey } from '../kmsCryptoKey/data'
import { GLOBAL_REGION } from '../../config/constants'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpAiPlatformNotebook
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id, kmsKey } = service
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
        ({ id: cryptoKeyId }: RawGcpKmsCryptoKey) => cryptoKeyId === kmsKey
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
