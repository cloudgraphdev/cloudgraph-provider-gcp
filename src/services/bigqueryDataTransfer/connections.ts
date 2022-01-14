import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpBigqueryDataTransfer } from './data'
import { RawGcpBigqueryDataTransferRun } from '../bigqueryDataTransferRun/data'

import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpBigqueryDataTransfer
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
  } = data.find(({ name }) => name === services.bigqueryDataTransferRun)

  if (transferRuns?.data?.[region]) {
    const transferRun = transferRuns.data[region].find(
      ({ dataTransferId }: RawGcpBigqueryDataTransferRun) => dataTransferId === id
    )

    if (transferRun) {
      connections.push({
        id: transferRun.name,
        resourceType: services.bigqueryDataTransferRun,
        relation: 'child',
        field: 'transferRun',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
