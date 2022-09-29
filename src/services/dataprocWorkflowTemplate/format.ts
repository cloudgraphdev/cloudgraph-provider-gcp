import cuid from 'cuid'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import {
  GcpDataprocWorkflowTemplateHadoopJob,
  GcpDataprocWorkflowTemplateHiveJob,
  GcpDataprocWorkflowTemplatePigJob,
  GcpDataprocWorkflowTemplatePrestoJob,
  GcpDataprocWorkflowTemplatePySparkJob,
  GcpDataprocWorkflowTemplateSparkJob,
  GcpDataprocWorkflowTemplateSparkRJob,
  GcpDataprocWorkflowTemplateSparkSqlJob,
  GcpKeyValue,
  GcpDataprocWorkflowTemplate,
  GcpDataprocWorkflowTemplateParameter,
  GcpDataprocWorkflowTemplateOrderedJob,
} from '../../types/generated'
import { RawGcpDataprocWorkflowTemplate } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString, formatKeyValueMap, formatLabelsFromMap } from '../../utils/format'
import { formatClusterConfig } from '../dataprocCluster/format'

const formatLoggingConfig = (loggingConfig: { [k: string]: google.cloud.dataproc.v1.LoggingConfig.Level }): GcpKeyValue[] => {
  return Object.keys(loggingConfig || {}).map(key => ({
    id: cuid(),
    key,
    value: enumKeyToString(google.cloud.dataproc.v1.LoggingConfig.Level, loggingConfig[key]),
  }))
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
}: google.cloud.dataproc.v1.IHadoopJob): GcpDataprocWorkflowTemplateHadoopJob => {
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
}: google.cloud.dataproc.v1.ISparkJob): GcpDataprocWorkflowTemplateSparkJob => {
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

const formatPySparkJob = ({
  mainPythonFileUri,
  args = [],
  pythonFileUris = [],
  jarFileUris = [],
  fileUris = [],
  archiveUris = [],
  properties = {},
  loggingConfig = {},
}: google.cloud.dataproc.v1.IPySparkJob): GcpDataprocWorkflowTemplatePySparkJob => {
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
}: google.cloud.dataproc.v1.IHiveJob): GcpDataprocWorkflowTemplateHiveJob => {
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
}: google.cloud.dataproc.v1.IPigJob): GcpDataprocWorkflowTemplatePigJob => {
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
}: google.cloud.dataproc.v1.ISparkRJob): GcpDataprocWorkflowTemplateSparkRJob => {
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
}: google.cloud.dataproc.v1.ISparkSqlJob): GcpDataprocWorkflowTemplateSparkSqlJob => {
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
}: google.cloud.dataproc.v1.IPrestoJob): GcpDataprocWorkflowTemplatePrestoJob => {
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

const formatJob = ({
  stepId,
  hadoopJob = {},
  sparkJob = {},
  pysparkJob = {},
  hiveJob = {},
  pigJob = {},
  sparkRJob = {},
  sparkSqlJob = {},
  prestoJob = {},
  labels,
  scheduling = {},
  prerequisiteStepIds = [],
}: google.cloud.dataproc.v1.IOrderedJob): GcpDataprocWorkflowTemplateOrderedJob => {
  return {
    id: cuid(),
    stepId,
    hadoopJob: formatHadoopJob(hadoopJob),
    sparkJob: formatSparkJob(sparkJob),
    pySparkJob: formatPySparkJob(pysparkJob),
    hiveJob: formatHiveJob( hiveJob),
    pigJob: formatPigJob(pigJob),
    sparkRJob: formatSparkRJob(sparkRJob),
    sparkSqlJob: formatSparkSqlJob(sparkSqlJob),
    prestoJob: formatPrestoJob(prestoJob),
    labels: formatLabelsFromMap(labels),
    schedulingMaxFailuresPerHour: scheduling?.maxFailuresPerHour || 0,
    schedulingMaxFailuresTotal: scheduling?.maxFailuresTotal || 0,
    prerequisiteStepIds,
  }
}

const formatParameter = ({
  name,
  fields = [],
  description,
  validation,
}: google.cloud.dataproc.v1.ITemplateParameter): GcpDataprocWorkflowTemplateParameter => {
  return {
    id: cuid(),
    name,
    fields,
    description,
    validationRegexes: validation?.regex?.regexes || [],
    validationReges: validation?.regex?.regexes || [],
    validationValues: validation?.values?.values || [],
  }
}

export default ({
  service,
  region,
}: {
  service: RawGcpDataprocWorkflowTemplate
  region: string
}): GcpDataprocWorkflowTemplate => {
  const {
    id,
    name,
    projectId,
    version,
    createTime = {},
    updateTime = {},
    placement = {},
    jobs = [],
    parameters = [],
    dagTimeout = {},
    Labels,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    version,
    createTime: toISOString(createTime?.seconds?.toString()) || '',
    updateTime: toISOString(updateTime?.seconds?.toString()) || '',
    placementManagedClusterName: placement?.managedCluster?.clusterName || '',
    placementManagedClusterConfig: formatClusterConfig(placement?.managedCluster?.config || {}),
    placementManagedClusterLabels: formatLabelsFromMap(placement?.managedCluster?.labels || {}),
    placementClusterSelectorZone: placement?.clusterSelector?.zone || '',
    placementClusterSelectorLabels: formatKeyValueMap(placement?.clusterSelector?.clusterLabels || {}),
    jobs: jobs?.map(formatJob) || [],
    parameters: parameters?.map(formatParameter) || [],
    dagTimeout: dagTimeout?.seconds?.toString()  || '',
    labels: formatLabelsFromMap(Labels),
  }
}
