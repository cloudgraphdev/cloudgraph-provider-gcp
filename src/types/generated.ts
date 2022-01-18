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

export type GcpAcceleratorConfig = {
  id: Scalars['String'];
  acceleratorCount?: Maybe<Scalars['Int']>;
  acceleratorType?: Maybe<Scalars['String']>;
};

export type GcpAdvancedMachineFeatures = {
  enableNestedVirtualization?: Maybe<Scalars['Boolean']>;
  threadsPerCore?: Maybe<Scalars['Int']>;
};

export type GcpAlertPolicy = GcpBaseResource & {
  displayName?: Maybe<Scalars['String']>;
  documentation?: Maybe<GcpAlertPolicyDocumentation>;
  userLabels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  conditions?: Maybe<Array<Maybe<GcpAlertPolicyCondition>>>;
  combiner?: Maybe<Scalars['String']>;
  enabled?: Maybe<GcpBoolValue>;
  validity?: Maybe<GcpRpcStatus>;
  notificationChannels?: Maybe<Array<Maybe<Scalars['String']>>>;
  creationRecord?: Maybe<GcpAlertPolicyMutationRecord>;
  mutationRecord?: Maybe<GcpAlertPolicyMutationRecord>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpAlertPolicyAggregation = {
  id: Scalars['String'];
  alignmentPeriod?: Maybe<GcpDuration>;
  perSeriesAligner?: Maybe<Scalars['String']>;
  crossSeriesReducer?: Maybe<Scalars['String']>;
  groupByFields?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpAlertPolicyCondition = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  conditionThreshold?: Maybe<GcpAlertPolicyMetricThreshold>;
  conditionAbsent?: Maybe<GcpAlertPolicyMetricAbsence>;
  conditionMonitoringQueryLanguage?: Maybe<GcpAlertPolicyMonitoringQueryLanguageCondition>;
};

export type GcpAlertPolicyDocumentation = {
  content?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
};

export type GcpAlertPolicyMetricAbsence = {
  filter?: Maybe<Scalars['String']>;
  aggregations?: Maybe<Array<Maybe<GcpAlertPolicyAggregation>>>;
  duration?: Maybe<GcpDuration>;
  trigger?: Maybe<GcpAlertPolicyTrigger>;
};

export type GcpAlertPolicyMetricThreshold = {
  filter?: Maybe<Scalars['String']>;
  aggregations?: Maybe<Array<Maybe<GcpAlertPolicyAggregation>>>;
  denominatorFilter?: Maybe<Scalars['String']>;
  denominatorAggregations?: Maybe<Array<Maybe<GcpAlertPolicyAggregation>>>;
  comparison?: Maybe<Scalars['String']>;
  thresholdValue?: Maybe<Scalars['Float']>;
  duration?: Maybe<GcpDuration>;
  trigger?: Maybe<GcpAlertPolicyTrigger>;
};

export type GcpAlertPolicyMonitoringQueryLanguageCondition = {
  query?: Maybe<Scalars['String']>;
  duration?: Maybe<GcpDuration>;
  trigger?: Maybe<GcpAlertPolicyTrigger>;
};

export type GcpAlertPolicyMutationRecord = {
  mutateTime?: Maybe<Scalars['String']>;
  mutatedBy?: Maybe<Scalars['String']>;
};

export type GcpAlertPolicyTrigger = {
  count?: Maybe<Scalars['Float']>;
  percent?: Maybe<Scalars['Float']>;
};

export type GcpAny = {
  id: Scalars['String'];
  type_url?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpAttachedDisk = {
  id: Scalars['String'];
  autoDelete?: Maybe<Scalars['Boolean']>;
  boot?: Maybe<Scalars['Boolean']>;
  deviceName?: Maybe<Scalars['String']>;
  diskEncryptionKey?: Maybe<GcpCustomerEncryptionKey>;
  diskSizeGb?: Maybe<Scalars['String']>;
  guestOsFeatures?: Maybe<Array<Maybe<GcpGuestOsFeature>>>;
  index?: Maybe<Scalars['Int']>;
  initializeParams?: Maybe<GcpAttachedDiskInitializeParams>;
  interface?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  licenses?: Maybe<Array<Maybe<Scalars['String']>>>;
  mode?: Maybe<Scalars['String']>;
  shieldedInstanceInitialState?: Maybe<GcpInitialStateConfig>;
  source?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpAttachedDiskInitializeParams = {
  description?: Maybe<Scalars['String']>;
  diskName?: Maybe<Scalars['String']>;
  diskSizeGb?: Maybe<Scalars['String']>;
  diskType?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  onUpdateAction?: Maybe<Scalars['String']>;
  provisionedIops?: Maybe<Scalars['String']>;
  resourcePolicies?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceImage?: Maybe<Scalars['String']>;
  sourceImageEncryptionKey?: Maybe<GcpCustomerEncryptionKey>;
  sourceSnapshot?: Maybe<Scalars['String']>;
  sourceSnapshotEncryptionKey?: Maybe<GcpCustomerEncryptionKey>;
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

export type GcpBoolValue = {
  value?: Maybe<Scalars['Boolean']>;
};

export type GcpComputeAccessConfig = {
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  natIP?: Maybe<Scalars['String']>;
  networkTier?: Maybe<Scalars['String']>;
  publicPtrDomainName?: Maybe<Scalars['String']>;
  setPublicPtr?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpComputeAliasIpRange = {
  id: Scalars['String'];
  ipCidrRange?: Maybe<Scalars['String']>;
  subnetworkRangeName?: Maybe<Scalars['String']>;
};

export type GcpComputeNetworkInterface = {
  id: Scalars['String'];
  accessConfigs?: Maybe<Array<Maybe<GcpComputeAccessConfig>>>;
  aliasIpRanges?: Maybe<Array<Maybe<GcpComputeAliasIpRange>>>;
  fingerprint?: Maybe<Scalars['String']>;
  ipv6Address?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  networkIP?: Maybe<Scalars['String']>;
  nicType?: Maybe<Scalars['String']>;
  subnetwork?: Maybe<Scalars['String']>;
};

export type GcpComputeTags = {
  fingerprint?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpConfidentialInstanceConfig = {
  enableConfidentialCompute?: Maybe<Scalars['Boolean']>;
};

export type GcpCustomerEncryptionKey = {
  kmsKeyName?: Maybe<Scalars['String']>;
  kmsKeyServiceAccount?: Maybe<Scalars['String']>;
  rawKey?: Maybe<Scalars['String']>;
  sha256?: Maybe<Scalars['String']>;
};

export type GcpDisplayDevice = {
  enableDisplay?: Maybe<Scalars['Boolean']>;
};

export type GcpDnsManagedZone = GcpBaseResource & {
  kind?: Maybe<Scalars['String']>;
  dnsName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  nameServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  dnssecConfigKind?: Maybe<Scalars['String']>;
  dnssecConfigState?: Maybe<Scalars['String']>;
  dnssecConfigDefaultKeySpecs?: Maybe<Array<Maybe<GcpDnsZoneDnssecConfigDefaultKeySpec>>>;
  dnssecConfigNonExistence?: Maybe<Scalars['String']>;
  nameServerSet?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
  privateVisibilityConfigKind?: Maybe<Scalars['String']>;
  privateVisibilityConfigNetworks?: Maybe<Array<Maybe<GcpDnsZonePrivateVisibilityConfigNetwork>>>;
  forwardingConfigKind?: Maybe<Scalars['String']>;
  forwardingConfigTargetNameServers?: Maybe<Array<Maybe<GcpDnsZoneForwardingConfigTargetNameServer>>>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  peeringConfigKind?: Maybe<Scalars['String']>;
  peeringConfigTargetNetworkKind?: Maybe<Scalars['String']>;
  peeringConfigTargetNetworkUrl?: Maybe<Scalars['String']>;
  peeringConfigTargetNetworkDeactivateTime?: Maybe<Scalars['String']>;
  reverseLookupConfigKind?: Maybe<Scalars['String']>;
  serviceDirectoryConfigKind?: Maybe<Scalars['String']>;
  serviceDirectoryConfigNamespaceKind?: Maybe<Scalars['String']>;
  serviceDirectoryConfigNamespaceUrl?: Maybe<Scalars['String']>;
  serviceDirectoryConfigNamespaceDeactivateTime?: Maybe<Scalars['String']>;
  cloudLoggingConfigKind?: Maybe<Scalars['String']>;
  cloudLoggingConfigEnableLogging?: Maybe<Scalars['Boolean']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpDnsPolicy = GcpBaseResource & {
  kind?: Maybe<Scalars['String']>;
  enableInboundForwarding?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  alternativeNameServerConfigKind?: Maybe<Scalars['String']>;
  alternativeNameServerConfigTargetNameServers?: Maybe<Array<Maybe<GcpDnsPolicyAlternativeNameServerConfigTargetNameServer>>>;
  enableLogging?: Maybe<Scalars['Boolean']>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpDnsPolicyAlternativeNameServerConfigTargetNameServer = {
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  ipv4Address?: Maybe<Scalars['String']>;
  forwardingPath?: Maybe<Scalars['String']>;
};

export type GcpDnsZoneDnssecConfigDefaultKeySpec = {
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  keyType?: Maybe<Scalars['String']>;
  algorithm?: Maybe<Scalars['String']>;
  keyLength?: Maybe<Scalars['Int']>;
};

export type GcpDnsZoneForwardingConfigTargetNameServer = {
  id?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  ipv4Address?: Maybe<Scalars['String']>;
  forwardingPath?: Maybe<Scalars['String']>;
};

export type GcpDnsZonePrivateVisibilityConfigNetwork = {
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  networkUrl?: Maybe<Scalars['String']>;
};

export type GcpDuration = {
  seconds?: Maybe<Scalars['String']>;
  nanos?: Maybe<Scalars['Int']>;
};

export type GcpFileContentBuffer = {
  id: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  fileType?: Maybe<Scalars['String']>;
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
  priority?: Maybe<Scalars['Int']>;
  selfLink?: Maybe<Scalars['String']>;
  sourceRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceServiceAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetServiceAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
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

export type GcpGuestOsFeature = {
  id: Scalars['String'];
  type?: Maybe<Scalars['String']>;
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

export type GcpInitialStateConfig = {
  dbs?: Maybe<Array<Maybe<GcpFileContentBuffer>>>;
  dbxs?: Maybe<Array<Maybe<GcpFileContentBuffer>>>;
  keks?: Maybe<Array<Maybe<GcpFileContentBuffer>>>;
  pk?: Maybe<GcpFileContentBuffer>;
};

export type GcpItems = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
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

export type GcpLabelDescriptor = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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

export type GcpLogMetric = GcpBaseResource & {
  description?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  metricDescriptor?: Maybe<GcpLogMetricDescriptor>;
  valueExtractor?: Maybe<Scalars['String']>;
  labelExtractors?: Maybe<Array<Maybe<GcpRawLabel>>>;
  bucketOptions?: Maybe<GcpLogMetricBucketOptions>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpLogMetricBucketOptions = {
  linearBuckets?: Maybe<GcpLogMetricBucketOptionsLinear>;
  exponentialBuckets?: Maybe<GcpLogMetricBucketOptionsExponential>;
  explicitBuckets?: Maybe<GcpLogMetricBucketOptionsExplicit>;
};

export type GcpLogMetricBucketOptionsExplicit = {
  bounds?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type GcpLogMetricBucketOptionsExponential = {
  numFiniteBuckets?: Maybe<Scalars['Float']>;
  growthFactor?: Maybe<Scalars['Float']>;
  scale?: Maybe<Scalars['Float']>;
};

export type GcpLogMetricBucketOptionsLinear = {
  numFiniteBuckets?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
};

export type GcpLogMetricDescriptor = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpLabelDescriptor>>>;
  metricKind?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  metadata?: Maybe<GcpLogMetricDescriptorMetadata>;
  launchStage?: Maybe<Scalars['String']>;
  monitoredResourceTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpLogMetricDescriptorMetadata = {
  launchStage?: Maybe<Scalars['String']>;
  samplePeriod?: Maybe<GcpDuration>;
  ingestDelay?: Maybe<GcpDuration>;
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

export type GcpMetadata = {
  fingerprint?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<GcpItems>>>;
  kind?: Maybe<Scalars['String']>;
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
  dnsPolicy?: Maybe<Array<Maybe<GcpDnsPolicy>>>;
  firewall?: Maybe<Array<Maybe<GcpFirewall>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
  vpc?: Maybe<Array<Maybe<GcpVpcConnector>>>;
  vmInstance?: Maybe<Array<Maybe<GcpVmInstance>>>;
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
  alertPolicy?: Maybe<Array<Maybe<GcpAlertPolicy>>>;
  dnsManagedZone?: Maybe<Array<Maybe<GcpDnsManagedZone>>>;
  dnsPolicy?: Maybe<Array<Maybe<GcpDnsPolicy>>>;
  vpc?: Maybe<Array<Maybe<GcpVpcConnector>>>;
  kms?: Maybe<Array<Maybe<GcpKmsKeyRing>>>;
  iamPolicy?: Maybe<Array<Maybe<GcpIamPolicy>>>;
  logBucket?: Maybe<Array<Maybe<GcpLogBucket>>>;
  logMetric?: Maybe<Array<Maybe<GcpLogMetric>>>;
  logView?: Maybe<Array<Maybe<GcpLogView>>>;
  logSink?: Maybe<Array<Maybe<GcpLogSink>>>;
  storageBucket?: Maybe<Array<Maybe<GcpStorageBucket>>>;
  firewall?: Maybe<Array<Maybe<GcpFirewall>>>;
  folder?: Maybe<Array<Maybe<GcpFolder>>>;
  organization?: Maybe<Array<Maybe<GcpOrganization>>>;
  secretManager?: Maybe<Array<Maybe<GcpSecret>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
  vmInstance?: Maybe<Array<Maybe<GcpVmInstance>>>;
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

export type GcpReservationAffinity = {
  consumeReservationType?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpRpcStatus = {
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  details?: Maybe<Array<Maybe<GcpAny>>>;
};

export type GcpScheduling = {
  automaticRestart?: Maybe<Scalars['Boolean']>;
  locationHint?: Maybe<Scalars['String']>;
  minNodeCpus?: Maybe<Scalars['Int']>;
  nodeAffinities?: Maybe<Array<Maybe<GcpSchedulingNodeAffinity>>>;
  onHostMaintenance?: Maybe<Scalars['String']>;
  preemptible?: Maybe<Scalars['Boolean']>;
};

export type GcpSchedulingNodeAffinity = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type GcpServiceAccount = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpShieldedInstanceConfig = {
  enableIntegrityMonitoring?: Maybe<Scalars['Boolean']>;
  enableSecureBoot?: Maybe<Scalars['Boolean']>;
  enableVtpm?: Maybe<Scalars['Boolean']>;
};

export type GcpShieldedInstanceIntegrityPolicy = {
  updateAutoLearnPolicy?: Maybe<Scalars['Boolean']>;
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
  vmInstance?: Maybe<Array<Maybe<GcpVmInstance>>>;
};

export type GcpSubnetLogConfig = {
  aggregationInterval?: Maybe<Scalars['String']>;
  enable?: Maybe<Scalars['Boolean']>;
  filterExpr?: Maybe<Scalars['String']>;
  flowSampling?: Maybe<Scalars['String']>;
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

export type GcpVmInstance = GcpBaseResource & {
  advancedMachineFeatures?: Maybe<GcpAdvancedMachineFeatures>;
  canIpForward?: Maybe<Scalars['Boolean']>;
  confidentialInstanceConfig?: Maybe<GcpConfidentialInstanceConfig>;
  cpuPlatform?: Maybe<Scalars['String']>;
  creationTimestamp?: Maybe<Scalars['String']>;
  deletionProtection?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  disks?: Maybe<Array<Maybe<GcpAttachedDisk>>>;
  displayDevice?: Maybe<GcpDisplayDevice>;
  fingerprint?: Maybe<Scalars['String']>;
  guestAccelerators?: Maybe<Array<Maybe<GcpAcceleratorConfig>>>;
  hostname?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  labelFingerprint?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  lastStartTimestamp?: Maybe<Scalars['String']>;
  lastStopTimestamp?: Maybe<Scalars['String']>;
  lastSuspendedTimestamp?: Maybe<Scalars['String']>;
  machineType?: Maybe<Scalars['String']>;
  metadata?: Maybe<GcpMetadata>;
  minCpuPlatform?: Maybe<Scalars['String']>;
  networkInterfaces?: Maybe<Array<Maybe<GcpComputeNetworkInterface>>>;
  privateIpv6GoogleAccess?: Maybe<Scalars['String']>;
  reservationAffinity?: Maybe<GcpReservationAffinity>;
  resourcePolicies?: Maybe<Array<Maybe<Scalars['String']>>>;
  satisfiesPzs?: Maybe<Scalars['Boolean']>;
  scheduling?: Maybe<GcpScheduling>;
  selfLink?: Maybe<Scalars['String']>;
  serviceAccounts?: Maybe<Array<Maybe<GcpServiceAccount>>>;
  shieldedInstanceConfig?: Maybe<GcpShieldedInstanceConfig>;
  shieldedInstanceIntegrityPolicy?: Maybe<GcpShieldedInstanceIntegrityPolicy>;
  startRestricted?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  tags?: Maybe<GcpComputeTags>;
  zone?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
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
