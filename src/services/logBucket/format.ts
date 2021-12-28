import { google } from '@google-cloud/logging/build/protos/protos'
import { GcpLogBucket } from '../../types/generated'
import { RawGcpLogBucket } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpLogBucket
  account: string
  region: string
}): GcpLogBucket => {
  const {
    id,
    projectId,
    name,
    description,
    createTime,
    updateTime,
    retentionDays,
    locked,
    lifecycleState,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    description,
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    retentionDays,
    locked,
    lifecycleState: enumKeyToString(google.logging.v2.LifecycleState, lifecycleState),
  }
}
