import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpBigQueryDataTransfer } from './data'
import { RawGcpBigQueryDataTransferRun } from '../bigQueryDataTransferRun/data'
import { MULTI_REGIONS } from '../../config/constants'

import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpBigQueryDataTransfer
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { name: id } = service
  const connections: ServiceConnection[] = []
  const regions = [region, ...MULTI_REGIONS]

  /**
   * Find transfer runs
   */
  const transferRuns: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.bigQueryDataTransferRun)

  for (const region of regions) {
    if (transferRuns?.data?.[region]) {
      const filtered = transferRuns.data[region].filter(
        ({ dataTransferId }: RawGcpBigQueryDataTransferRun) => dataTransferId === id
      )

      for (const { name } of filtered) {
        connections.push({
          id: name,
          resourceType: services.bigQueryDataTransferRun,
          relation: 'child',
          field: 'transferRuns',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
