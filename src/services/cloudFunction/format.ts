import { google } from '@google-cloud/functions/build/protos/protos'
import { GcpCloudFunction } from '../../types/generated'
import { RawGcpCloudFunction } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'

export default ({
  service,
  region,
}: {
  service: RawGcpCloudFunction
  region: string
}): GcpCloudFunction => {
  const {
    id,
    projectId,
    name,
    description,
    sourceArchiveUrl,
    sourceRepository,
    sourceUploadUrl,
    httpsTrigger,
    eventTrigger,
    status,
    entryPoint,
    runtime,
    timeout,
    availableMemoryMb,
    serviceAccountEmail,
    updateTime,
    versionId,
    labels,
    environmentVariables,
    maxInstances,
    vpcConnectorEgressSettings,
    ingressSettings,
    buildId,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    description,
    sourceArchiveUrl,
    sourceRepository,
    sourceUploadUrl,
    httpsTrigger: {
      url: httpsTrigger?.url,
      securityLevel: enumKeyToString(google.cloud.functions.v1.HttpsTrigger.SecurityLevel, httpsTrigger?.securityLevel),
    },
    eventTrigger: {
      eventType: eventTrigger?.eventType,
      resource: eventTrigger?.resource,
      service: eventTrigger?.service,
    },
    status: enumKeyToString(google.cloud.functions.v1.CloudFunctionStatus, status),
    entryPoint,
    runtime,
    timeout: {
      seconds: timeout?.seconds?.toString(),
      nanos: timeout?.nanos,
    },
    availableMemoryMb,
    serviceAccountEmail,
    updateTime: toISOString(updateTime?.seconds?.toString()),
    versionId: versionId?.toString(),
    labels: formatLabelsFromMap(labels),
    environmentVariables: formatLabelsFromMap(environmentVariables),
    maxInstances,
    vpcConnectorEgressSettings: enumKeyToString(google.cloud.functions.v1.CloudFunction.VpcConnectorEgressSettings, vpcConnectorEgressSettings),
    ingressSettings: enumKeyToString(google.cloud.functions.v1.CloudFunction.IngressSettings, ingressSettings),
    buildId,
  }
}
