import cuid from 'cuid'
import {
  GcpBigQueryDataset,
  GcpBigQueryTable,
  GcpBigQueryTableExternalDataConfigurationBigtableOptionColumnFamily,
  GcpBigQueryTableSchemaField,
  GcpBigQueryTableViewUserDefinedFunctionResource,
} from '../../types/generated'
import { formatLabelsFromMap } from '../../utils/format'
import { RawGcpBigQueryDataset, RawGcpBigQueryTable } from './types'

const formatTableField = (field): GcpBigQueryTableSchemaField => {
  const {
    name,
    type,
    mode,
    description,
    policyTags = {},
    maxLength,
    precision,
    scale,
  } = field

  return {
    id: cuid(),
    name,
    type,
    mode,
    description,
    policyTagsNames: policyTags?.names || [],
    maxLength,
    precision,
    scale,
  }
}

const formatTableViewUserDefinedFunctionResource = ({
  resourceUri,
  inlineCode,
}: {
  resourceUri?: string
  inlineCode?: string
}): GcpBigQueryTableViewUserDefinedFunctionResource => ({
  id: cuid(),
  resourceUri,
  inlineCode,
})

const formatColumnFamily = (columnFamily): GcpBigQueryTableExternalDataConfigurationBigtableOptionColumnFamily => {
  const {
    familyId,
    type,
    encoding,
    columns = [],
    onlyReadLatest,
  } = columnFamily
  
  return {
    id: cuid(),
    familyId,
    type,
    encoding,
    columns: columns?.map(({
      qualifierEncoded,
      qualifierString,
      fieldName,
      type: columnType,
      encoding: columnEncoding,
      onlyReadLatest: columnOnlyReadLatest,
    }) => {
      return {
        id: cuid(),
        qualifierEncoded,
        qualifierString,
        fieldName,
        type: columnType,
        encoding: columnEncoding,
        onlyReadLatest: columnOnlyReadLatest,
      }}) || [],
    onlyReadLatest,
  }
}

