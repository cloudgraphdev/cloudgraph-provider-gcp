import cuid from 'cuid'
import { google } from '@google-cloud/resource-manager/build/protos/protos'
import { GcpProject } from '../../types/generated'
import { RawGcpProject } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

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
    name,
    parent,
    projectId,
    state,
    displayName,
    createTime,
    updateTime,
    deleteTime,
    etag,
    labels = {},
  } = service

  return {
    id: name,
    name,
    parent,
    projectId,
    state: enumKeyToString(google.cloud.resourcemanager.v3.Project.State, state),
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
