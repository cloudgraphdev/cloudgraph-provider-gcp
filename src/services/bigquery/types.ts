// refer to https://cloud.google.com/bigquery/docs/reference/rest/v2/tables
export interface RawGcpBigqueryTable {
  kind?: string
  id?: string
  tableReference?: {
    projectId?: string
    datasetId?: string
    tableId?: string
  }
  friendlyName?: string
  description?: string
  labels?: { [key: string]: string }
  schema?: {
    fields?: {
      name?: string
      type?: string
      mode?: string
      description?: string
      policyTags?: {
        names?: string[]
      }
      maxLength?: string
      precision?: string
      scale?: string
    }[]
  },
  timePartitioning?: {
    type?: string
    expirationMs?: string
    field?: string
    requirePartitionFilter?: boolean
  },
  rangePartitioning?: {
    field?: string
    range?: {
      start?: string
      end?: string
      interval?: string
    }
  },
  clustering?: {
    fields?: string[]
  },
  requirePartitionFilter?: boolean
  numBytes?: string
  numLongTermBytes?: string
  numRows?: string
  creationTime?: string
  expirationTime?: string
  lastModifiedTime?: string
  type?: string
  view?: {
    query?: string
    userDefinedFunctionResources?: {
      resourceUri?: string
      inlineCode?: string
    }[]
    useLegacySql?: boolean
  }
  materializedView?: {
    query?: string
    lastRefreshTime?: string
    enableRefresh?: boolean
    refreshIntervalMs?: string
  }
  externalDataConfiguration?: {
    sourceUris?: string[]
    schema?: {
      fields?: {
        name?: string
        type?: string
        mode?: string
        description?: string
        policyTags?: {
          names?: string[]
        }
        maxLength?: string
        precision?: string
        scale?: string
      }[]
    },
    sourceFormat?: string
    maxBadRecords?: number
    autodetect?: boolean
    ignoreUnknownValues?: boolean
    compression?: string
    csvOptions?: {
      fieldDelimiter?: string
      skipLeadingRows?: string
      quote?: string
      allowQuotedNewlines?: boolean
      allowJaggedRows?: boolean
      encoding?: string
    },
    bigtableOptions?: {
      columnFamilies?: {
        familyId?: string
        type?: string
        encoding?: string
        columns?: {
          qualifierEncoded?: string
          qualifierString?: string
          fieldName?: string
          type?: string
          encoding?: string
          onlyReadLatest?: boolean
        }[],
        onlyReadLatest?: boolean
      }[],
      ignoreUnspecifiedColumnFamilies?: boolean
      readRowkeyAsString?: boolean
    },
    googleSheetsOptions?: {
      skipLeadingRows?: string
      range?: string
    },
    hivePartitioningOptions?: {
      mode?: string
      sourceUriPrefix?: string
      requirePartitionFilter?: boolean
      fields?: string[]
    }
    connectionId?: string
    decimalTargetTypes?: string[]
    avroOptions?: {
      useAvroLogicalTypes?: boolean
    }
    parquetOptions?: {
      enumAsString?: boolean
      enableListInference?: boolean
    }
  }
  location?: string
  streamingBuffer?: {
    estimatedBytes?: string
    estimatedRows?: string
    oldestEntryTime?: string
  }
  encryptionConfiguration?: {
    kmsKeyName?: string
  }
  snapshotDefinition?: {
    baseTableReference?: {
      projectId?: string
      datasetId?: string
      tableId?: string
    }
    snapshotTime?: string
  }
}

// refer to https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets
export interface RawGcpBigqueryDataset {
  datasetReference?: {
    datasetId?: string
    projectId?: string
  };
  friendlyName?: string
  id?: string
  kind?: string
  labels?: { [key: string]: string }
  location?: string
  region?: string
  tables: RawGcpBigqueryTable[]
}
