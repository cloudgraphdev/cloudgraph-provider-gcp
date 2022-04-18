import { google } from '@google-cloud/resource-manager/build/protos/protos'
import { GcpOrganization } from '../../types/generated'
import { RawGcpOrganization } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString, formatKeyValuesFromMap } from '../../utils/format'

export default ({
  service,
  region,
}: {
  service: RawGcpOrganization
  region: string
}): GcpOrganization => {
  const {
    id,
    projectId,
    name,
    displayName,
    directoryCustomerId,
    state,
    createTime,
    updateTime,
    deleteTime,
    etag,
    tags = {},
  } = service

  return {
    id,
    projectId,
    region,
    name,
    displayName,
    directoryCustomerId,
    state: enumKeyToString(google.cloud.resourcemanager.v3.Organization.State, state),
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    deleteTime: toISOString(deleteTime?.seconds?.toString()),
    etag,
    tags: formatKeyValuesFromMap(tags),
  }
}
