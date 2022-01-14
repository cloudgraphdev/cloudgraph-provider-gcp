import { google } from '@google-cloud/bigquery-reservation/build/protos/protos'
import cuid from 'cuid'
import { GcpBigQueryReservationCapacityCommitment } from '../../types/generated'
import { toISOString } from '../../utils/dateutils'

import { enumKeyToString } from '../../utils/format'

import { RawGcpBigqueryReservationCapacityCommitment } from './data'

export default ({
  service,
  region,
}: {
  service: RawGcpBigqueryReservationCapacityCommitment
  region: string
}): GcpBigQueryReservationCapacityCommitment => {
  const {
    name,
    slotCount,
    plan,
    state,
    commitmentStartTime,
    commitmentEndTime,
    failureStatus,
    renewalPlan,
    projectId,
  } = service

  return {
    id: name || cuid(),
    name,
    slotCount: slotCount?.toString() || '0',
    plan: enumKeyToString(google.cloud.bigquery.reservation.v1.CapacityCommitment.CommitmentPlan, plan),
    state: enumKeyToString(google.cloud.bigquery.reservation.v1.CapacityCommitment.State, state),
    commitmentStartTime: toISOString(commitmentStartTime?.seconds?.toString()),
    commitmentEndTime: toISOString(commitmentEndTime?.seconds?.toString()),
    failureStatusCode: failureStatus?.code || 0,
    failureStatusMessage: failureStatus?.message || '',
    failureStatusDetails: failureStatus?.details?.map(({
      type_url,
      value,
    }) => ({
      id: cuid(),
      typeUrl: type_url || '',
      value: value?.toString() || '' ,
    })) || [],
    renewalPlan: enumKeyToString(google.cloud.bigquery.reservation.v1.CapacityCommitment.CommitmentPlan, renewalPlan),
    projectId,
    region,
  }
}
