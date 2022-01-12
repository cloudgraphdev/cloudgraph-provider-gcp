import cuid from 'cuid'
import { google } from '@google-cloud/logging/build/protos/protos'
import { GcpLogMetric } from '../../types/generated'
import { RawGcpLogMetric } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpLogMetric
  account: string
  region: string
}): GcpLogMetric => {
  const {
    id,
    projectId,
    name,
    description,
    filter,
    metricDescriptor,
    valueExtractor,
    labelExtractors,
    bucketOptions,
    createTime,
    updateTime,
    version,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    description,
    filter,
    metricDescriptor: {
      ...metricDescriptor,
      labels: metricDescriptor?.labels?.map(label => ({
        id: cuid(),
        ...label,
        valueType: enumKeyToString(google.api.LabelDescriptor.ValueType, label?.valueType),
      })),
      metricKind: enumKeyToString(google.api.MetricDescriptor.MetricKind, metricDescriptor?.metricKind),
      valueType: enumKeyToString(google.api.MetricDescriptor.ValueType, metricDescriptor?.valueType),
      metadata: {
        launchStage: enumKeyToString(google.api.LaunchStage, metricDescriptor?.metadata?.launchStage),
      },
      launchStage: enumKeyToString(google.api.LaunchStage, metricDescriptor?.launchStage),

    },
    valueExtractor,
    labelExtractors: formatLabelsFromMap(labelExtractors),
    bucketOptions: {
      linearBuckets: bucketOptions?.linearBuckets,
      exponentialBuckets: bucketOptions?.exponentialBuckets,
      explicitBuckets: bucketOptions?.explicitBuckets,
    },
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    version: enumKeyToString(google.logging.v2.LogMetric.ApiVersion, version),
  }
}
