import { google } from '@google-cloud/resource-manager/build/protos/protos'
import { GcpFolder } from '../../types/generated'
import { RawGcpFolder } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  region,
}: {
  service: RawGcpFolder
  region: string
}): GcpFolder => {
  const {
    id,
    projectId,
    name,
    parent,
    displayName,
    state,
    createTime,
    updateTime,
    deleteTime,
    etag,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    parent,
    displayName,
    state: enumKeyToString(google.cloud.resourcemanager.v3.Folder.State, state),
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    deleteTime: toISOString(deleteTime?.seconds?.toString()),
    etag,
  }
}
