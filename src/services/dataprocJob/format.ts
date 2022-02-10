import cuid from 'cuid'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import {
  GcpDataprocHadoopJob,
  GcpDataprocHiveJob,
  GcpDataprocJob,
  GcpDataprocJobStatus,
  GcpDataprocJobYarnApplication,
  GcpDataprocPigJob,
  GcpDataprocPrestoJob,
  GcpDataprocPySparkJob,
  GcpDataprocSparkJob,
  GcpDataprocSparkRJob,
  GcpDataprocSparkSqlJob,
  GcpKeyValue,
} from '../../types/generated'
import { RawGcpDataprocJob } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString, formatKeyValueMap, formatLabelsFromMap } from '../../utils/format'

const formatLoggingConfig = (loggingConfig: { [k: string]: google.cloud.dataproc.v1.LoggingConfig.Level }): GcpKeyValue[] => {
  return Object.keys(loggingConfig || {}).map(key => ({
    id: cuid(),
    key,
    value: enumKeyToString(google.cloud.dataproc.v1.LoggingConfig.Level, loggingConfig[key]),
  }))
}

const formatStatus = ({
  state,
  details,
  stateStartTime,
  substate,
}: google.cloud.dataproc.v1.IJobStatus): GcpDataprocJobStatus => {
  return {
    id: cuid(),
    state: enumKeyToString(google.cloud.dataproc.v1.JobStatus.State, state),
    details,
    stateStartTime: toISOString(stateStartTime?.seconds?.toString()) || '',
    substate: enumKeyToString(google.cloud.dataproc.v1.JobStatus.Substate, substate),
  }
}

const formatYarnApplication = ({
  name,
  state,
  progress,
  trackingUrl,
}: google.cloud.dataproc.v1.IYarnApplication): GcpDataprocJobYarnApplication => {
  return {
    id: cuid(),
    name,
    state: enumKeyToString(google.cloud.dataproc.v1.YarnApplication.State, state),
    progress,
    trackingUrl,
  }
}

