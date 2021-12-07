import cuid from 'cuid'
import { google } from '@google-cloud/vpc-access/build/protos/protos'
import { GcpProject } from '../../types/generated'
import { RawGcpProject } from './data'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpProject
  account: string
  region: string
}): GcpProject => {
  const {
    projectId: id = cuid(),
    name,
    parent,
    state,
    displayName,
    createTime,
    updateTime,
    deleteTime,
    etag,
    labels,
  } = service

  const states = Object.keys(google.cloud.vpcaccess.v1.Connector.State)
  const stateIndex = google.cloud.vpcaccess.v1.Connector.State[state]

  return {
    id,
    name,
    parent,
    state: states[stateIndex],
    displayName,
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    deleteTime: toISOString(deleteTime?.seconds?.toString()),
    etag,
    labels: Object.keys(labels).map(key => ({
      id: cuid(),
      key,
      value: labels[key],
    })),
  }
}
