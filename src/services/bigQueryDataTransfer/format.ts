import cuid from 'cuid'

import { google } from '@google-cloud/bigquery-data-transfer/build/protos/protos'
import { enumKeyToString } from '../../utils/format'

import { RawGcpBigQueryDataTransfer } from './data'
import { toISOString } from '../../utils/dateutils'
import { GcpBigQueryDataTransfer, GcpBigQueryDataTransferParam } from '../../types/generated'

// The function is to flatten the nested object. e.g.:
// "fields": {
//   "skip_leading_rows": {
//     "stringValue": "0",
//     "kind": "stringValue"
//   },
//   "max_bad_records": {
//     "stringValue": "10",
//     "kind": "stringValue"
//   },
// ...

// "paramFields": [
//   {
//     "id": "ckyakg7kw000k4t3e23sz6np5",
//     "key": "skip_leading_rows.stringValue",
//     "value": "0"
//   },
//   {
//     "id": "ckyakg7kw000l4t3ecki45e8p",
//     "key": "skip_leading_rows.kind",
//     "value": "stringValue"
//   },
//  ...
// ]

export const formatParamFields = (data: { [k: string]: google.protobuf.IValue }|null): GcpBigQueryDataTransferParam[] => {
  const result = {};
  const recurse = (cur, prop: string) => {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for (let i = 0, l = cur.length; i < l; i += 1)
        recurse(cur[i], `${prop}[${i}]`)
      if (cur.length === 0)
          result[prop] = [];
    } else {
      let isEmpty = true
      for (const p of Object.keys(cur)) {
        isEmpty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (isEmpty && prop)
          result[prop] = {}
    }
  }
  recurse(data, '');
  return Object.keys(result).map(key => ({
    id: cuid(),
    key,
    value: result[key].toString()
  }))
}

export default ({
  service,
  region,
}: {
  service: RawGcpBigQueryDataTransfer
  region: string
}): GcpBigQueryDataTransfer => {
  const {
    id,
    name,
    destinationDatasetId,
    displayName,
    dataSourceId,
    params,
    schedule,
    scheduleOptions,
    dataRefreshWindowDays,
    disabled,
    updateTime,
    nextRunTime,
    state,
    userId,
    datasetRegion,
    notificationPubsubTopic,
    emailPreferences,
    projectId,
  } = service

  return {
    id: id || cuid(),
    name,
    projectId,
    region,
    destinationDatasetId,
    displayName,
    dataSourceId,
    paramFields: formatParamFields(params?.fields),
    schedule,
    scheduleOptionsDisableAutoScheduling: scheduleOptions?.disableAutoScheduling || false,
    scheduleOptionsStartTime: toISOString(scheduleOptions?.startTime?.seconds?.toString()),
    scheduleOptionsEndTime: toISOString(scheduleOptions?.endTime?.seconds?.toString()),
    dataRefreshWindowDays,
    disabled,
    updateTime: toISOString(updateTime?.seconds?.toString()),
    nextRunTime: toISOString(nextRunTime?.seconds?.toString()),
    state: enumKeyToString(google.cloud.bigquery.datatransfer.v1.TransferState, state),
    userId: userId?.toString() || '',
    datasetRegion,
    notificationPubsubTopic,
    enableFailureEmail: emailPreferences?.enableFailureEmail || false,
  }
}
