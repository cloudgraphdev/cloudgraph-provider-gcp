import cuid from 'cuid'

import { RawGcpBigqueryReservation } from './data'
import { toISOString } from '../../utils/dateutils'
import { GcpBigQueryReservation } from '../../types/generated'

export default ({
  service,
  region,
}: {
  service: RawGcpBigqueryReservation
  region: string
}): GcpBigQueryReservation => {
  const {
    name,
    projectId,
    slotCapacity,
    ignoreIdleSlots,
    creationTime,
    updateTime,
  } = service

  return {
    id: name || cuid(),
    name,
    projectId,
    region,
    slotCapacity: slotCapacity?.toString() || '0',
    ignoreIdleSlots,
    creationTime: toISOString(creationTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
  }
}
