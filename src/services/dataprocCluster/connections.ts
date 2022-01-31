import isEmpty from 'lodash/isEmpty'
import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpDataprocCluster } from './data'
import services from '../../enums/services'

export default ({
  service,
  data,
  region,
}: {
  service: RawGcpDataprocCluster
  data: { name: string; data: { [property: string]: any[] } }[]
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id } = service
  const connections: ServiceConnection[] = []

  /**
   * Find Dataproc Jobs
   */
  const jobs: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.dataprocJob)

  if (jobs?.data?.[region]) {

    const filtered = jobs.data[region].filter(
      ({ placement }) => placement.clusterUuid === id
    )
    if (!isEmpty(filtered)) {
      for (const { id } of filtered) {
        connections.push({
          id,
          resourceType: services.dataprocJob,
          relation: 'child',
          field: 'dataprocJobs',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
