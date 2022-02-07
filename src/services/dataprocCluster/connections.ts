import isEmpty from 'lodash/isEmpty'
import { ServiceConnection } from '@cloudgraph/sdk'
import { RawGcpDataprocCluster } from './data'
import services from '../../enums/services'
import { RawGcpDataprocWorkflowTemplate } from '../dataprocWorkflowTemplate/data'

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
  const { id, Labels } = service
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

  /**
   * Find Dataproc Workflow Template
   */
  const flatClusterLabels = Object.keys(Labels || {}).map(key => `${key}:${Labels[key]}`)

  const templates: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.dataprocWorkflowTemplate)

  if (templates?.data?.[region]) {
    const filtered = templates.data[region]
      .filter((template: RawGcpDataprocWorkflowTemplate) => !isEmpty(
        Object.keys(template?.placement?.clusterSelector?.clusterLabels || {})
          .map(key => `${key}:${template.placement.clusterSelector.clusterLabels[key]}`)
          .filter(cluster => flatClusterLabels.includes(cluster))
      )
    )

    for (const { id } of filtered) {
      connections.push({
        id,
        resourceType: services.dataprocWorkflowTemplate,
        relation: 'child',
        field: 'dataprocWorkflowTemplates',
      })
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
