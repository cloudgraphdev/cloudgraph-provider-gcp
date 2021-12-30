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

export type GcpDuration = {
  seconds?: Maybe<Scalars['String']>;
  nanos?: Maybe<Scalars['Int']>;
};

export type GcpFirewall = {
  id: Scalars['String'];
  projectId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  allowed?: Maybe<Array<Maybe<GcpFirewallAccess>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  denied?: Maybe<Array<Maybe<GcpFirewallAccess>>>;
  description?: Maybe<Scalars['String']>;
  destinationRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  direction?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  logConfig?: Maybe<GcpFirewallLogConfig>;
  network?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  selfLink?: Maybe<Scalars['String']>;
  sourceRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceServiceAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetServiceAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpFirewallAccess = {
  id: Scalars['String'];
  ipProtocol?: Maybe<Scalars['String']>;
  ports?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpFirewallLogConfig = {
  enable?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['String']>;
};

export type GcpFolder = GcpBaseResource & {
  parent?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  organization?: Maybe<Array<Maybe<GcpOrganization>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
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

export type GcpNetwork = GcpBaseResource & {
  ipV4Range?: Maybe<Scalars['String']>;
  autoCreateSubnetworks?: Maybe<Scalars['Boolean']>;
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  gatewayIPv4?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  mtu?: Maybe<Scalars['Int']>;
  peerings?: Maybe<Array<Maybe<GcpNetworkPeering>>>;
  routingConfig?: Maybe<GcpNetworkRoutingConfig>;
  selfLink?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
  vpc?: Maybe<Array<Maybe<GcpVpcConnector>>>;
};

export type GcpNetworkPeering = {
  id: Scalars['String'];
  autoCreateRoutes?: Maybe<Scalars['Boolean']>;
  exchangeSubnetRoutes?: Maybe<Scalars['Boolean']>;
  exportCustomRoutes?: Maybe<Scalars['Boolean']>;
  exportSubnetRoutesWithPublicIp?: Maybe<Scalars['Boolean']>;
  importCustomRoutes?: Maybe<Scalars['Boolean']>;
  importSubnetRoutesWithPublicIp?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  peerMtu?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  stateDetails?: Maybe<Scalars['String']>;
};

export type GcpNetworkRoutingConfig = {
  routingMode?: Maybe<Scalars['String']>;
};

export type GcpOrganization = GcpBaseResource & {
  displayName?: Maybe<Scalars['String']>;
  directoryCustomerId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  folder?: Maybe<Array<Maybe<GcpFolder>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
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
  storageBucket?: Maybe<Array<Maybe<GcpStorageBucket>>>;
  firewall?: Maybe<Array<Maybe<GcpFirewall>>>;
  folder?: Maybe<Array<Maybe<GcpFolder>>>;
  organization?: Maybe<Array<Maybe<GcpOrganization>>>;
  secretManager?: Maybe<Array<Maybe<GcpSecret>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
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

export type GcpSecret = GcpBaseResource & {
  replication?: Maybe<GcpSecretReplication>;
  createTime?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  topics?: Maybe<Array<Maybe<GcpSecretReplicationStatusTopic>>>;
  expireTime?: Maybe<Scalars['String']>;
  ttl?: Maybe<GcpDuration>;
  etag?: Maybe<Scalars['String']>;
  rotation?: Maybe<GcpSecretReplicationStatusRotation>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpSecretReplication = {
  automatic?: Maybe<GcpSecretReplicationAutomatic>;
  userManaged?: Maybe<GcpSecretReplicationUserManagedStatus>;
};

export type GcpSecretReplicationAutomatic = {
  customerManagedEncryption?: Maybe<GcpSecretReplicationCustomerManagedEncryption>;
};

export type GcpSecretReplicationCustomerManagedEncryption = {
  kmsKeyName?: Maybe<Scalars['String']>;
};

export type GcpSecretReplicationStatusRotation = {
  nextRotationTime?: Maybe<Scalars['String']>;
  rotationPeriod?: Maybe<GcpDuration>;
};

export type GcpSecretReplicationStatusTopic = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type GcpSecretReplicationUserManagedStatus = {
  replicas?: Maybe<Array<Maybe<GcpSecretReplicationUserManagedStatusReplicaStatus>>>;
};

export type GcpSecretReplicationUserManagedStatusCustomerManagedEncryptionStatus = {
  kmsKeyVersionName?: Maybe<Scalars['String']>;
};

export type GcpSecretReplicationUserManagedStatusReplicaStatus = {
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  customerManagedEncryption?: Maybe<GcpSecretReplicationUserManagedStatusCustomerManagedEncryptionStatus>;
};

export type GcpStorageBucket = {
  id: Scalars['String'];
  projectId: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  projectNumber?: Maybe<Scalars['String']>;
  metageneration?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  storageClass?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  defaultEventBasedHold?: Maybe<Scalars['Boolean']>;
  timeCreated?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawTag>>>;
  iamConfiguration?: Maybe<GcpStorageBucketIamConfiguration>;
  locationType?: Maybe<Scalars['String']>;
  satisfiesPZS?: Maybe<Scalars['Boolean']>;
  rpo?: Maybe<Scalars['String']>;
  baseUrl?: Maybe<Scalars['String']>;
  pollIntervalMs?: Maybe<Scalars['Int']>;
  userProject?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpStorageBucketIamConfiguration = {
  bucketPolicyOnly?: Maybe<GcpStorageBucketIamConfigurationMetadata>;
  uniformBucketLevelAccess?: Maybe<GcpStorageBucketIamConfigurationMetadata>;
  publicAccessPrevention?: Maybe<Scalars['String']>;
};

export type GcpStorageBucketIamConfigurationMetadata = {
  enabled?: Maybe<Scalars['Boolean']>;
  lockedTime?: Maybe<Scalars['String']>;
};

export type GcpSubnet = GcpBaseResource & {
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  enableFlowLogs?: Maybe<Scalars['Boolean']>;
  fingerprint?: Maybe<Scalars['String']>;
  gatewayAddress?: Maybe<Scalars['String']>;
  ipCidrRange?: Maybe<Scalars['String']>;
  ipv6CidrRange?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  logConfig?: Maybe<GcpSubnetLogConfig>;
  privateIpGoogleAccess?: Maybe<Scalars['Boolean']>;
  privateIpv6GoogleAccess?: Maybe<Scalars['String']>;
  purpose?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  secondaryIpRanges?: Maybe<Array<Maybe<GcpSubnetSecondaryRange>>>;
  selfLink?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  vpc?: Maybe<Array<Maybe<GcpVpcConnector>>>;
};

export type GcpSubnetLogConfig = {
  aggregationInterval?: Maybe<Scalars['String']>;
  enable?: Maybe<Scalars['Boolean']>;
  filterExpr?: Maybe<Scalars['String']>;
  flowSampling?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['String']>;
  metadataFields?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpSubnetSecondaryRange = {
  id: Scalars['String'];
  ipCidrRange?: Maybe<Scalars['String']>;
  rangeName?: Maybe<Scalars['String']>;
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
  ipCidrRange?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  minThroughput?: Maybe<Scalars['Int']>;
  maxThroughput?: Maybe<Scalars['Int']>;
  connectedProjects?: Maybe<Array<Maybe<Scalars['String']>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
};
