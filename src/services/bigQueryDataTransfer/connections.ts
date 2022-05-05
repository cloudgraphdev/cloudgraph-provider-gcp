import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpBigQueryDataTransfer } from './data'
import { RawGcpBigQueryDataTransferRun } from '../bigQueryDataTransferRun/data'

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

  /**
   * Find transfer runs
   */
  const transferRuns: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.bigQueryDataTransferRun)

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

  const result = {
    [id]: connections,
  }
  return result
}
