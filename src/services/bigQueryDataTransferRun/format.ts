import cuid from 'cuid'

import { google } from '@google-cloud/bigquery-data-transfer/build/protos/protos'
import { enumKeyToString, formatParamFields } from '../../utils/format'

import { RawGcpBigQueryDataTransferRun } from './data'
import { toISOString } from '../../utils/dateutils'
import { GcpBigQueryDataTransferRun } from '../../types/generated'

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

export default ({
  service,
  region,
}: {
  service: RawGcpBigQueryDataTransferRun
  region: string
}): GcpBigQueryDataTransferRun => {
  const {
    id,
    name,
    projectId,
    dataTransferId,
    scheduleTime,
    runTime,
    errorStatus,
    startTime,
    endTime,
    updateTime,
    params,
    destinationDatasetId,
    dataSourceId,
    state,
    userId,
    schedule,
    notificationPubsubTopic,
    emailPreferences,
  } = service

  return {
    id: id || cuid(),
    name,
    projectId,
    dataTransferId,
    region,
    scheduleTime: toISOString(scheduleTime?.seconds?.toString()),
    runTime: toISOString(runTime?.seconds?.toString()),
    errorStatusCode: errorStatus?.code || 0,
    errorStatusMessage: errorStatus?.message || '',
    errorStatusDetails: errorStatus?.details?.map(({
      type_url,
      value,
    }) => ({
      id: cuid(),
      typeUrl: type_url || '',
      value: value?.toString() || '' ,
    })) || [],
    startTime: toISOString(startTime?.seconds?.toString()),
    endTime: toISOString(endTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    paramFields: formatParamFields(params?.fields),
    destinationDatasetId,
    dataSourceId,
    state: enumKeyToString(google.cloud.bigquery.datatransfer.v1.TransferState, state),
    userId: userId?.toString() || '',
    schedule,
    notificationPubsubTopic,
    enableFailureEmail: emailPreferences?.enableFailureEmail || false,
  }
}
