import cuid from 'cuid'
import { google } from '@google-cloud/monitoring/build/protos/protos'
import { GcpAlertPolicy } from '../../types/generated'
import { RawGcpAlertPolicy } from './data'
import { formatLabelsFromMap, enumKeyToString, etagToString } from '../../utils/format'
import { toISOString,  } from '../../utils/dateutils'

export default ({
  service,
  region,
}: {
  service: RawGcpAlertPolicy
  region: string
}): GcpAlertPolicy => {
  const {
    id,
    projectId,
    name,
    displayName,
    documentation,
    userLabels,
    conditions,
    combiner,
    enabled,
    validity,
    notificationChannels,
    creationRecord,
    mutationRecord,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    displayName,
    documentation,
    labels: formatLabelsFromMap(userLabels),
    conditions: conditions?.map(condition => ({
      id: cuid(),
      name: condition?.name,
      displayName: condition?.displayName,
      conditionThreshold: {
        filter: condition?.conditionThreshold?.filter,
        aggregations: condition?.conditionThreshold?.aggregations?.map(aggregation => ({
          id: cuid(),
          alignmentPeriod: {
            seconds: aggregation?.alignmentPeriod?.seconds?.toString(),
            nanos: aggregation?.alignmentPeriod?.nanos,
          },
          perSeriesAligner: enumKeyToString(google.monitoring.v3.Aggregation.Aligner, aggregation?.perSeriesAligner),
          crossSeriesReducer: enumKeyToString(google.monitoring.v3.Aggregation.Reducer, aggregation?.crossSeriesReducer),
          groupByFields: aggregation?.groupByFields,
        })),
        denominatorFilter: condition?.conditionThreshold?.denominatorFilter,
        denominatorAggregations: condition?.conditionThreshold?.denominatorAggregations?.map(dagg => ({
          id: cuid(),
          alignmentPeriod: {
            seconds: dagg?.alignmentPeriod?.seconds?.toString(),
            nanos: dagg?.alignmentPeriod?.nanos,
          },
          perSeriesAligner: enumKeyToString(google.monitoring.v3.Aggregation.Aligner, dagg?.perSeriesAligner),
          crossSeriesReducer: enumKeyToString(google.monitoring.v3.Aggregation.Reducer, dagg?.crossSeriesReducer),
          groupByFields: dagg?.groupByFields,
        })),
        comparison: enumKeyToString(google.monitoring.v3.ComparisonType, condition?.conditionThreshold?.comparison),
        thresholdValue: condition?.conditionThreshold?.thresholdValue,
        duration: {
          seconds: condition?.conditionThreshold?.duration?.seconds?.toString(),
          nanos: condition?.conditionThreshold?.duration?.nanos,
        },
        trigger: {
          count: condition?.conditionThreshold?.trigger?.count,
          percent: condition?.conditionThreshold?.trigger?.percent,
        },
      },
      conditionAbsent: {
        filter: condition?.conditionAbsent?.filter,
        aggregations: condition?.conditionAbsent?.aggregations?.map(agg => ({
          id: cuid(),
          alignmentPeriod: {
            seconds: agg?.alignmentPeriod?.seconds?.toString(),
            nanos: agg?.alignmentPeriod?.nanos,
          },
          perSeriesAligner: enumKeyToString(google.monitoring.v3.Aggregation.Aligner, agg?.perSeriesAligner),
          crossSeriesReducer: enumKeyToString(google.monitoring.v3.Aggregation.Reducer, agg?.crossSeriesReducer),
          groupByFields: agg?.groupByFields,
        })),
        duration: {
          seconds: condition?.conditionAbsent?.duration?.seconds?.toString(),
          nanos: condition?.conditionAbsent?.duration?.nanos,
        },
        trigger: {
          count: condition?.conditionAbsent?.trigger?.count,
          percent: condition?.conditionAbsent?.trigger?.percent,
        },
      },
      conditionMonitoringQueryLanguage: {
        query: condition?.conditionMonitoringQueryLanguage?.query,
        duration: {
          seconds: condition?.conditionMonitoringQueryLanguage?.duration?.seconds?.toString(),
          nanos: condition?.conditionMonitoringQueryLanguage?.duration?.nanos,
        },
        trigger: {
          count: condition?.conditionMonitoringQueryLanguage?.trigger?.count,
          percent: condition?.conditionMonitoringQueryLanguage?.trigger?.percent,
        },
      },
    })),
    combiner: enumKeyToString(google.monitoring.v3.AlertPolicy.ConditionCombinerType, combiner),
    enabled,
    validity: {
      code: validity?.code,
      message: validity?.message,
      details: validity?.details?.map(detail => ({
        id: cuid(),
        type_url: detail?.type_url,
        value: etagToString(detail?.value),
      })),
    },
    notificationChannels,
    creationRecord: {
      mutateTime: toISOString(creationRecord?.mutateTime?.seconds?.toString()),
      mutatedBy: creationRecord?.mutatedBy,
    },
    mutationRecord: {
      mutateTime: toISOString(mutationRecord?.mutateTime?.seconds?.toString()),
      mutatedBy: mutationRecord?.mutatedBy,
    },
  }
}