const formatHadoopJob = ({
  mainJarFileUri,
  mainClass,
  args,
  jarFileUris,
  fileUris,
  archiveUris,
  properties = {},
  loggingConfig = {},
}: google.cloud.dataproc.v1.IHadoopJob): GcpDataprocHadoopJob => {
  return {
    mainJarFileUri,
    mainClass,
    args,
    jarFileUris,
    fileUris,
    archiveUris,
    properties: formatKeyValueMap(properties),
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

const formatSparkJob = ({
  mainJarFileUri,
  mainClass,
  args,
  jarFileUris,
  fileUris,
  archiveUris,
  properties = {},
  loggingConfig = {},
}: google.cloud.dataproc.v1.ISparkJob): GcpDataprocSparkJob => {
  return {
    mainJarFileUri,
    mainClass,
    args,
    jarFileUris,
    fileUris,
    archiveUris,
    properties: formatKeyValueMap(properties || {}),
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

const formatPysparkJob = ({
  mainPythonFileUri,
  args = [],
  pythonFileUris = [],
  jarFileUris = [],
  fileUris = [],
  archiveUris = [],
  properties = {},
  loggingConfig = {},
}: google.cloud.dataproc.v1.IPySparkJob): GcpDataprocPySparkJob => {
  return {
    mainPythonFileUri,
    args,
    pythonFileUris,
    jarFileUris,
    fileUris,
    archiveUris,
    properties: formatKeyValueMap(properties || {}),
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

const formatHiveJob = ({
  queryFileUri,
  queryList = {},
  continueOnFailure = false,
  scriptVariables = {},
  properties = {},
  jarFileUris = [],
}: google.cloud.dataproc.v1.IHiveJob): GcpDataprocHiveJob => {
  return {
    queryFileUri,
    queryList: queryList?.queries || [],
    continueOnFailure,
    scriptVariables: formatKeyValueMap(scriptVariables || {}),
    properties: formatKeyValueMap(properties || {}),
    jarFileUris,
  }
}

const formatPigJob = ({
  queryFileUri,
  queryList = {},
  continueOnFailure = false,
  scriptVariables = {},
  properties = {},
  jarFileUris = [],
  loggingConfig = {},
}: google.cloud.dataproc.v1.IPigJob): GcpDataprocPigJob => {
  return {
    queryFileUri,
    queryList: queryList?.queries || [],
    continueOnFailure,
    scriptVariables: formatKeyValueMap(scriptVariables || {}),
    properties: formatKeyValueMap(properties || {}),
    jarFileUris,
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

const formatSparkRJob = ({
  mainRFileUri,
  args = [],
  fileUris = [],
  archiveUris = [],
  properties = {},
  loggingConfig = {},
}: google.cloud.dataproc.v1.ISparkRJob): GcpDataprocSparkRJob => {
  return {
    mainRFileUri,
    args,
    fileUris,
    archiveUris,
    properties: formatKeyValueMap(properties || {}),
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

const formatSparkSqlJob = ({
  queryFileUri,
  queryList = {},
  scriptVariables = {},
  properties = {},
  jarFileUris = [],
  loggingConfig = {},
}: google.cloud.dataproc.v1.ISparkSqlJob): GcpDataprocSparkSqlJob => {
  return {
    queryFileUri,
    queryList: queryList?.queries || [],
    scriptVariables: formatKeyValueMap(scriptVariables || {}),
    properties: formatKeyValueMap(properties || {}),
    jarFileUris: jarFileUris || [],
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

const formatPrestoJob = ({
  queryFileUri,
  queryList = {},
  continueOnFailure = false,
  outputFormat,
  clientTags = [],
  properties = {},
  loggingConfig = {},
}: google.cloud.dataproc.v1.IPrestoJob): GcpDataprocPrestoJob => {
  return {
    queryFileUri,
    queryList: queryList?.queries || [],
    continueOnFailure: continueOnFailure || false,
    outputFormat,
    clientTags,
    properties: formatKeyValueMap(properties || {}),
    loggingConfig: formatLoggingConfig(loggingConfig?.driverLogLevels || {}),
  }
}

export default ({
  service,
  region,
}: {
  service: RawGcpDataprocJob
  region: string
}): GcpDataprocJob => {
  const {
    id,
    projectId,
    reference,
    placement,
    hadoopJob = {},
    sparkJob = {},
    pysparkJob = {},
    hiveJob = {},
    pigJob = {},
    sparkRJob = {},
    sparkSqlJob = {},
    prestoJob = {},
    status = {},
    statusHistory = [],
    yarnApplications = [],
    driverOutputResourceUri,
    driverControlFilesUri,
    scheduling = {},
    done,
    Labels = {},
  } = service

  return {
    id,
    projectId,
    region,
    name: reference?.jobId || '',
    placementClusterName: placement?.clusterName || '',
    placementClusterUuid: placement?.clusterUuid || '',
    placementClusterLabels: formatKeyValueMap(placement?.clusterLabels || {}),
    hadoopJob: formatHadoopJob(hadoopJob),
    sparkJob: formatSparkJob(sparkJob),
    pySparkJob: formatPysparkJob(pysparkJob),
    hiveJob: formatHiveJob( hiveJob),
    pigJob: formatPigJob(pigJob),
    sparkRJob: formatSparkRJob(sparkRJob),
    sparkSqlJob: formatSparkSqlJob(sparkSqlJob),
    prestoJob: formatPrestoJob(prestoJob),
    status: formatStatus(status),
    statusHistory: statusHistory?.map(formatStatus),
    yarnApplications: yarnApplications?.map(formatYarnApplication),
    driverOutputResourceUri,
    driverControlFilesUri,
    schedulingMaxFailuresPerHour: scheduling?.maxFailuresPerHour || 0,
    schedulingMaxFailuresTotal: scheduling?.maxFailuresTotal || 0,
    done,
    labels: formatLabelsFromMap(Labels),
  }
}
