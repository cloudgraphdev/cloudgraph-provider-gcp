import { ReservationServiceClient } from '@google-cloud/bigquery-reservation'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import { google } from '@google-cloud/bigquery-reservation/build/protos/protos'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { generateGcpErrorLog, initTestEndpoint } from '../../utils'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph
const serviceName = 'BigQuery Reservation'
const apiEndpoint = initTestEndpoint(serviceName)

export interface RawGcpBigQueryReservation extends google.cloud.bigquery.reservation.v1.IReservation {
  id: string
  assignments: google.cloud.bigquery.reservation.v1.IAssignment[]
  projectId: string
  region: string
}

export default async ({
  regions,
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpBigQueryReservation[]
}> => {
  const reservationClient = new ReservationServiceClient({ ...config, apiEndpoint })
  const { projectId } = config
  const reservationResult: RawGcpBigQueryReservation[] = []
  const allRegions = regions.split(',')
  try {
    for (const region of allRegions) {
      const parent = reservationClient.locationPath(projectId, region)
      const reservationsIter = reservationClient.listReservationsAsync({parent})
      for await (const reservation of reservationsIter) {
        const assignments = []
        const reservationParent = `${parent}/reservations/${reservation.name}`
        try {
          const assignmentsIter = reservationClient.listAssignmentsAsync({parent: reservationParent})
          for await (const assignment of assignmentsIter) {
            assignments.push(assignment)
          }
          reservationResult.push({
            id: reservation.name,
            ...reservation,
            assignments,
            projectId,
            region,
          })
        } catch (error) {
          generateGcpErrorLog(serviceName, 'bigQueryReservation:listAssignmentsAsync', error)
        }
      }
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'bigQueryReservation:listReservationsAsync', error)
  }

  logger.debug(lt.foundResources(serviceName, reservationResult.length))
  return groupBy(reservationResult, 'region')
}
