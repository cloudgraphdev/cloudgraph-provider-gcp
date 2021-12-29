export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GcpBaseResource = {
  id: Scalars['String'];
  projectId: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GcpBigQueryOptions = {
  usePartitionedTables?: Maybe<Scalars['Boolean']>;
  usesTimestampColumnPartitioning?: Maybe<Scalars['Boolean']>;
};

export type GcpIamBinding = {
  id: Scalars['String'];
  role?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
  condition?: Maybe<GcpIamBindingExpr>;
};

export type GcpIamBindingExpr = {
  expression?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type GcpIamPolicy = {
  id: Scalars['String'];
  projectId: Scalars['String'];
  version?: Maybe<Scalars['Int']>;
  bindings?: Maybe<Array<Maybe<GcpIamBinding>>>;
  etag?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpKmsCryptoKey = {
  name?: Maybe<Scalars['String']>;
  primaryName?: Maybe<Scalars['String']>;
  primaryState?: Maybe<Scalars['String']>;
  primaryProtectionLevel?: Maybe<Scalars['String']>;
  primaryAlgorithm?: Maybe<Scalars['String']>;
  primaryAttestationFormat?: Maybe<Scalars['String']>;
  primaryAttestationContent?: Maybe<Scalars['String']>;
  primaryCreateTime?: Maybe<Scalars['String']>;
  primaryGenerateTime?: Maybe<Scalars['String']>;
  primaryDestroyTime?: Maybe<Scalars['String']>;
  primaryDestroyEventTime?: Maybe<Scalars['String']>;
  primaryImportJob?: Maybe<Scalars['String']>;
  primaryImportTime?: Maybe<Scalars['String']>;
  primaryImportFailureReason?: Maybe<Scalars['String']>;
  primaryExternalProtectionLevelOptionsExternalKeyUri?: Maybe<Scalars['String']>;
  primaryReimportEligible?: Maybe<Scalars['Boolean']>;
  purpose?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  nextRotationTime?: Maybe<Scalars['String']>;
  rotationPeriod?: Maybe<Scalars['String']>;
  versionTemplateAlgorithm?: Maybe<Scalars['String']>;
  versionTemplateProtectionLevel?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  importOnly?: Maybe<Scalars['Boolean']>;
  destroyScheduledDuration?: Maybe<Scalars['String']>;
};

export type GcpKmsImportJob = {
  name?: Maybe<Scalars['String']>;
  importMethod?: Maybe<Scalars['String']>;
  protectionLevel?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  generateTime?: Maybe<Scalars['String']>;
  expireTime?: Maybe<Scalars['String']>;
  expireEventTime?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  attestationContent?: Maybe<Scalars['String']>;
  attestationFormat?: Maybe<Scalars['String']>;
};

export type GcpKmsKeyRing = GcpBaseResource & {
  createTime?: Maybe<Scalars['String']>;
  cryptoKeys?: Maybe<Array<Maybe<GcpKmsCryptoKey>>>;
  importJobs?: Maybe<Array<Maybe<GcpKmsImportJob>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpLogBucket = {
  id: Scalars['String'];
  projectId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  retentionDays?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lifecycleState?: Maybe<Scalars['String']>;
  logView?: Maybe<Array<Maybe<GcpLogView>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpLogExclusion = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpLogSink = {
  id: Scalars['String'];
  projectId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  exclusions?: Maybe<Array<Maybe<GcpLogExclusion>>>;
  outputVersionFormat?: Maybe<Scalars['String']>;
  writerIdentity?: Maybe<Scalars['String']>;
  includeChildren?: Maybe<Scalars['Boolean']>;
  bigqueryOptions?: Maybe<GcpBigQueryOptions>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpLogView = {
  id: Scalars['String'];
  projectId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  logBucket?: Maybe<Array<Maybe<GcpLogBucket>>>;
};

export type GcpProject = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  vpc?: Maybe<Array<Maybe<GcpVpcConnector>>>;
  kms?: Maybe<Array<Maybe<GcpKmsKeyRing>>>;
  iamPolicy?: Maybe<Array<Maybe<GcpIamPolicy>>>;
  logBucket?: Maybe<Array<Maybe<GcpLogBucket>>>;
  logView?: Maybe<Array<Maybe<GcpLogView>>>;
  logSink?: Maybe<Array<Maybe<GcpLogSink>>>;
};

export type GcpRawLabel = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpRawTag = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpTag = {
  id: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
  kms?: Maybe<Array<Maybe<GcpKmsKeyRing>>>;
};

export type GcpVpcConnector = {
  id: Scalars['String'];
  projectId: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  ipCidrRange?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  minThroughput?: Maybe<Scalars['Int']>;
  maxThroughput?: Maybe<Scalars['Int']>;
  connectedProjects?: Maybe<Array<Maybe<Scalars['String']>>>;
  subnet?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};
