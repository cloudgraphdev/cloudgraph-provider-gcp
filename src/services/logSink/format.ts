import cuid from 'cuid'
import { google } from '@google-cloud/logging/build/protos/protos'
import { GcpLogSink } from '../../types/generated'
import { RawGcpLogSink } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpLogSink
  account: string
  region: string
}): GcpLogSink => {
  const {
    id,
    projectId,
    name,
    destination,
    filter,
    description,
    disabled,
    exclusions,
    outputVersionFormat,
    writerIdentity,
    includeChildren,
    bigqueryOptions,
    createTime,
    updateTime,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    destination,
    filter,
    description,
    disabled,
    exclusions: exclusions?.map(exclusion => ({
      id: cuid(),
      ...exclusion,
      createTime: toISOString(exclusion.createTime?.seconds?.toString()),
      updateTime: toISOString(exclusion.updateTime?.seconds?.toString()),
    })),
    outputVersionFormat: enumKeyToString(google.logging.v2.LogSink.VersionFormat, outputVersionFormat),
    writerIdentity,
    includeChildren,
    bigqueryOptions,
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
  }
}
