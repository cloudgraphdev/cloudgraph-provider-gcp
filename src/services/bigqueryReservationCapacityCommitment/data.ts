import { ReservationServiceClient } from '@google-cloud/bigquery-reservation'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/bigquery-reservation/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery Reservation Capacity Commitment'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpBigQueryReservationCapacityCommitment extends google.cloud.bigquery.reservation.v1.ICapacityCommitment {
  id: string
  projectId: string
  region: string
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigQueryReservationCapacityCommitment[]
}> => {
  const reservationClient = new ReservationServiceClient({ ...config, apiEndpoint })
  const { projectId } = config
  const capacityCommitmentResult: RawGcpBigQueryReservationCapacityCommitment[] = []
  const allRegions = regions.split(',')
  try {
    for (const region of allRegions) {
      const parent = reservationClient.locationPath(projectId, region)

      const capacityCommitmentsIter = reservationClient.listCapacityCommitmentsAsync({parent})
      for await (const capacityCommitment of capacityCommitmentsIter) {
        capacityCommitmentResult.push({
          id: capacityCommitment.name,
          ...capacityCommitment,
          projectId,
          region,
        })
      }
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'bigQueryReservationCapacityCommitment:listCapacityCommitmentsAsync', error)
  }

  logger.debug(lt.foundResources(serviceName, capacityCommitmentResult.length))
  return groupBy(capacityCommitmentResult, 'region')
}