const formatTable = (table: RawGcpBigQueryTable): GcpBigQueryTable => {
  const {
    id,
    kind,
    labels = {},
    location,
    tableReference,
    friendlyName,
    description,
    type,
    schema = {},
    timePartitioning = {},
    rangePartitioning = {},
    clustering = {},
    requirePartitionFilter,
    numBytes,
    numLongTermBytes,
    numRows,
    creationTime,
    expirationTime,
    lastModifiedTime,
    view = {},
    materializedView = {},
    externalDataConfiguration = {},
    streamingBuffer = {},
    encryptionConfiguration = {},
    snapshotDefinition = {},
  } = table

  return {
    id: id || cuid(),
    projectId: tableReference?.projectId || '',
    name: tableReference?.tableId || '',
    kind,
    labels: formatLabelsFromMap(labels),
    location,
    description,
    type,
    friendlyName,
    schemaFields: schema?.fields?.map(field => formatTableField(field)),
    timePartitioningType: timePartitioning?.type || '',
    timePartitioningExpirationMs: timePartitioning?.expirationMs || '',
    timePartitioningField: timePartitioning?.field || '',
    timePartitioningRequirePartitionFilter: timePartitioning?.requirePartitionFilter || false,
    rangePartitioningField: rangePartitioning?.field || '',
    rangePartitioningRangeStart: rangePartitioning?.range?.start || '',
    rangePartitioningRangeEnd: rangePartitioning?.range?.end || '',
    rangePartitioningRangeInterval: rangePartitioning?.range?.interval || '',
    clusteringFields: clustering?.fields || [],
    requirePartitionFilter,
    numBytes,
    numLongTermBytes,
    numRows,
    creationTime,
    expirationTime,
    lastModifiedTime,
    viewQuery: view?.query || '',
    viewUserDefinedFunctionResources: view?.userDefinedFunctionResources?.map(
      resource => formatTableViewUserDefinedFunctionResource(resource)
    ) || [],
    viewUseLegacySql: view?.useLegacySql || false,
    materializedViewQuery: materializedView?.query || '',
    materializedViewLastRefreshTime: materializedView?.lastRefreshTime || '',
    materializedViewEnableRefresh: materializedView?.enableRefresh || false,
    materializedViewRefreshIntervalMs: materializedView?.refreshIntervalMs || '',

    externalDataConfigurationSourceUris: externalDataConfiguration?.sourceUris || [],
    externalDataConfigurationSchemaFields: externalDataConfiguration?.schema?.fields?.map(field => formatTableField(field)),
    externalDataConfigurationSourceFormat: externalDataConfiguration?.sourceFormat || '',
    externalDataConfigurationMaxBadRecords: externalDataConfiguration?.maxBadRecords || 0,
    externalDataConfigurationAutodetect: externalDataConfiguration?.autodetect || false,
    externalDataConfigurationIgnoreUnknownValues: externalDataConfiguration?.ignoreUnknownValues || false,
    externalDataConfigurationCompression: externalDataConfiguration?.compression || '',
    externalDataConfigurationCsvOptionsFieldDelimiter: externalDataConfiguration?.csvOptions?.fieldDelimiter || '',
    externalDataConfigurationCsvOptionsSkipLeadingRows: externalDataConfiguration?.csvOptions?.skipLeadingRows || '',
    externalDataConfigurationCsvOptionsQuote: externalDataConfiguration?.csvOptions?.quote || '',
    externalDataConfigurationCsvOptionsAllowQuotedNewlines: externalDataConfiguration?.csvOptions?.allowQuotedNewlines || false,
    externalDataConfigurationCsvOptionsAllowJaggedRows: externalDataConfiguration?.csvOptions?.allowJaggedRows || false,
    externalDataConfigurationCsvOptionsEncoding: externalDataConfiguration?.csvOptions?.encoding || '',
    externalDataConfigurationBigtableOptionsColumnFamilies: externalDataConfiguration?.bigtableOptions?.columnFamilies?.map(
      columnFamily => formatColumnFamily(columnFamily)
    ) || [],
    externalDataConfigurationBigtableOptionsIgnoreUnspecifiedColumnFamilies:
      externalDataConfiguration?.bigtableOptions?.ignoreUnspecifiedColumnFamilies || false,
    externalDataConfigurationBigtableOptionsReadRowkeyAsString: externalDataConfiguration?.bigtableOptions?.readRowkeyAsString || false,
    externalDataConfigurationGoogleSheetsOptionsSkipLeadingRows: externalDataConfiguration?.googleSheetsOptions?.skipLeadingRows || '',
    externalDataConfigurationGoogleSheetsOptionsRange: externalDataConfiguration?.googleSheetsOptions?.range || '',
    externalDataConfigurationHivePartitioningOptionsMode: externalDataConfiguration?.hivePartitioningOptions?.mode || '',
    externalDataConfigurationHivePartitioningOptionsSourceUriPrefix:
      externalDataConfiguration?.hivePartitioningOptions?.sourceUriPrefix || '',
    externalDataConfigurationHivePartitioningOptionsRequirePartitionFilter:
      externalDataConfiguration?.hivePartitioningOptions?.requirePartitionFilter || false,
    externalDataConfigurationHivePartitioningOptionsFields: externalDataConfiguration?.hivePartitioningOptions?.fields || [],
    externalDataConfigurationConnectionId: externalDataConfiguration?.connectionId || '',
    externalDataConfigurationDecimalTargetTypes: externalDataConfiguration?.decimalTargetTypes || [],
    externalDataConfigurationAvroOptionsUseAvroLogicalTypes:externalDataConfiguration?.avroOptions?.useAvroLogicalTypes || false,
    externalDataConfigurationParquetOptionsEnumAsString: externalDataConfiguration?.parquetOptions?.enumAsString || false,
    externalDataConfigurationParquetOptionsEnableListInference: externalDataConfiguration?.parquetOptions?.enableListInference || false,
    streamingBufferEstimatedBytes: streamingBuffer?.estimatedBytes || '',
    streamingBufferEstimatedRows: streamingBuffer?.estimatedRows || '',
    streamingBufferOldestEntryTime: streamingBuffer?.oldestEntryTime || '',
    encryptionConfigurationKmsKeyName: encryptionConfiguration?.kmsKeyName || '',
    snapshotDefinitionBaseTableReferenceProjectId: snapshotDefinition?.baseTableReference?.projectId || '',
    snapshotDefinitionBaseTableReferenceDatasetId: snapshotDefinition?.baseTableReference?.datasetId || '',
    snapshotDefinitionBaseTableReferenceTableId: snapshotDefinition?.baseTableReference?.tableId || '',
    snapshotDefinitionSnapshotTime: snapshotDefinition?.snapshotTime || '',
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpBigQueryDataset
  account: string
  region: string
}): GcpBigQueryDataset => {
  const {
    id,
    kind,
    tables = [],
    labels = {}
  } = service

  return {
    id: id || cuid(),
    projectId: account,
    region,
    kind,
    labels: formatLabelsFromMap(labels),
    totalTables: tables.length || 0,
    tables: tables.map(table => formatTable(table)) || []
  }
}
