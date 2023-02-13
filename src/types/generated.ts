export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  acceleratorCount?: Maybe<Scalars['Int']>;
  acceleratorType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type GcpAccessApproval = GcpBaseResource & {
  approve?: Maybe<GcpAccessApprovalApprove>;
  dismiss?: Maybe<GcpAccessApprovalDismiss>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  requestTime?: Maybe<Scalars['String']>;
  requestedExpiration?: Maybe<Scalars['String']>;
  requestedLocations?: Maybe<GcpAccessApprovalRequestedLocations>;
  requestedReason?: Maybe<GcpAccessApprovalRequestedReason>;
  requestedResourceName?: Maybe<Scalars['String']>;
  requestedResourceProperties?: Maybe<GcpAccessApprovalRequestedResourceProperties>;
};

export type GcpAccessApprovalApprove = {
  approveTime?: Maybe<Scalars['String']>;
  autoApproved?: Maybe<Scalars['Boolean']>;
  expireTime?: Maybe<Scalars['String']>;
  invalidateTime?: Maybe<Scalars['String']>;
  signatureInfo?: Maybe<GcpAccessApprovalApproveSignatureInfo>;
};

export type GcpAccessApprovalApproveSignatureInfo = {
  customerKmsKeyVersion?: Maybe<Scalars['String']>;
  googlePublicKeyPem?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
};

export type GcpAccessApprovalDismiss = {
  dismissTime?: Maybe<Scalars['String']>;
  implicit?: Maybe<Scalars['Boolean']>;
};

export type GcpAccessApprovalRequestedLocations = {
  principalOfficeCountry?: Maybe<Scalars['String']>;
  principalPhysicalLocationCountry?: Maybe<Scalars['String']>;
};

export type GcpAccessApprovalRequestedReason = {
  detail?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpAccessApprovalRequestedResourceProperties = {
  excludesDescendants?: Maybe<Scalars['Boolean']>;
};

export type GcpAdvancedMachineFeatures = {
  enableNestedVirtualization?: Maybe<Scalars['Boolean']>;
  threadsPerCore?: Maybe<Scalars['Int']>;
};

export type GcpAiPlatformNotebook = GcpBaseResource & {
  acceleratorConfigCoreCount?: Maybe<Scalars['String']>;
  acceleratorConfigType?: Maybe<Scalars['String']>;
  bootDiskSizeGb?: Maybe<Scalars['String']>;
  bootDiskType?: Maybe<Scalars['String']>;
  containerImageRepository?: Maybe<Scalars['String']>;
  containerImageTag?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  customGpuDriverPath?: Maybe<Scalars['String']>;
  dataDiskSizeGb?: Maybe<Scalars['String']>;
  dataDiskType?: Maybe<Scalars['String']>;
  diskEncryption?: Maybe<Scalars['String']>;
  installGpuDriver?: Maybe<Scalars['Boolean']>;
  instanceOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  kmsCryptoKeys?: Maybe<Array<Maybe<GcpKmsCryptoKey>>>;
  machineType?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<GcpKeyValue>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  noProxyAccess?: Maybe<Scalars['Boolean']>;
  noPublicIp?: Maybe<Scalars['Boolean']>;
  noRemoveDataDisk?: Maybe<Scalars['Boolean']>;
  postStartupScript?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  proxyUri?: Maybe<Scalars['String']>;
  serviceAccount?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
  updateTime?: Maybe<Scalars['String']>;
  vmImageImageFamily?: Maybe<Scalars['String']>;
  vmImageImageName?: Maybe<Scalars['String']>;
  vmImageProject?: Maybe<Scalars['String']>;
};

export type GcpAiPlatformNotebookDisk = {
  autoDelete?: Maybe<Scalars['Boolean']>;
  boot?: Maybe<Scalars['Boolean']>;
  deviceName?: Maybe<Scalars['String']>;
  diskSizeGb?: Maybe<Scalars['String']>;
  guestOsFeaturesTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  index?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  licenses?: Maybe<Array<Maybe<Scalars['String']>>>;
  mode?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpAlertPolicy = GcpBaseResource & {
  combiner?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<Maybe<GcpAlertPolicyCondition>>>;
  creationRecord?: Maybe<GcpAlertPolicyMutationRecord>;
  displayName?: Maybe<Scalars['String']>;
  documentation?: Maybe<GcpAlertPolicyDocumentation>;
  enabled?: Maybe<GcpBoolValue>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  mutationRecord?: Maybe<GcpAlertPolicyMutationRecord>;
  notificationChannels?: Maybe<Array<Maybe<Scalars['String']>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  validity?: Maybe<GcpRpcStatus>;
};

export type GcpAlertPolicyAggregation = {
  alignmentPeriod?: Maybe<GcpDuration>;
  crossSeriesReducer?: Maybe<Scalars['String']>;
  groupByFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  perSeriesAligner?: Maybe<Scalars['String']>;
};

export type GcpAlertPolicyCondition = {
  conditionAbsent?: Maybe<GcpAlertPolicyMetricAbsence>;
  conditionMonitoringQueryLanguage?: Maybe<GcpAlertPolicyMonitoringQueryLanguageCondition>;
  conditionThreshold?: Maybe<GcpAlertPolicyMetricThreshold>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type GcpAlertPolicyDocumentation = {
  content?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
};

export type GcpAlertPolicyMetricAbsence = {
  aggregations?: Maybe<Array<Maybe<GcpAlertPolicyAggregation>>>;
  duration?: Maybe<GcpDuration>;
  filter?: Maybe<Scalars['String']>;
  trigger?: Maybe<GcpAlertPolicyTrigger>;
};

export type GcpAlertPolicyMetricThreshold = {
  aggregations?: Maybe<Array<Maybe<GcpAlertPolicyAggregation>>>;
  comparison?: Maybe<Scalars['String']>;
  denominatorAggregations?: Maybe<Array<Maybe<GcpAlertPolicyAggregation>>>;
  denominatorFilter?: Maybe<Scalars['String']>;
  duration?: Maybe<GcpDuration>;
  filter?: Maybe<Scalars['String']>;
  thresholdValue?: Maybe<Scalars['Float']>;
  trigger?: Maybe<GcpAlertPolicyTrigger>;
};

export type GcpAlertPolicyMonitoringQueryLanguageCondition = {
  duration?: Maybe<GcpDuration>;
  query?: Maybe<Scalars['String']>;
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

export type GcpApiGatewayApi = GcpBaseResource & {
  apiGatewayGateways?: Maybe<Array<Maybe<GcpApiGatewayGateway>>>;
  createTime?: Maybe<Scalars['String']>;
  managedService?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  state?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpApiGatewayApiConfig = GcpBaseResource & {
  apiGatewayGateways?: Maybe<Array<Maybe<GcpApiGatewayGateway>>>;
  createTime?: Maybe<Scalars['String']>;
  gatewayServiceAccount?: Maybe<Scalars['String']>;
  grpcServices?: Maybe<Array<Maybe<GcpApiGatewayConfigGrpcServiceDefinition>>>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  managedServiceConfigs?: Maybe<Array<Maybe<Scalars['String']>>>;
  openapiDocuments?: Maybe<Array<Maybe<Scalars['String']>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  serviceConfigId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpApiGatewayConfigGrpcServiceDefinition = {
  fileDescriptorSet?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  source?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpApiGatewayGateway = GcpBaseResource & {
  apiGatewayApiConfigs?: Maybe<Array<Maybe<GcpApiGatewayApiConfig>>>;
  apiGatewayApis?: Maybe<Array<Maybe<GcpApiGatewayApi>>>;
  createTime?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  state?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpApiKey = GcpBaseResource & {
  createTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  keyString?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  restrictions?: Maybe<GcpApiKeyRestrictions>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpApiKeyAndroidApplication = {
  id: Scalars['String'];
  packageName?: Maybe<Scalars['String']>;
  sha1Fingerprint?: Maybe<Scalars['String']>;
};

export type GcpApiKeyAndroidKeyRestrictions = {
  allowedApplications?: Maybe<Array<Maybe<GcpApiKeyAndroidApplication>>>;
};

export type GcpApiKeyApiTarget = {
  id: Scalars['String'];
  methods?: Maybe<Array<Maybe<Scalars['String']>>>;
  service?: Maybe<Scalars['String']>;
};

export type GcpApiKeyBrowserKeyRestrictions = {
  allowedReferrers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpApiKeyIosKeyRestrictions = {
  allowedBundleIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpApiKeyRestrictions = {
  androidKeyRestrictions?: Maybe<GcpApiKeyAndroidKeyRestrictions>;
  apiTargets?: Maybe<Array<Maybe<GcpApiKeyApiTarget>>>;
  browserKeyRestrictions?: Maybe<GcpApiKeyBrowserKeyRestrictions>;
  iosKeyRestrictions?: Maybe<GcpApiKeyIosKeyRestrictions>;
  serverKeyRestrictions?: Maybe<GcpApiKeyServerKeyRestrictions>;
};

export type GcpApiKeyServerKeyRestrictions = {
  allowedIps?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpAsset = GcpBaseResource & {
  accessLevel?: Maybe<GcpAssetAccessLevel>;
  accessPolicy?: Maybe<GcpAssetAccessPolicy>;
  ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  assetType?: Maybe<Scalars['String']>;
  orgPolicy?: Maybe<Array<Maybe<GcpAssetOrgPolicy>>>;
  osInventory?: Maybe<GcpAssetInventory>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  relatedAssets?: Maybe<GcpAssetRelatedAssets>;
  resource?: Maybe<GcpAssetResource>;
  servicePerimeter?: Maybe<GcpAssetServicePerimeter>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpAssetAccessLevel = {
  basic?: Maybe<GcpAssetBasicLevel>;
  createTime?: Maybe<Scalars['String']>;
  custom?: Maybe<GcpAssetCustomLevel>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpAssetAccessPolicy = {
  createTime?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpAssetBasicLevel = {
  combiningFunction?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<Maybe<GcpAssetCondition>>>;
};

export type GcpAssetBooleanPolicy = {
  enforced?: Maybe<Scalars['Boolean']>;
};

export type GcpAssetCondition = {
  devicePolicy?: Maybe<GcpAssetDevicePolicy>;
  id: Scalars['String'];
  ipSubnetworks?: Maybe<Array<Maybe<Scalars['String']>>>;
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
  negate?: Maybe<Scalars['Boolean']>;
  regions?: Maybe<Array<Maybe<Scalars['String']>>>;
  requiredAccessLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpAssetCustomLevel = {
  expr?: Maybe<GcpExpr>;
};

export type GcpAssetDevicePolicy = {
  allowedDeviceManagementLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
  allowedEncryptionStatuses?: Maybe<Array<Maybe<Scalars['String']>>>;
  osConstraints?: Maybe<Array<Maybe<GcpAssetOsConstraint>>>;
  requireAdminApproval?: Maybe<Scalars['Boolean']>;
  requireCorpOwned?: Maybe<Scalars['Boolean']>;
  requireScreenlock?: Maybe<Scalars['Boolean']>;
};

export type GcpAssetInventory = {
  items?: Maybe<Array<Maybe<GcpAssetItem>>>;
  name?: Maybe<Scalars['String']>;
  osInfo?: Maybe<GcpAssetOsInfo>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpAssetItem = {
  availablePackage?: Maybe<GcpAssetSoftwarePackage>;
  createTime?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  installedPackage?: Maybe<GcpAssetSoftwarePackage>;
  key: Scalars['String'];
  originType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpAssetListPolicy = {
  allValues?: Maybe<Scalars['String']>;
  allowedValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  deniedValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  inheritFromParent?: Maybe<Scalars['Boolean']>;
  suggestedValue?: Maybe<Scalars['String']>;
};

export type GcpAssetOrgPolicy = {
  booleanPolicy?: Maybe<GcpAssetBooleanPolicy>;
  constraint?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  listPolicy?: Maybe<GcpAssetListPolicy>;
  updateTime?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type GcpAssetOsConstraint = {
  id: Scalars['String'];
  minimumVersion?: Maybe<Scalars['String']>;
  osType?: Maybe<Scalars['String']>;
  requireVerifiedChromeOs?: Maybe<Scalars['Boolean']>;
};

export type GcpAssetOsInfo = {
  architecture?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  kernelRelease?: Maybe<Scalars['String']>;
  kernelVersion?: Maybe<Scalars['String']>;
  longName?: Maybe<Scalars['String']>;
  osconfigAgentVersion?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type GcpAssetRelatedAsset = {
  ancestors?: Maybe<Array<Maybe<Scalars['String']>>>;
  asset?: Maybe<Scalars['String']>;
  assetType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type GcpAssetRelatedAssets = {
  assets?: Maybe<Array<Maybe<GcpAssetRelatedAsset>>>;
  relationshipAttributes?: Maybe<GcpAssetRelationshipAttributes>;
};

export type GcpAssetRelationshipAttributes = {
  action?: Maybe<Scalars['String']>;
  sourceResourceType?: Maybe<Scalars['String']>;
  targetResourceType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpAssetResource = {
  data?: Maybe<GcpStruct>;
  discoveryDocumentUri?: Maybe<Scalars['String']>;
  discoveryName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  resourceUrl?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type GcpAssetServicePerimeter = {
  createTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  perimeterType?: Maybe<Scalars['String']>;
  spec?: Maybe<GcpAssetServicePerimeterConfig>;
  status?: Maybe<GcpAssetServicePerimeterConfig>;
  title?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  useExplicitDryRunSpec?: Maybe<Scalars['Boolean']>;
};

export type GcpAssetServicePerimeterConfig = {
  accessLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
  resources?: Maybe<Array<Maybe<Scalars['String']>>>;
  restrictedServices?: Maybe<Array<Maybe<Scalars['String']>>>;
  vpcAccessibleServices?: Maybe<GcpAssetVpcAccessibleServices>;
};

export type GcpAssetSoftwarePackage = {
  aptPackage?: Maybe<GcpAssetVersionedPackage>;
  cosPackage?: Maybe<GcpAssetVersionedPackage>;
  googetPackage?: Maybe<GcpAssetVersionedPackage>;
  qfePackage?: Maybe<GcpAssetWindowsQuickFixEngineeringPackage>;
  windowsApplication?: Maybe<GcpAssetWindowsApplication>;
  wuaPackage?: Maybe<GcpAssetWindowsUpdatePackage>;
  yumPackage?: Maybe<GcpAssetVersionedPackage>;
  zypperPackage?: Maybe<GcpAssetVersionedPackage>;
  zypperPatch?: Maybe<GcpAssetZypperPatch>;
};

export type GcpAssetVersionedPackage = {
  architecture?: Maybe<Scalars['String']>;
  packageName?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type GcpAssetVpcAccessibleServices = {
  allowedServices?: Maybe<Array<Maybe<Scalars['String']>>>;
  enableRestriction?: Maybe<Scalars['Boolean']>;
};

export type GcpAssetWindowsApplication = {
  displayName?: Maybe<Scalars['String']>;
  displayVersion?: Maybe<Scalars['String']>;
  helpLink?: Maybe<Scalars['String']>;
  installDate?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
};

export type GcpAssetWindowsQuickFixEngineeringPackage = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hotFixId?: Maybe<Scalars['String']>;
  installTime?: Maybe<Scalars['String']>;
};

export type GcpAssetWindowsUpdateCategory = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type GcpAssetWindowsUpdatePackage = {
  categories?: Maybe<Array<Maybe<GcpAssetWindowsUpdateCategory>>>;
  description?: Maybe<Scalars['String']>;
  kbArticleIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastDeploymentChangeTime?: Maybe<Scalars['String']>;
  moreInfoUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  revisionNumber?: Maybe<Scalars['Int']>;
  supportUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updateId?: Maybe<Scalars['String']>;
};

export type GcpAssetZypperPatch = {
  category?: Maybe<Scalars['String']>;
  patchName?: Maybe<Scalars['String']>;
  severity?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
};

export type GcpAttachedDisk = {
  autoDelete?: Maybe<Scalars['Boolean']>;
  boot?: Maybe<Scalars['Boolean']>;
  deviceName?: Maybe<Scalars['String']>;
  diskEncryptionKey?: Maybe<GcpCustomerEncryptionKey>;
  diskSizeGb?: Maybe<Scalars['String']>;
  guestOsFeatures?: Maybe<Array<Maybe<GcpGuestOsFeature>>>;
  id: Scalars['String'];
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
  kind?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  name?: Maybe<Scalars['String']>;
  projectId: Scalars['String'];
  region?: Maybe<Scalars['String']>;
};

export type GcpBigQueryConnection = GcpBaseResource & {
  awsAccessRoleIamRoleId?: Maybe<Scalars['String']>;
  awsAccessRoleIdentity?: Maybe<Scalars['String']>;
  awsCrossAccountRoleExternalId?: Maybe<Scalars['String']>;
  awsCrossAccountRoleIamRoleId?: Maybe<Scalars['String']>;
  awsCrossAccountRoleIamUserId?: Maybe<Scalars['String']>;
  cloudSpannerDatabase?: Maybe<Scalars['String']>;
  cloudSpannerUseParallelism?: Maybe<Scalars['Boolean']>;
  cloudSqlDatabase?: Maybe<Scalars['String']>;
  cloudSqlInstanceId?: Maybe<Scalars['String']>;
  cloudSqlType?: Maybe<Scalars['String']>;
  creationTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  friendlyName?: Maybe<Scalars['String']>;
  hasCredential?: Maybe<Scalars['Boolean']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpBigQueryDataTransfer = GcpBaseResource & {
  dataRefreshWindowDays?: Maybe<Scalars['Int']>;
  dataSourceId?: Maybe<Scalars['String']>;
  datasetRegion?: Maybe<Scalars['String']>;
  destinationDatasetId?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  displayName?: Maybe<Scalars['String']>;
  enableFailureEmail?: Maybe<Scalars['Boolean']>;
  nextRunTime?: Maybe<Scalars['String']>;
  notificationPubsubTopic?: Maybe<Scalars['String']>;
  paramFields?: Maybe<Array<Maybe<GcpBigQueryDataTransferParam>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  schedule?: Maybe<Scalars['String']>;
  scheduleOptionsDisableAutoScheduling?: Maybe<Scalars['Boolean']>;
  scheduleOptionsEndTime?: Maybe<Scalars['String']>;
  scheduleOptionsStartTime?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  transferRuns?: Maybe<Array<Maybe<GcpBigQueryDataTransferRun>>>;
  updateTime?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type GcpBigQueryDataTransferParam = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpBigQueryDataTransferRun = GcpBaseResource & {
  dataSourceId?: Maybe<Scalars['String']>;
  dataTransfer?: Maybe<Array<Maybe<GcpBigQueryDataTransfer>>>;
  dataTransferId?: Maybe<Scalars['String']>;
  destinationDatasetId?: Maybe<Scalars['String']>;
  enableFailureEmail?: Maybe<Scalars['Boolean']>;
  endTime?: Maybe<Scalars['String']>;
  errorStatusCode?: Maybe<Scalars['Int']>;
  errorStatusDetails?: Maybe<Array<Maybe<GcpBigQueryDataTransferRunErrorStatusDetail>>>;
  errorStatusMessage?: Maybe<Scalars['String']>;
  notificationPubsubTopic?: Maybe<Scalars['String']>;
  paramFields?: Maybe<Array<Maybe<GcpBigQueryDataTransferParam>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  runTime?: Maybe<Scalars['String']>;
  schedule?: Maybe<Scalars['String']>;
  scheduleTime?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type GcpBigQueryDataTransferRunErrorStatusDetail = {
  id: Scalars['String'];
  typeUrl?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpBigQueryDataset = GcpBaseResource & {
  access?: Maybe<Array<Maybe<GcpBigQueryDatasetAccess>>>;
  creationTime?: Maybe<Scalars['String']>;
  datasetReference?: Maybe<GcpBigQueryDatasetReference>;
  defaultEncryptionConfiguration?: Maybe<GcpBigQueryEncryptionConfiguration>;
  defaultPartitionExpirationMs?: Maybe<Scalars['String']>;
  defaultTableExpirationMs?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  friendlyName?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  satisfiesPzs?: Maybe<Scalars['Boolean']>;
  selfLink?: Maybe<Scalars['String']>;
  tables?: Maybe<Array<Maybe<GcpBigQueryTable>>>;
};

export type GcpBigQueryDatasetAccess = {
  dataset?: Maybe<GcpBigQueryFeedbackDatasetAccessEntry>;
  domain?: Maybe<Scalars['String']>;
  groupByEmail?: Maybe<Scalars['String']>;
  iamMember?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  role?: Maybe<Scalars['String']>;
  routine?: Maybe<GcpBigQueryRoutineReference>;
  specialGroup?: Maybe<Scalars['String']>;
  userByEmail?: Maybe<Scalars['String']>;
  view?: Maybe<GcpBigQueryTableReference>;
};

export type GcpBigQueryDatasetReference = {
  datasetId?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
};

export type GcpBigQueryEncryptionConfiguration = {
  kmsKeyName?: Maybe<Scalars['String']>;
};

export type GcpBigQueryFeedbackDatasetAccessEntry = {
  dataset?: Maybe<GcpBigQueryDatasetReference>;
  targetTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpBigQueryOptions = {
  usePartitionedTables?: Maybe<Scalars['Boolean']>;
  usesTimestampColumnPartitioning?: Maybe<Scalars['Boolean']>;
};

export type GcpBigQueryReservation = GcpBaseResource & {
  creationTime?: Maybe<Scalars['String']>;
  ignoreIdleSlots?: Maybe<Scalars['Boolean']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  slotCapacity?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpBigQueryReservationCapacityCommitment = GcpBaseResource & {
  commitmentEndTime?: Maybe<Scalars['String']>;
  commitmentStartTime?: Maybe<Scalars['String']>;
  failureStatusCode?: Maybe<Scalars['Int']>;
  failureStatusDetails?: Maybe<Array<Maybe<GcpBigQueryReservationCapacityCommitmentFailureStatusDetail>>>;
  failureStatusMessage?: Maybe<Scalars['String']>;
  plan?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  renewalPlan?: Maybe<Scalars['String']>;
  slotCount?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type GcpBigQueryReservationCapacityCommitmentFailureStatusDetail = {
  id: Scalars['String'];
  typeUrl?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpBigQueryRoutineReference = {
  datasetId?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  routineId?: Maybe<Scalars['String']>;
};

export type GcpBigQueryTable = GcpBaseResource & {
  clusteringFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  creationTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  encryptionConfigurationKmsKeyName?: Maybe<Scalars['String']>;
  expirationTime?: Maybe<Scalars['String']>;
  externalDataConfigurationAutodetect?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationAvroOptionsUseAvroLogicalTypes?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationBigtableOptionsColumnFamilies?: Maybe<Array<Maybe<GcpBigQueryTableExternalDataConfigurationBigtableOptionColumnFamily>>>;
  externalDataConfigurationBigtableOptionsIgnoreUnspecifiedColumnFamilies?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationBigtableOptionsReadRowkeyAsString?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationCompression?: Maybe<Scalars['String']>;
  externalDataConfigurationConnectionId?: Maybe<Scalars['String']>;
  externalDataConfigurationCsvOptionsAllowJaggedRows?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationCsvOptionsAllowQuotedNewlines?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationCsvOptionsEncoding?: Maybe<Scalars['String']>;
  externalDataConfigurationCsvOptionsFieldDelimiter?: Maybe<Scalars['String']>;
  externalDataConfigurationCsvOptionsQuote?: Maybe<Scalars['String']>;
  externalDataConfigurationCsvOptionsSkipLeadingRows?: Maybe<Scalars['String']>;
  externalDataConfigurationDecimalTargetTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  externalDataConfigurationGoogleSheetsOptionsRange?: Maybe<Scalars['String']>;
  externalDataConfigurationGoogleSheetsOptionsSkipLeadingRows?: Maybe<Scalars['String']>;
  externalDataConfigurationHivePartitioningOptionsFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  externalDataConfigurationHivePartitioningOptionsMode?: Maybe<Scalars['String']>;
  externalDataConfigurationHivePartitioningOptionsRequirePartitionFilter?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationHivePartitioningOptionsSourceUriPrefix?: Maybe<Scalars['String']>;
  externalDataConfigurationIgnoreUnknownValues?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationMaxBadRecords?: Maybe<Scalars['Int']>;
  externalDataConfigurationParquetOptionsEnableListInference?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationParquetOptionsEnumAsString?: Maybe<Scalars['Boolean']>;
  externalDataConfigurationSchemaFields?: Maybe<Array<Maybe<GcpBigQueryTableSchemaField>>>;
  externalDataConfigurationSourceFormat?: Maybe<Scalars['String']>;
  externalDataConfigurationSourceUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  friendlyName?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  materializedViewEnableRefresh?: Maybe<Scalars['Boolean']>;
  materializedViewLastRefreshTime?: Maybe<Scalars['String']>;
  materializedViewQuery?: Maybe<Scalars['String']>;
  materializedViewRefreshIntervalMs?: Maybe<Scalars['String']>;
  numBytes?: Maybe<Scalars['String']>;
  numLongTermBytes?: Maybe<Scalars['String']>;
  numRows?: Maybe<Scalars['String']>;
  rangePartitioningField?: Maybe<Scalars['String']>;
  rangePartitioningRangeEnd?: Maybe<Scalars['String']>;
  rangePartitioningRangeInterval?: Maybe<Scalars['String']>;
  rangePartitioningRangeStart?: Maybe<Scalars['String']>;
  requirePartitionFilter?: Maybe<Scalars['Boolean']>;
  schemaFields?: Maybe<Array<Maybe<GcpBigQueryTableSchemaField>>>;
  snapshotDefinitionBaseTableReferenceDatasetId?: Maybe<Scalars['String']>;
  snapshotDefinitionBaseTableReferenceProjectId?: Maybe<Scalars['String']>;
  snapshotDefinitionBaseTableReferenceTableId?: Maybe<Scalars['String']>;
  snapshotDefinitionSnapshotTime?: Maybe<Scalars['String']>;
  streamingBufferEstimatedBytes?: Maybe<Scalars['String']>;
  streamingBufferEstimatedRows?: Maybe<Scalars['String']>;
  streamingBufferOldestEntryTime?: Maybe<Scalars['String']>;
  timePartitioningExpirationMs?: Maybe<Scalars['String']>;
  timePartitioningField?: Maybe<Scalars['String']>;
  timePartitioningRequirePartitionFilter?: Maybe<Scalars['Boolean']>;
  timePartitioningType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  viewQuery?: Maybe<Scalars['String']>;
  viewUseLegacySql?: Maybe<Scalars['Boolean']>;
  viewUserDefinedFunctionResources?: Maybe<Array<Maybe<GcpBigQueryTableViewUserDefinedFunctionResource>>>;
};

export type GcpBigQueryTableExternalDataConfigurationBigtableOptionColumnFamily = {
  columns?: Maybe<Array<Maybe<GcpBigQueryTableExternalDataConfigurationBigtableOptionColumnFamilyColumn>>>;
  encoding?: Maybe<Scalars['String']>;
  familyId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  onlyReadLatest?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpBigQueryTableExternalDataConfigurationBigtableOptionColumnFamilyColumn = {
  encoding?: Maybe<Scalars['String']>;
  fieldName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  onlyReadLatest?: Maybe<Scalars['Boolean']>;
  qualifierEncoded?: Maybe<Scalars['String']>;
  qualifierString?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpBigQueryTableReference = {
  datasetId?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  tableId?: Maybe<Scalars['String']>;
};

export type GcpBigQueryTableSchemaField = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  maxLength?: Maybe<Scalars['String']>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  policyTagsNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  precision?: Maybe<Scalars['String']>;
  scale?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpBigQueryTableViewUserDefinedFunctionResource = {
  id: Scalars['String'];
  inlineCode?: Maybe<Scalars['String']>;
  resourceUri?: Maybe<Scalars['String']>;
};

export type GcpBilling = GcpBaseResource & {
  last30Days?: Maybe<Array<Maybe<GcpServiceBillingInfo>>>;
  last30DaysDailyAverage?: Maybe<Array<Maybe<GcpServiceBillingInfo>>>;
  monthToDate?: Maybe<Array<Maybe<GcpServiceBillingInfo>>>;
  monthToDateDailyAverage?: Maybe<Array<Maybe<GcpServiceBillingInfo>>>;
  region?: Maybe<Scalars['String']>;
  totalCostLast30Days?: Maybe<GcpTotalBillingInfo>;
  totalCostMonthToDate?: Maybe<GcpTotalBillingInfo>;
};

export type GcpBoolValue = {
  value?: Maybe<Scalars['Boolean']>;
};

export type GcpCdnBackendBucket = GcpBaseResource & {
  bucketName?: Maybe<Scalars['String']>;
  cdnPolicy?: Maybe<GcpCdnBackendBucketCdnPolicy>;
  cdnUrlMap?: Maybe<Array<Maybe<GcpCdnUrlMap>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  customResponseHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  enableCdn?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  selfLink?: Maybe<Scalars['String']>;
};

export type GcpCdnBackendBucketCdnPolicy = {
  bypassCacheOnRequestHeaderNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  cacheMode?: Maybe<Scalars['String']>;
  clientTtl?: Maybe<Scalars['Int']>;
  defaultTtl?: Maybe<Scalars['Int']>;
  maxTtl?: Maybe<Scalars['Int']>;
  negativeCaching?: Maybe<Scalars['Boolean']>;
  negativeCachingPolicy?: Maybe<Array<Maybe<GcpCdnBackendBucketCdnPolicyNegativeCachingPolicy>>>;
  requestCoalescing?: Maybe<Scalars['Boolean']>;
  serveWhileStale?: Maybe<Scalars['Int']>;
  signedUrlCacheMaxAgeSec?: Maybe<Scalars['String']>;
  signedUrlKeyNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpCdnBackendBucketCdnPolicyNegativeCachingPolicy = {
  code?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  ttl?: Maybe<Scalars['Int']>;
};

export type GcpCdnBackendService = GcpBaseResource & {
  affinityCookieTtlSec?: Maybe<Scalars['Int']>;
  backends?: Maybe<Array<Maybe<GcpCdnBackendServiceBackend>>>;
  cdnPolicy?: Maybe<GcpCdnBackendServiceCdnPolicy>;
  cdnUrlMap?: Maybe<Array<Maybe<GcpCdnUrlMap>>>;
  circuitBreakersMaxConnections?: Maybe<Scalars['Int']>;
  circuitBreakersMaxPendingRequests?: Maybe<Scalars['Int']>;
  circuitBreakersMaxRequests?: Maybe<Scalars['Int']>;
  circuitBreakersMaxRequestsPerConnection?: Maybe<Scalars['Int']>;
  circuitBreakersMaxRetries?: Maybe<Scalars['Int']>;
  connectionDrainingTimeoutSec?: Maybe<Scalars['Int']>;
  consistentHashLoadBalancerSettingHttpCookie?: Maybe<Scalars['String']>;
  consistentHashLoadBalancerSettingHttpCookieName?: Maybe<Scalars['String']>;
  consistentHashLoadBalancerSettingHttpCookiePath?: Maybe<Scalars['String']>;
  consistentHashLoadBalancerSettingHttpHeaderName?: Maybe<Scalars['String']>;
  consistentHashLoadBalancerSettingMinimumRingSize?: Maybe<Scalars['String']>;
  creationTimestamp?: Maybe<Scalars['String']>;
  customRequestHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  customResponseHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  enableCDN?: Maybe<Scalars['Boolean']>;
  failoverPolicyDisableConnectionDrainOnFailover?: Maybe<Scalars['Boolean']>;
  failoverPolicyDropTrafficIfUnhealthy?: Maybe<Scalars['Boolean']>;
  failoverPolicyFailoverRatio?: Maybe<Scalars['Float']>;
  fingerprint?: Maybe<Scalars['String']>;
  healthChecks?: Maybe<Array<Maybe<Scalars['String']>>>;
  iapEnabled?: Maybe<Scalars['Boolean']>;
  iapOauth2ClientId?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  loadBalancingScheme?: Maybe<Scalars['String']>;
  localityLbPolicy?: Maybe<Scalars['String']>;
  logConfigEnable?: Maybe<Scalars['Boolean']>;
  logConfigSampleRate?: Maybe<Scalars['Float']>;
  maxStreamDuration?: Maybe<Scalars['String']>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  outlierDetection?: Maybe<GcpCdnBackendServiceOutlierDetection>;
  port?: Maybe<Scalars['Int']>;
  portName?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  protocol?: Maybe<Scalars['String']>;
  securityPolicy?: Maybe<Scalars['String']>;
  securitySettingClientTlsPolicy?: Maybe<Scalars['String']>;
  securitySettingSubjectAltNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  selfLink?: Maybe<Scalars['String']>;
  sessionAffinity?: Maybe<Scalars['String']>;
  timeoutSec?: Maybe<Scalars['Int']>;
};

export type GcpCdnBackendServiceBackend = {
  balancingMode?: Maybe<Scalars['String']>;
  capacityScaler?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  failover?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  maxConnections?: Maybe<Scalars['Int']>;
  maxConnectionsPerEndpoint?: Maybe<Scalars['Int']>;
  maxConnectionsPerInstance?: Maybe<Scalars['Int']>;
  maxRate?: Maybe<Scalars['Int']>;
  maxRatePerEndpoint?: Maybe<Scalars['Float']>;
  maxRatePerInstance?: Maybe<Scalars['Float']>;
  maxUtilization?: Maybe<Scalars['Float']>;
};

export type GcpCdnBackendServiceCdnPolicy = {
  bypassCacheOnRequestHeaderNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  cacheKeyPolicyIncludeHost?: Maybe<Scalars['Boolean']>;
  cacheKeyPolicyIncludeProtocol?: Maybe<Scalars['Boolean']>;
  cacheKeyPolicyIncludeQueryString?: Maybe<Scalars['Boolean']>;
  cacheKeyPolicyQueryStringBlacklist?: Maybe<Array<Maybe<Scalars['String']>>>;
  cacheKeyPolicyQueryStringWhitelist?: Maybe<Array<Maybe<Scalars['String']>>>;
  cacheMode?: Maybe<Scalars['String']>;
  clientTtl?: Maybe<Scalars['Int']>;
  defaultTtl?: Maybe<Scalars['Int']>;
  maxTtl?: Maybe<Scalars['Int']>;
  negativeCaching?: Maybe<Scalars['Boolean']>;
  negativeCachingPolicy?: Maybe<Array<Maybe<GcpCdnBackendServiceCdnPolicyNegativeCachingPolicy>>>;
  requestCoalescing?: Maybe<Scalars['Boolean']>;
  serveWhileStale?: Maybe<Scalars['Int']>;
  signedUrlCacheMaxAgeSec?: Maybe<Scalars['String']>;
  signedUrlKeyNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpCdnBackendServiceCdnPolicyNegativeCachingPolicy = {
  code?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  ttl?: Maybe<Scalars['Int']>;
};

export type GcpCdnBackendServiceOutlierDetection = {
  baseEjectionTime?: Maybe<Scalars['String']>;
  consecutiveErrors?: Maybe<Scalars['Int']>;
  consecutiveGatewayFailure?: Maybe<Scalars['Int']>;
  enforcingConsecutiveErrors?: Maybe<Scalars['Int']>;
  enforcingConsecutiveGatewayFailure?: Maybe<Scalars['Int']>;
  enforcingSuccessRate?: Maybe<Scalars['Int']>;
  interval?: Maybe<Scalars['String']>;
  maxEjectionPercent?: Maybe<Scalars['Int']>;
  successRateMinimumHosts?: Maybe<Scalars['Int']>;
  successRateRequestVolume?: Maybe<Scalars['Int']>;
  successRateStdevFactor?: Maybe<Scalars['Int']>;
};

export type GcpCdnUrlMap = GcpBaseResource & {
  cdnBackendBucket?: Maybe<Array<Maybe<GcpCdnBackendBucket>>>;
  cdnBackendService?: Maybe<Array<Maybe<GcpCdnBackendService>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  defaultRouteAction?: Maybe<GcpCdnUrlMapRouteAction>;
  defaultService?: Maybe<Scalars['String']>;
  defaultUrlRedirectHostRedirect?: Maybe<Scalars['String']>;
  defaultUrlRedirectHttpsRedirect?: Maybe<Scalars['Boolean']>;
  defaultUrlRedirectPathRedirect?: Maybe<Scalars['String']>;
  defaultUrlRedirectPrefixRedirect?: Maybe<Scalars['String']>;
  defaultUrlRedirectRedirectResponseCode?: Maybe<Scalars['String']>;
  defaultUrlRedirectStripQuery?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  fingerprint?: Maybe<Scalars['String']>;
  headerActionRequestHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionRequestHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  headerActionResponseHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionResponseHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  hostRules?: Maybe<Array<Maybe<GcpCdnUrlMapHostRule>>>;
  kind?: Maybe<Scalars['String']>;
  pathMatchers?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcher>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  selfLink?: Maybe<Scalars['String']>;
  tests?: Maybe<Array<Maybe<GcpCdnUrlMapTest>>>;
};

export type GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd = {
  headerName?: Maybe<Scalars['String']>;
  headerValue?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  replace?: Maybe<Scalars['Boolean']>;
};

export type GcpCdnUrlMapHostRule = {
  description?: Maybe<Scalars['String']>;
  hosts?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  pathMatcher?: Maybe<Scalars['String']>;
};

export type GcpCdnUrlMapPathMatcher = {
  defaultRouteAction?: Maybe<GcpCdnUrlMapRouteAction>;
  defaultService?: Maybe<Scalars['String']>;
  defaultUrlRedirectHostRedirect?: Maybe<Scalars['String']>;
  defaultUrlRedirectHttpsRedirect?: Maybe<Scalars['Boolean']>;
  defaultUrlRedirectPathRedirect?: Maybe<Scalars['String']>;
  defaultUrlRedirectPrefixRedirect?: Maybe<Scalars['String']>;
  defaultUrlRedirectRedirectResponseCode?: Maybe<Scalars['String']>;
  defaultUrlRedirectStripQuery?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  headerActionRequestHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionRequestHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  headerActionResponseHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionResponseHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  pathRules?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherPathRule>>>;
  routeRules?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherPathRule>>>;
};

export type GcpCdnUrlMapPathMatcherPathRule = {
  id: Scalars['String'];
  paths?: Maybe<Array<Maybe<Scalars['String']>>>;
  routeAction?: Maybe<GcpCdnUrlMapRouteAction>;
  service?: Maybe<Scalars['String']>;
  urlRedirectHostRedirect?: Maybe<Scalars['String']>;
  urlRedirectHttpsRedirect?: Maybe<Scalars['Boolean']>;
  urlRedirectPathRedirect?: Maybe<Scalars['String']>;
  urlRedirectPrefixRedirect?: Maybe<Scalars['String']>;
  urlRedirectRedirectResponseCode?: Maybe<Scalars['String']>;
  urlRedirectStripQuery?: Maybe<Scalars['Boolean']>;
};

export type GcpCdnUrlMapPathMatcherRouteRule = {
  description?: Maybe<Scalars['String']>;
  headerActionRequestHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionRequestHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  headerActionResponseHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionResponseHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  matchRules?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherRouteRuleMatchRule>>>;
  priority?: Maybe<Scalars['Int']>;
  routeAction?: Maybe<GcpCdnUrlMapRouteAction>;
  service?: Maybe<Scalars['String']>;
  urlRedirectHostRedirect?: Maybe<Scalars['String']>;
  urlRedirectHttpsRedirect?: Maybe<Scalars['Boolean']>;
  urlRedirectPathRedirect?: Maybe<Scalars['String']>;
  urlRedirectPrefixRedirect?: Maybe<Scalars['String']>;
  urlRedirectRedirectResponseCode?: Maybe<Scalars['String']>;
  urlRedirectStripQuery?: Maybe<Scalars['Boolean']>;
};

export type GcpCdnUrlMapPathMatcherRouteRuleMatchRule = {
  fullPathMatch?: Maybe<Scalars['String']>;
  headerMatches?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpHeaderMatch>>>;
  id: Scalars['String'];
  ignoreCase?: Maybe<Scalars['Boolean']>;
  metadataFilters?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherRouteRuleMatchRuleMetadataFilter>>>;
  prefixMatch?: Maybe<Scalars['String']>;
  queryParameterMatches?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpQueryParameterMatch>>>;
  regexMatch?: Maybe<Scalars['String']>;
};

export type GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpHeaderMatch = {
  exactMatch?: Maybe<Scalars['String']>;
  headerName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  invertMatch?: Maybe<Scalars['Boolean']>;
  prefixMatch?: Maybe<Scalars['String']>;
  presentMatch?: Maybe<Scalars['Boolean']>;
  rangeMatchEnd?: Maybe<Scalars['String']>;
  rangeMatchStart?: Maybe<Scalars['String']>;
  regexMatch?: Maybe<Scalars['String']>;
  suffixMatch?: Maybe<Scalars['String']>;
};

export type GcpCdnUrlMapPathMatcherRouteRuleMatchRuleHttpQueryParameterMatch = {
  exactMatch?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  presentMatch?: Maybe<Scalars['Boolean']>;
  regexMatch?: Maybe<Scalars['String']>;
};

export type GcpCdnUrlMapPathMatcherRouteRuleMatchRuleMetadataFilter = {
  filterLabels?: Maybe<Array<Maybe<GcpCdnUrlMapPathMatcherRouteRuleMatchRuleMetadataFilterFilterLabel>>>;
  filterMatchCriteria?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type GcpCdnUrlMapPathMatcherRouteRuleMatchRuleMetadataFilterFilterLabel = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpCdnUrlMapRouteAction = {
  corsPolicyAllowCredentials?: Maybe<Scalars['Boolean']>;
  corsPolicyAllowHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  corsPolicyAllowMethods?: Maybe<Array<Maybe<Scalars['String']>>>;
  corsPolicyAllowOriginRegexes?: Maybe<Array<Maybe<Scalars['String']>>>;
  corsPolicyAllowOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  corsPolicyDisabled?: Maybe<Scalars['Boolean']>;
  corsPolicyExposeHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  corsPolicyMaxAge?: Maybe<Scalars['Int']>;
  faultInjectionPolicyAbortHttpStatus?: Maybe<Scalars['Int']>;
  faultInjectionPolicyAbortPercentage?: Maybe<Scalars['Float']>;
  faultInjectionPolicyDelayFixedDelay?: Maybe<Scalars['String']>;
  faultInjectionPolicyDelayPercentage?: Maybe<Scalars['Float']>;
  maxStreamDuration?: Maybe<Scalars['String']>;
  requestMirrorPolicyBackendService?: Maybe<Scalars['String']>;
  retryPolicyNumRetries?: Maybe<Scalars['Int']>;
  retryPolicyPerTryTimeout?: Maybe<Scalars['String']>;
  retryPolicyRetryConditions?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeout?: Maybe<Scalars['String']>;
  urlRewriteHostRewrite?: Maybe<Scalars['String']>;
  urlRewritePathPrefixRewrite?: Maybe<Scalars['String']>;
  weightedBackendServices?: Maybe<Array<Maybe<GcpCdnUrlMapRouteActionWeightedBackendService>>>;
};

export type GcpCdnUrlMapRouteActionWeightedBackendService = {
  backendService?: Maybe<Scalars['String']>;
  headerActionRequestHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionRequestHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  headerActionResponseHeadersToAdd?: Maybe<Array<Maybe<GcpCdnUrlMapDefaultRouteActionWeightedBackendServiceHeadersToAdd>>>;
  headerActionResponseHeadersToRemove?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  weight?: Maybe<Scalars['Int']>;
};

export type GcpCdnUrlMapTest = {
  description?: Maybe<Scalars['String']>;
  expectedOutputUrl?: Maybe<Scalars['String']>;
  expectedRedirectResponseCode?: Maybe<Scalars['Int']>;
  headers?: Maybe<Array<Maybe<GcpCdnUrlMapTestHeader>>>;
  host?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
};

export type GcpCdnUrlMapTestHeader = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpCloudFunction = GcpBaseResource & {
  availableMemoryMb?: Maybe<Scalars['Float']>;
  buildId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  entryPoint?: Maybe<Scalars['String']>;
  environmentVariables?: Maybe<Array<Maybe<GcpItems>>>;
  eventTrigger?: Maybe<GcpCloudFunctionEventTrigger>;
  httpsTrigger?: Maybe<GcpCloudFunctionHttpsTrigger>;
  ingressSettings?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  maxInstances?: Maybe<Scalars['Float']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  runtime?: Maybe<Scalars['String']>;
  serviceAccountEmail?: Maybe<Scalars['String']>;
  sourceArchiveUrl?: Maybe<Scalars['String']>;
  sourceRepository?: Maybe<GcpCloudFunctionSourceRepository>;
  sourceUploadUrl?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  timeout?: Maybe<GcpDuration>;
  updateTime?: Maybe<Scalars['String']>;
  versionId?: Maybe<Scalars['String']>;
  vpcConnectorEgressSettings?: Maybe<Scalars['String']>;
  vpcConnectors?: Maybe<Array<Maybe<GcpVpcConnector>>>;
};

export type GcpCloudFunctionEventTrigger = {
  eventType?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
};

export type GcpCloudFunctionHttpsTrigger = {
  securityLevel?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type GcpCloudFunctionSourceRepository = {
  deployedUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type GcpCloudRouter = GcpBaseResource & {
  bgpAdvertiseMode?: Maybe<Scalars['String']>;
  bgpAdvertisedGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  bgpAdvertisedIpRanges?: Maybe<Array<Maybe<GcpCloudRouterBgpAdvertisedIpRange>>>;
  bgpAsn?: Maybe<Scalars['Int']>;
  bgpPeers?: Maybe<Array<Maybe<GcpCloudRouterBgpPeer>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  encryptedInterconnectRouter?: Maybe<Scalars['Boolean']>;
  interfaces?: Maybe<Array<Maybe<GcpCloudRouterInterface>>>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nats?: Maybe<Array<Maybe<GcpCloudRouterNat>>>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  selfLink?: Maybe<Scalars['String']>;
};

export type GcpCloudRouterBgpAdvertisedIpRange = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  range?: Maybe<Scalars['String']>;
};

export type GcpCloudRouterBgpPeer = {
  advertiseMode?: Maybe<Scalars['String']>;
  advertisedGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  advertisedIpRanges?: Maybe<Array<Maybe<GcpCloudRouterBgpPeerAdvertisedIpRange>>>;
  advertisedRoutePriority?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  interfaceName?: Maybe<Scalars['String']>;
  ipAddress?: Maybe<Scalars['String']>;
  managementType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  peerAsn?: Maybe<Scalars['Int']>;
  peerIpAddress?: Maybe<Scalars['String']>;
};

export type GcpCloudRouterBgpPeerAdvertisedIpRange = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  range?: Maybe<Scalars['String']>;
};

export type GcpCloudRouterInterface = {
  id: Scalars['String'];
  ipRange?: Maybe<Scalars['String']>;
  linkedInterconnectAttachment?: Maybe<Scalars['String']>;
  linkedVpnTunnel?: Maybe<Scalars['String']>;
  managementType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GcpCloudRouterNat = {
  drainNatIps?: Maybe<Array<Maybe<Scalars['String']>>>;
  enableEndpointIndependentMapping?: Maybe<Scalars['Boolean']>;
  icmpIdleTimeoutSec?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  logConfigEnable?: Maybe<Scalars['Boolean']>;
  logConfigFilter?: Maybe<Scalars['String']>;
  minPortsPerVm?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  natIpAllocateOption?: Maybe<Scalars['String']>;
  natIps?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceSubnetworkIpRangesToNat?: Maybe<Scalars['String']>;
  subnetworks?: Maybe<Array<Maybe<GcpCloudRouterSubnetwork>>>;
  tcpEstablishedIdleTimeoutSec?: Maybe<Scalars['Int']>;
  tcpTransitoryIdleTimeoutSec?: Maybe<Scalars['Int']>;
  udpIdleTimeoutSec?: Maybe<Scalars['Int']>;
};

export type GcpCloudRouterSubnetwork = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  secondaryIpRangeNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceIpRangesToNat?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type GcpComputeData = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpComputeItem = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpComputeMetadata = {
  fingerprint?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<GcpComputeItem>>>;
  kind?: Maybe<Scalars['String']>;
};

export type GcpComputeNetworkInterface = {
  accessConfigs?: Maybe<Array<Maybe<GcpComputeAccessConfig>>>;
  aliasIpRanges?: Maybe<Array<Maybe<GcpComputeAliasIpRange>>>;
  fingerprint?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  ipv6Address?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  networkIP?: Maybe<Scalars['String']>;
  nicType?: Maybe<Scalars['String']>;
  subnetwork?: Maybe<Scalars['String']>;
};

export type GcpComputeProject = GcpBaseResource & {
  commonInstanceMetadata?: Maybe<GcpComputeMetadata>;
  creationTimestamp?: Maybe<Scalars['String']>;
  defaultNetworkTier?: Maybe<Scalars['String']>;
  defaultServiceAccount?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  enabledFeatures?: Maybe<Array<Maybe<Scalars['String']>>>;
  kind?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  quotas?: Maybe<Array<Maybe<GcpComputeQuota>>>;
  selfLink?: Maybe<Scalars['String']>;
  usageExportLocation?: Maybe<GcpComputeUsageExportLocation>;
  xpnProjectStatus?: Maybe<Scalars['String']>;
};

export type GcpComputeQuota = {
  id: Scalars['String'];
  limit?: Maybe<Scalars['Float']>;
  metric?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  usage?: Maybe<Scalars['Float']>;
};

export type GcpComputeTags = {
  fingerprint?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpComputeUsageExportLocation = {
  bucketName?: Maybe<Scalars['String']>;
  reportNamePrefix?: Maybe<Scalars['String']>;
};

export type GcpComputeWarnings = {
  code?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Maybe<GcpComputeData>>>;
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
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

export type GcpDataprocAutoscalingPolicy = GcpBaseResource & {
  basicAlgorithmCooldownPeriod?: Maybe<Scalars['String']>;
  basicAlgorithmYarnConfigGracefulDecommissionTimeout?: Maybe<Scalars['String']>;
  basicAlgorithmYarnConfigScaleDownFactor?: Maybe<Scalars['Float']>;
  basicAlgorithmYarnConfigScaleDownMinWorkerFraction?: Maybe<Scalars['Float']>;
  basicAlgorithmYarnConfigScaleUpFactor?: Maybe<Scalars['Float']>;
  basicAlgorithmYarnConfigScaleUpMinWorkerFraction?: Maybe<Scalars['Float']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  secondaryWorkerConfigMaxInstances?: Maybe<Scalars['Int']>;
  secondaryWorkerConfigMinInstances?: Maybe<Scalars['Int']>;
  secondaryWorkerConfigWeight?: Maybe<Scalars['Int']>;
  workerConfigMaxInstances?: Maybe<Scalars['Int']>;
  workerConfigMinInstances?: Maybe<Scalars['Int']>;
  workerConfigWeight?: Maybe<Scalars['Int']>;
};

export type GcpDataprocCluster = GcpBaseResource & {
  config?: Maybe<GcpDataprocClusterConfig>;
  dataprocJobs?: Maybe<Array<Maybe<GcpDataprocJob>>>;
  dataprocWorkflowTemplates?: Maybe<Array<Maybe<GcpDataprocWorkflowTemplate>>>;
  hdfsMetrics?: Maybe<Array<Maybe<GcpDataprocClusterMetric>>>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  status?: Maybe<GcpDataprocClusterStatus>;
  statusHistory?: Maybe<Array<Maybe<GcpDataprocClusterStatus>>>;
  yarnMetrics?: Maybe<Array<Maybe<GcpDataprocClusterMetric>>>;
};

export type GcpDataprocClusterConfig = {
  autoscalingConfigPolicyUri?: Maybe<Scalars['String']>;
  configBucket?: Maybe<Scalars['String']>;
  encryptionConfigGcePdKmsKeyName?: Maybe<Scalars['String']>;
  endpointConfig?: Maybe<GcpDataprocClusterConfigEndpoint>;
  gceClusterConfig?: Maybe<GcpDataprocClusterConfigGceCluster>;
  gkeClusterConfig?: Maybe<GcpDataprocClusterConfigGke>;
  initializationActions?: Maybe<Array<Maybe<GcpDataprocClusterConfigNodeInitializationAction>>>;
  lifecycleConfig?: Maybe<GcpDataprocClusterConfigLifecycleConfig>;
  masterConfig?: Maybe<GcpDataprocClusterConfigInstanceGroup>;
  metastoreMetastoreServiceConfig?: Maybe<Scalars['String']>;
  secondaryWorkerConfig?: Maybe<GcpDataprocClusterConfigInstanceGroup>;
  securityConfig?: Maybe<GcpDataprocClusterConfigSecurity>;
  softwareConfig?: Maybe<GcpDataprocClusterConfigSoftware>;
  tempBucket?: Maybe<Scalars['String']>;
  workerConfig?: Maybe<GcpDataprocClusterConfigInstanceGroup>;
};

export type GcpDataprocClusterConfigEndpoint = {
  enableHttpPortAccess?: Maybe<Scalars['Boolean']>;
  httpPorts?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocClusterConfigGceCluster = {
  confidentialInstanceConfigEnableConfidentialCompute?: Maybe<Scalars['Boolean']>;
  consumeReservationType?: Maybe<Scalars['String']>;
  internalIpOnly?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Array<Maybe<GcpKeyValue>>>;
  networkUri?: Maybe<Scalars['String']>;
  nodeGroupAffinityNodeGroupUri?: Maybe<Scalars['String']>;
  privateIpv6GoogleAccess?: Maybe<Scalars['String']>;
  reservationAffinityKey?: Maybe<Scalars['String']>;
  reservationAffinityValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  serviceAccount?: Maybe<Scalars['String']>;
  serviceAccountScopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  shieldedInstanceConfigEnableIntegrityMonitoring?: Maybe<Scalars['Boolean']>;
  shieldedInstanceConfigEnableSecureBoot?: Maybe<Scalars['Boolean']>;
  shieldedInstanceConfigEnableVtpm?: Maybe<Scalars['Boolean']>;
  subnetworkUri?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  zoneUri?: Maybe<Scalars['String']>;
};

export type GcpDataprocClusterConfigGke = {
  namespacedGkeDeploymentTargetClusterNamespace?: Maybe<Scalars['String']>;
  namespacedGkeDeploymentTargetTargetGkeCluster?: Maybe<Scalars['String']>;
};

export type GcpDataprocClusterConfigInstanceGroup = {
  accelerators?: Maybe<Array<Maybe<GcpDataprocInstanceClusterConfigAccelerator>>>;
  diskConfigBootDiskSizeGb?: Maybe<Scalars['Int']>;
  diskConfigBootDiskType?: Maybe<Scalars['String']>;
  diskConfigNumLocalSsds?: Maybe<Scalars['Int']>;
  imageUri?: Maybe<Scalars['String']>;
  instanceNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  isPreemptible?: Maybe<Scalars['Boolean']>;
  machineTypeUri?: Maybe<Scalars['String']>;
  managedGroupConfigInstanceGroupManagerName?: Maybe<Scalars['String']>;
  managedGroupConfigInstanceTemplateName?: Maybe<Scalars['String']>;
  minCpuPlatform?: Maybe<Scalars['String']>;
  numInstances?: Maybe<Scalars['Int']>;
  preemptibility?: Maybe<Scalars['String']>;
};

export type GcpDataprocClusterConfigLifecycleConfig = {
  autoDeleteTime?: Maybe<Scalars['String']>;
  autoDeleteTtl?: Maybe<Scalars['String']>;
  idleDeleteTtl?: Maybe<Scalars['String']>;
  idleStartTime?: Maybe<Scalars['String']>;
};

export type GcpDataprocClusterConfigNodeInitializationAction = {
  executableFile?: Maybe<Scalars['String']>;
  executionTimeout?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type GcpDataprocClusterConfigSecurity = {
  identityConfigUserServiceAccountMapping?: Maybe<Array<Maybe<GcpKeyValue>>>;
  kerberosConfigCrossRealmTrustAdminServer?: Maybe<Scalars['String']>;
  kerberosConfigCrossRealmTrustKdc?: Maybe<Scalars['String']>;
  kerberosConfigCrossRealmTrustRealm?: Maybe<Scalars['String']>;
  kerberosConfigCrossRealmTrustSharedPasswordUri?: Maybe<Scalars['String']>;
  kerberosConfigEnableKerberos?: Maybe<Scalars['Boolean']>;
  kerberosConfigKdcDbKeyUri?: Maybe<Scalars['String']>;
  kerberosConfigKeyPasswordUri?: Maybe<Scalars['String']>;
  kerberosConfigKeystorePasswordUri?: Maybe<Scalars['String']>;
  kerberosConfigKeystoreUri?: Maybe<Scalars['String']>;
  kerberosConfigKmsKeyUri?: Maybe<Scalars['String']>;
  kerberosConfigRealm?: Maybe<Scalars['String']>;
  kerberosConfigRootPrincipalPasswordUri?: Maybe<Scalars['String']>;
  kerberosConfigTgtLifetimeHours?: Maybe<Scalars['Int']>;
  kerberosConfigTruststorePasswordUri?: Maybe<Scalars['String']>;
  kerberosConfigTruststoreUri?: Maybe<Scalars['String']>;
};

export type GcpDataprocClusterConfigSoftware = {
  imageVersion?: Maybe<Scalars['String']>;
  optionalComponents?: Maybe<Array<Maybe<Scalars['String']>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocClusterMetric = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpDataprocClusterStatus = {
  detail?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  stateStartTime?: Maybe<Scalars['String']>;
  substate?: Maybe<Scalars['String']>;
};

export type GcpDataprocHadoopJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainClass?: Maybe<Scalars['String']>;
  mainJarFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocHiveJob = {
  continueOnFailure?: Maybe<Scalars['Boolean']>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
  scriptVariables?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocInstanceClusterConfigAccelerator = {
  acceleratorCount?: Maybe<Scalars['Int']>;
  acceleratorTypeUri?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type GcpDataprocJob = GcpBaseResource & {
  dataprocClusters?: Maybe<Array<Maybe<GcpDataprocCluster>>>;
  done?: Maybe<Scalars['Boolean']>;
  driverControlFilesUri?: Maybe<Scalars['String']>;
  driverOutputResourceUri?: Maybe<Scalars['String']>;
  hadoopJob?: Maybe<GcpDataprocHadoopJob>;
  hiveJob?: Maybe<GcpDataprocHiveJob>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  pigJob?: Maybe<GcpDataprocPigJob>;
  placementClusterLabels?: Maybe<Array<Maybe<GcpKeyValue>>>;
  placementClusterName?: Maybe<Scalars['String']>;
  placementClusterUuid?: Maybe<Scalars['String']>;
  prestoJob?: Maybe<GcpDataprocPrestoJob>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  pySparkJob?: Maybe<GcpDataprocPySparkJob>;
  schedulingMaxFailuresPerHour?: Maybe<Scalars['Int']>;
  schedulingMaxFailuresTotal?: Maybe<Scalars['Int']>;
  sparkJob?: Maybe<GcpDataprocSparkJob>;
  sparkRJob?: Maybe<GcpDataprocSparkRJob>;
  sparkSqlJob?: Maybe<GcpDataprocSparkSqlJob>;
  status?: Maybe<GcpDataprocJobStatus>;
  statusHistory?: Maybe<Array<Maybe<GcpDataprocJobStatus>>>;
  yarnApplications?: Maybe<Array<Maybe<GcpDataprocJobYarnApplication>>>;
};

export type GcpDataprocJobStatus = {
  details?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  stateStartTime?: Maybe<Scalars['String']>;
  substate?: Maybe<Scalars['String']>;
};

export type GcpDataprocJobYarnApplication = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  progress?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  trackingUrl?: Maybe<Scalars['String']>;
};

export type GcpDataprocPigJob = {
  continueOnFailure?: Maybe<Scalars['Boolean']>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
  scriptVariables?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocPrestoJob = {
  clientTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  continueOnFailure?: Maybe<Scalars['Boolean']>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  outputFormat?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpDataprocPySparkJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainPythonFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  pythonFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpDataprocSparkJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainClass?: Maybe<Scalars['String']>;
  mainJarFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocSparkRJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainRFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocSparkSqlJob = {
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
  scriptVariables?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocWorkflowTemplate = GcpBaseResource & {
  createTime?: Maybe<Scalars['String']>;
  dagTimeout?: Maybe<Scalars['String']>;
  dataprocClusters?: Maybe<Array<Maybe<GcpDataprocCluster>>>;
  jobs?: Maybe<Array<Maybe<GcpDataprocWorkflowTemplateOrderedJob>>>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  parameters?: Maybe<Array<Maybe<GcpDataprocWorkflowTemplateParameter>>>;
  placementClusterSelectorClusterLabels?: Maybe<Array<Maybe<GcpKeyValue>>>;
  placementClusterSelectorZone?: Maybe<Scalars['String']>;
  placementManagedClusterConfig?: Maybe<GcpDataprocClusterConfig>;
  placementManagedClusterLabels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  placementManagedClusterName?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  updateTime?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type GcpDataprocWorkflowTemplateHadoopJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainClass?: Maybe<Scalars['String']>;
  mainJarFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocWorkflowTemplateHiveJob = {
  continueOnFailure?: Maybe<Scalars['Boolean']>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
  scriptVariables?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocWorkflowTemplateOrderedJob = {
  hadoopJob?: Maybe<GcpDataprocWorkflowTemplateHadoopJob>;
  hiveJob?: Maybe<GcpDataprocWorkflowTemplateHiveJob>;
  id: Scalars['String'];
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  pigJob?: Maybe<GcpDataprocWorkflowTemplatePigJob>;
  prerequisiteStepIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  prestoJob?: Maybe<GcpDataprocWorkflowTemplatePrestoJob>;
  pySparkJob?: Maybe<GcpDataprocWorkflowTemplatePySparkJob>;
  schedulingMaxFailuresPerHour?: Maybe<Scalars['Int']>;
  schedulingMaxFailuresTotal?: Maybe<Scalars['Int']>;
  sparkJob?: Maybe<GcpDataprocWorkflowTemplateSparkJob>;
  sparkRJob?: Maybe<GcpDataprocWorkflowTemplateSparkRJob>;
  sparkSqlJob?: Maybe<GcpDataprocWorkflowTemplateSparkSqlJob>;
  stepId?: Maybe<Scalars['String']>;
};

export type GcpDataprocWorkflowTemplateParameter = {
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  validationReges?: Maybe<Array<Maybe<Scalars['String']>>>;
  validationRegexes?: Maybe<Array<Maybe<Scalars['String']>>>;
  validationValues?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpDataprocWorkflowTemplatePigJob = {
  continueOnFailure?: Maybe<Scalars['Boolean']>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
  scriptVariables?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocWorkflowTemplatePrestoJob = {
  clientTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  continueOnFailure?: Maybe<Scalars['Boolean']>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  outputFormat?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpDataprocWorkflowTemplatePySparkJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainPythonFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  pythonFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpDataprocWorkflowTemplateSparkJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainClass?: Maybe<Scalars['String']>;
  mainJarFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocWorkflowTemplateSparkRJob = {
  archiveUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  args?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  mainRFileUri?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDataprocWorkflowTemplateSparkSqlJob = {
  jarFileUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  loggingConfig?: Maybe<Array<Maybe<GcpKeyValue>>>;
  properties?: Maybe<Array<Maybe<GcpKeyValue>>>;
  queryFileUri?: Maybe<Scalars['String']>;
  queryList?: Maybe<Array<Maybe<Scalars['String']>>>;
  scriptVariables?: Maybe<Array<Maybe<GcpKeyValue>>>;
};

export type GcpDisplayDevice = {
  enableDisplay?: Maybe<Scalars['Boolean']>;
};

export type GcpDnsManagedZone = GcpBaseResource & {
  cloudLoggingConfigEnableLogging?: Maybe<Scalars['Boolean']>;
  cloudLoggingConfigKind?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dnsName?: Maybe<Scalars['String']>;
  dnssecConfigDefaultKeySpecs?: Maybe<Array<Maybe<GcpDnsZoneDnssecConfigDefaultKeySpec>>>;
  dnssecConfigKind?: Maybe<Scalars['String']>;
  dnssecConfigNonExistence?: Maybe<Scalars['String']>;
  dnssecConfigState?: Maybe<Scalars['String']>;
  forwardingConfigKind?: Maybe<Scalars['String']>;
  forwardingConfigTargetNameServers?: Maybe<Array<Maybe<GcpDnsZoneForwardingConfigTargetNameServer>>>;
  kind?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  nameServerSet?: Maybe<Scalars['String']>;
  nameServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  peeringConfigKind?: Maybe<Scalars['String']>;
  peeringConfigTargetNetworkDeactivateTime?: Maybe<Scalars['String']>;
  peeringConfigTargetNetworkKind?: Maybe<Scalars['String']>;
  peeringConfigTargetNetworkUrl?: Maybe<Scalars['String']>;
  privateVisibilityConfigKind?: Maybe<Scalars['String']>;
  privateVisibilityConfigNetworks?: Maybe<Array<Maybe<GcpDnsZonePrivateVisibilityConfigNetwork>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  reverseLookupConfigKind?: Maybe<Scalars['String']>;
  serviceDirectoryConfigKind?: Maybe<Scalars['String']>;
  serviceDirectoryConfigNamespaceDeactivateTime?: Maybe<Scalars['String']>;
  serviceDirectoryConfigNamespaceKind?: Maybe<Scalars['String']>;
  serviceDirectoryConfigNamespaceUrl?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

export type GcpDnsPolicy = GcpBaseResource & {
  alternativeNameServerConfigKind?: Maybe<Scalars['String']>;
  alternativeNameServerConfigTargetNameServers?: Maybe<Array<Maybe<GcpDnsPolicyAlternativeNameServerConfigTargetNameServer>>>;
  description?: Maybe<Scalars['String']>;
  enableInboundForwarding?: Maybe<Scalars['Boolean']>;
  enableLogging?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpDnsPolicyAlternativeNameServerConfigTargetNameServer = {
  forwardingPath?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  ipv4Address?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
};

export type GcpDnsZoneDnssecConfigDefaultKeySpec = {
  algorithm?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  keyLength?: Maybe<Scalars['Int']>;
  keyType?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
};

export type GcpDnsZoneForwardingConfigTargetNameServer = {
  forwardingPath?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  ipv4Address?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
};

export type GcpDnsZonePrivateVisibilityConfigNetwork = {
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  networkUrl?: Maybe<Scalars['String']>;
};

export type GcpDuration = {
  nanos?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['String']>;
};

export type GcpEssentialContact = GcpBaseResource & {
  email?: Maybe<Scalars['String']>;
  languageTag?: Maybe<Scalars['String']>;
  notificationCategorySubscriptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  validateTime?: Maybe<Scalars['String']>;
  validationState?: Maybe<Scalars['String']>;
};

export type GcpExpr = {
  description?: Maybe<Scalars['String']>;
  expression?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type GcpFileContentBuffer = {
  content?: Maybe<Scalars['String']>;
  fileType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type GcpFirestoreDatabase = GcpBaseResource & {
  appEngineIntegrationMode?: Maybe<Scalars['String']>;
  concurrencyMode?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  keyPrefix?: Maybe<Scalars['String']>;
  locationId?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  type?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpFirewall = {
  allowed?: Maybe<Array<Maybe<GcpFirewallAccess>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  denied?: Maybe<Array<Maybe<GcpFirewallAccess>>>;
  description?: Maybe<Scalars['String']>;
  destinationRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  direction?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  logConfig?: Maybe<GcpFirewallLogConfig>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  priority?: Maybe<Scalars['Int']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  sourceRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceServiceAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetServiceAccounts?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetTags?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  createTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  iamPolicies?: Maybe<Array<Maybe<GcpIamPolicy>>>;
  organization?: Maybe<Array<Maybe<GcpOrganization>>>;
  parent?: Maybe<Scalars['String']>;
  projects?: Maybe<Array<Maybe<GcpProject>>>;
  state?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpGuestOsFeature = {
  id: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type GcpIamBinding = {
  condition?: Maybe<GcpIamBindingExpr>;
  id: Scalars['String'];
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
  role?: Maybe<Scalars['String']>;
};

export type GcpIamBindingExpr = {
  description?: Maybe<Scalars['String']>;
  expression?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type GcpIamPolicy = {
  auditConfigs?: Maybe<Array<Maybe<GcpIamPolicyAuditConfig>>>;
  bindings?: Maybe<Array<Maybe<GcpIamBinding>>>;
  cryptoKeyId?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  folder?: Maybe<Array<Maybe<GcpFolder>>>;
  folderId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  kmsCryptoKeys?: Maybe<Array<Maybe<GcpKmsCryptoKey>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  storageBucket?: Maybe<Array<Maybe<GcpStorageBucket>>>;
  storageBucketId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type GcpIamPolicyAuditConfig = {
  auditLogConfigs?: Maybe<Array<Maybe<GcpIamPolicyAuditLogConfig>>>;
  exemptedMembers?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  service?: Maybe<Scalars['String']>;
};

export type GcpIamPolicyAuditLogConfig = {
  exemptedMembers?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  logType?: Maybe<Scalars['String']>;
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

export type GcpKeyValue = {
  id: Scalars['String'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type GcpKmsCryptoKey = GcpBaseResource & {
  aiPlatformNotebooks?: Maybe<Array<Maybe<GcpAiPlatformNotebook>>>;
  createTime?: Maybe<Scalars['String']>;
  destroyScheduledDuration?: Maybe<Scalars['String']>;
  iamPolicy?: Maybe<Array<Maybe<GcpIamPolicy>>>;
  importOnly?: Maybe<Scalars['Boolean']>;
  kmsKeyRing?: Maybe<Array<Maybe<GcpKmsKeyRing>>>;
  kmsKeyRingId?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  nextRotationTime?: Maybe<Scalars['String']>;
  primaryAlgorithm?: Maybe<Scalars['String']>;
  primaryAttestationContent?: Maybe<Scalars['String']>;
  primaryAttestationFormat?: Maybe<Scalars['String']>;
  primaryCreateTime?: Maybe<Scalars['String']>;
  primaryDestroyEventTime?: Maybe<Scalars['String']>;
  primaryDestroyTime?: Maybe<Scalars['String']>;
  primaryExternalProtectionLevelOptionsExternalKeyUri?: Maybe<Scalars['String']>;
  primaryGenerateTime?: Maybe<Scalars['String']>;
  primaryImportFailureReason?: Maybe<Scalars['String']>;
  primaryImportJob?: Maybe<Scalars['String']>;
  primaryImportTime?: Maybe<Scalars['String']>;
  primaryName?: Maybe<Scalars['String']>;
  primaryProtectionLevel?: Maybe<Scalars['String']>;
  primaryReimportEligible?: Maybe<Scalars['Boolean']>;
  primaryState?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  purpose?: Maybe<Scalars['String']>;
  rotationPeriod?: Maybe<Scalars['String']>;
  versionTemplateAlgorithm?: Maybe<Scalars['String']>;
  versionTemplateProtectionLevel?: Maybe<Scalars['String']>;
};

export type GcpKmsImportJob = {
  attestationContent?: Maybe<Scalars['String']>;
  attestationFormat?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  expireEventTime?: Maybe<Scalars['String']>;
  expireTime?: Maybe<Scalars['String']>;
  generateTime?: Maybe<Scalars['String']>;
  importMethod?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  protectionLevel?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type GcpKmsKeyRing = GcpBaseResource & {
  createTime?: Maybe<Scalars['String']>;
  importJobs?: Maybe<Array<Maybe<GcpKmsImportJob>>>;
  kmsCryptoKeys?: Maybe<Array<Maybe<GcpKmsCryptoKey>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpLabel = GcpBaseResource & {
  alertPolicy?: Maybe<Array<Maybe<GcpAlertPolicy>>>;
  bigQueryDataset?: Maybe<Array<Maybe<GcpBigQueryDataset>>>;
  cloudFunction?: Maybe<Array<Maybe<GcpCloudFunction>>>;
  dnsManagedZone?: Maybe<Array<Maybe<GcpDnsManagedZone>>>;
  id: Scalars['String'];
  key: Scalars['String'];
  kmsCryptoKey?: Maybe<Array<Maybe<GcpKmsCryptoKey>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  secrets?: Maybe<Array<Maybe<GcpSecret>>>;
  storageBucket?: Maybe<Array<Maybe<GcpStorageBucket>>>;
  value: Scalars['String'];
  vmInstance?: Maybe<Array<Maybe<GcpVmInstance>>>;
};

export type GcpLabelDescriptor = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
};

export type GcpListValue = {
  values?: Maybe<Array<Maybe<GcpValue>>>;
};

export type GcpLogBucket = {
  createTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lifecycleState?: Maybe<Scalars['String']>;
  locked?: Maybe<Scalars['Boolean']>;
  logView?: Maybe<Array<Maybe<GcpLogView>>>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  retentionDays?: Maybe<Scalars['Int']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpLogExclusion = {
  createTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpLogMetric = GcpBaseResource & {
  bucketOptions?: Maybe<GcpLogMetricBucketOptions>;
  createTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  labelExtractors?: Maybe<Array<Maybe<GcpRawLabel>>>;
  metricDescriptor?: Maybe<GcpLogMetricDescriptor>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  updateTime?: Maybe<Scalars['String']>;
  valueExtractor?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type GcpLogMetricBucketOptions = {
  explicitBuckets?: Maybe<GcpLogMetricBucketOptionsExplicit>;
  exponentialBuckets?: Maybe<GcpLogMetricBucketOptionsExponential>;
  linearBuckets?: Maybe<GcpLogMetricBucketOptionsLinear>;
};

export type GcpLogMetricBucketOptionsExplicit = {
  bounds?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type GcpLogMetricBucketOptionsExponential = {
  growthFactor?: Maybe<Scalars['Float']>;
  numFiniteBuckets?: Maybe<Scalars['Float']>;
  scale?: Maybe<Scalars['Float']>;
};

export type GcpLogMetricBucketOptionsLinear = {
  numFiniteBuckets?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type GcpLogMetricDescriptor = {
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpLabelDescriptor>>>;
  launchStage?: Maybe<Scalars['String']>;
  metadata?: Maybe<GcpLogMetricDescriptorMetadata>;
  metricKind?: Maybe<Scalars['String']>;
  monitoredResourceTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
};

export type GcpLogMetricDescriptorMetadata = {
  ingestDelay?: Maybe<GcpDuration>;
  launchStage?: Maybe<Scalars['String']>;
  samplePeriod?: Maybe<GcpDuration>;
};

export type GcpLogSink = {
  bigqueryOptions?: Maybe<GcpBigQueryOptions>;
  createTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  exclusions?: Maybe<Array<Maybe<GcpLogExclusion>>>;
  filter?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  includeChildren?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  outputVersionFormat?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  writerIdentity?: Maybe<Scalars['String']>;
};

export type GcpLogView = {
  createTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logBucket?: Maybe<Array<Maybe<GcpLogBucket>>>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpMetadata = {
  fingerprint?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<GcpItems>>>;
  kind?: Maybe<Scalars['String']>;
};

export type GcpNetwork = GcpBaseResource & {
  aiPlatformNotebooks?: Maybe<Array<Maybe<GcpAiPlatformNotebook>>>;
  autoCreateSubnetworks?: Maybe<Scalars['Boolean']>;
  cdnBackendService?: Maybe<Array<Maybe<GcpCdnBackendService>>>;
  cloudRouters?: Maybe<Array<Maybe<GcpCloudRouter>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dnsPolicies?: Maybe<Array<Maybe<GcpDnsPolicy>>>;
  firewalls?: Maybe<Array<Maybe<GcpFirewall>>>;
  gatewayIPv4?: Maybe<Scalars['String']>;
  ipV4Range?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  mtu?: Maybe<Scalars['Int']>;
  peerings?: Maybe<Array<Maybe<GcpNetworkPeering>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  routingConfig?: Maybe<GcpNetworkRoutingConfig>;
  selfLink?: Maybe<Scalars['String']>;
  sqlInstances?: Maybe<Array<Maybe<GcpSqlInstance>>>;
  subnets?: Maybe<Array<Maybe<GcpSubnet>>>;
  vmInstances?: Maybe<Array<Maybe<GcpVmInstance>>>;
  vpcConnectors?: Maybe<Array<Maybe<GcpVpcConnector>>>;
};

export type GcpNetworkPeering = {
  autoCreateRoutes?: Maybe<Scalars['Boolean']>;
  exchangeSubnetRoutes?: Maybe<Scalars['Boolean']>;
  exportCustomRoutes?: Maybe<Scalars['Boolean']>;
  exportSubnetRoutesWithPublicIp?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
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
  createTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  directoryCustomerId?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  folders?: Maybe<Array<Maybe<GcpFolder>>>;
  projects?: Maybe<Array<Maybe<GcpProject>>>;
  state?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
};

export type GcpProject = {
  accessApprovals?: Maybe<Array<Maybe<GcpAccessApproval>>>;
  aiPlatformNotebooks?: Maybe<Array<Maybe<GcpAiPlatformNotebook>>>;
  alertPolicies?: Maybe<Array<Maybe<GcpAlertPolicy>>>;
  apiGatewayApiConfigs?: Maybe<Array<Maybe<GcpApiGatewayApiConfig>>>;
  apiGatewayApis?: Maybe<Array<Maybe<GcpApiGatewayApi>>>;
  apiGatewayGateways?: Maybe<Array<Maybe<GcpApiGatewayGateway>>>;
  apiKeys?: Maybe<Array<Maybe<GcpApiKey>>>;
  assets?: Maybe<Array<Maybe<GcpAsset>>>;
  bigQueryConnection?: Maybe<Array<Maybe<GcpBigQueryConnection>>>;
  bigQueryDataTransfer?: Maybe<Array<Maybe<GcpBigQueryDataTransfer>>>;
  bigQueryDataTransferRun?: Maybe<Array<Maybe<GcpBigQueryDataTransferRun>>>;
  bigQueryDataset?: Maybe<Array<Maybe<GcpBigQueryDataset>>>;
  bigQueryReservation?: Maybe<Array<Maybe<GcpBigQueryReservation>>>;
  bigQueryReservationCapacityCommitment?: Maybe<Array<Maybe<GcpBigQueryReservationCapacityCommitment>>>;
  cdnBackendBucket?: Maybe<Array<Maybe<GcpCdnBackendBucket>>>;
  cdnBackendService?: Maybe<Array<Maybe<GcpCdnBackendService>>>;
  cdnUrlMap?: Maybe<Array<Maybe<GcpCdnUrlMap>>>;
  cloudFunctions?: Maybe<Array<Maybe<GcpCloudFunction>>>;
  cloudRouters?: Maybe<Array<Maybe<GcpCloudRouter>>>;
  computeProject?: Maybe<Array<Maybe<GcpComputeProject>>>;
  createTime?: Maybe<Scalars['String']>;
  dataprocAutoscalingPolicies?: Maybe<Array<Maybe<GcpDataprocAutoscalingPolicy>>>;
  dataprocClusters?: Maybe<Array<Maybe<GcpDataprocCluster>>>;
  dataprocJobs?: Maybe<Array<Maybe<GcpDataprocJob>>>;
  dataprocWorkflowTemplates?: Maybe<Array<Maybe<GcpDataprocWorkflowTemplate>>>;
  deleteTime?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  dnsManagedZones?: Maybe<Array<Maybe<GcpDnsManagedZone>>>;
  dnsPolicies?: Maybe<Array<Maybe<GcpDnsPolicy>>>;
  essentialContacts?: Maybe<Array<Maybe<GcpEssentialContact>>>;
  etag?: Maybe<Scalars['String']>;
  firestoreDatabases?: Maybe<Array<Maybe<GcpFirestoreDatabase>>>;
  firewalls?: Maybe<Array<Maybe<GcpFirewall>>>;
  folder?: Maybe<Array<Maybe<GcpFolder>>>;
  iamPolicies?: Maybe<Array<Maybe<GcpIamPolicy>>>;
  id: Scalars['String'];
  kmsCryptoKeys?: Maybe<Array<Maybe<GcpKmsCryptoKey>>>;
  kmsKeyRing?: Maybe<Array<Maybe<GcpKmsKeyRing>>>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  logBuckets?: Maybe<Array<Maybe<GcpLogBucket>>>;
  logMetrics?: Maybe<Array<Maybe<GcpLogMetric>>>;
  logSinks?: Maybe<Array<Maybe<GcpLogSink>>>;
  logViews?: Maybe<Array<Maybe<GcpLogView>>>;
  name?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<GcpNetwork>>>;
  organization?: Maybe<Array<Maybe<GcpOrganization>>>;
  parent?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  secrets?: Maybe<Array<Maybe<GcpSecret>>>;
  serviceAccounts?: Maybe<Array<Maybe<GcpServiceAccount>>>;
  sqlInstances?: Maybe<Array<Maybe<GcpSqlInstance>>>;
  sslPolicies?: Maybe<Array<Maybe<GcpSslPolicy>>>;
  state?: Maybe<Scalars['String']>;
  storageBuckets?: Maybe<Array<Maybe<GcpStorageBucket>>>;
  subnets?: Maybe<Array<Maybe<GcpSubnet>>>;
  targetHttpsProxies?: Maybe<Array<Maybe<GcpTargetHttpsProxy>>>;
  targetSslProxies?: Maybe<Array<Maybe<GcpTargetSslProxy>>>;
  updateTime?: Maybe<Scalars['String']>;
  vmInstances?: Maybe<Array<Maybe<GcpVmInstance>>>;
  vpcConnectors?: Maybe<Array<Maybe<GcpVpcConnector>>>;
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
  details?: Maybe<Array<Maybe<GcpAny>>>;
  message?: Maybe<Scalars['String']>;
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
  createTime?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  expireTime?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawLabel>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  replication?: Maybe<GcpSecretReplication>;
  rotation?: Maybe<GcpSecretReplicationStatusRotation>;
  topics?: Maybe<Array<Maybe<GcpSecretReplicationStatusTopic>>>;
  ttl?: Maybe<GcpDuration>;
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
  customerManagedEncryption?: Maybe<GcpSecretReplicationUserManagedStatusCustomerManagedEncryptionStatus>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
};

export type GcpServiceAccount = GcpBaseResource & {
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  keys?: Maybe<Array<Maybe<GcpServiceAccountKey>>>;
  oauth2ClientId?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};

export type GcpServiceAccountKey = {
  id: Scalars['String'];
  keyAlgorithm?: Maybe<Scalars['String']>;
  keyOrigin?: Maybe<Scalars['String']>;
  keyType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  validAfterTime?: Maybe<Scalars['String']>;
  validBeforeTime?: Maybe<Scalars['String']>;
};

export type GcpServiceBillingInfo = {
  cost?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  formattedCost?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type GcpShieldedInstanceConfig = {
  enableIntegrityMonitoring?: Maybe<Scalars['Boolean']>;
  enableSecureBoot?: Maybe<Scalars['Boolean']>;
  enableVtpm?: Maybe<Scalars['Boolean']>;
};

export type GcpShieldedInstanceIntegrityPolicy = {
  updateAutoLearnPolicy?: Maybe<Scalars['Boolean']>;
};

export type GcpSqlAclEntry = {
  expirationTime?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpSqlActiveDirectoryConfig = {
  domain?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
};

export type GcpSqlBackupConfiguration = {
  backupRetentionSettings?: Maybe<GcpSqlBackupRetentionSettings>;
  binaryLogEnabled?: Maybe<Scalars['Boolean']>;
  enabled?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  pointInTimeRecoveryEnabled?: Maybe<Scalars['Boolean']>;
  replicationLogArchivingEnabled?: Maybe<Scalars['Boolean']>;
  startTime?: Maybe<Scalars['String']>;
  transactionLogRetentionDays?: Maybe<Scalars['String']>;
};

export type GcpSqlBackupRetentionSettings = {
  retainedBackups?: Maybe<Scalars['String']>;
  retentionUnit?: Maybe<Scalars['String']>;
};

export type GcpSqlDatabaseFlags = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpSqlDenyMaintenancePeriod = {
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type GcpSqlDiskEncryptionConfiguration = {
  kind?: Maybe<Scalars['String']>;
  kmsKeyName?: Maybe<Scalars['String']>;
};

export type GcpSqlDiskEncryptionStatus = {
  kind?: Maybe<Scalars['String']>;
  kmsKeyVersionName?: Maybe<Scalars['String']>;
};

export type GcpSqlInsightsConfig = {
  queryInsightsEnabled?: Maybe<Scalars['Boolean']>;
  queryPlansPerMinute?: Maybe<Scalars['String']>;
  queryStringLength?: Maybe<Scalars['String']>;
  recordApplicationTags?: Maybe<Scalars['Boolean']>;
  recordClientAddress?: Maybe<Scalars['Boolean']>;
};

export type GcpSqlInstance = GcpBaseResource & {
  backendType?: Maybe<Scalars['String']>;
  connectionName?: Maybe<Scalars['String']>;
  currentDiskSize?: Maybe<Scalars['String']>;
  databaseVersion?: Maybe<Scalars['String']>;
  diskEncryptionConfiguration?: Maybe<GcpSqlDiskEncryptionConfiguration>;
  diskEncryptionStatus?: Maybe<GcpSqlDiskEncryptionStatus>;
  etag?: Maybe<Scalars['String']>;
  failoverReplica?: Maybe<GcpSqlInstanceSqlFailoverReplica>;
  gceZone?: Maybe<Scalars['String']>;
  instanceType?: Maybe<Scalars['String']>;
  ipAddresses?: Maybe<Array<Maybe<GcpSqlIpMapping>>>;
  ipv6Address?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  masterInstanceName?: Maybe<Scalars['String']>;
  maxDiskSize?: Maybe<Scalars['String']>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  onPremisesConfiguration?: Maybe<GcpSqlOnPremisesConfiguration>;
  outOfDiskReport?: Maybe<GcpSqlInstanceOutOfDiskReport>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  replicaConfiguration?: Maybe<GcpSqlReplicaConfiguration>;
  replicaNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  rootPassword?: Maybe<Scalars['String']>;
  satisfiesPzs?: Maybe<Scalars['Boolean']>;
  scheduledMaintenance?: Maybe<GcpSqlInstanceScheduledMaintenance>;
  secondaryGceZone?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  serverCaCert?: Maybe<GcpSqlSslCert>;
  serviceAccountEmailAddress?: Maybe<Scalars['String']>;
  settings?: Maybe<GcpSqlSettings>;
  state?: Maybe<Scalars['String']>;
  suspensionReason?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpSqlInstanceOutOfDiskReport = {
  sqlMinRecommendedIncreaseSizeGb?: Maybe<Scalars['Float']>;
  sqlOutOfDiskState?: Maybe<Scalars['String']>;
};

export type GcpSqlInstanceScheduledMaintenance = {
  canDefer?: Maybe<Scalars['Boolean']>;
  canReschedule?: Maybe<Scalars['Boolean']>;
  startTime?: Maybe<Scalars['String']>;
};

export type GcpSqlInstanceSqlFailoverReplica = {
  available?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type GcpSqlIpConfiguration = {
  authorizedNetworks?: Maybe<Array<Maybe<GcpSqlAclEntry>>>;
  ipv4Enabled?: Maybe<Scalars['Boolean']>;
  privateNetwork?: Maybe<Scalars['String']>;
  requireSsl?: Maybe<Scalars['Boolean']>;
};

export type GcpSqlIpMapping = {
  id: Scalars['String'];
  ipAddress?: Maybe<Scalars['String']>;
  timeToRetire?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GcpSqlLocationPreference = {
  followGaeApplication?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  secondaryZone?: Maybe<Scalars['String']>;
  zone?: Maybe<Scalars['String']>;
};

export type GcpSqlMaintenanceWindow = {
  day?: Maybe<Scalars['String']>;
  hour?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  updateTrack?: Maybe<Scalars['String']>;
};

export type GcpSqlMySqlReplicaConfiguration = {
  caCertificate?: Maybe<Scalars['String']>;
  clientCertificate?: Maybe<Scalars['String']>;
  clientKey?: Maybe<Scalars['String']>;
  connectRetryInterval?: Maybe<Scalars['String']>;
  dumpFilePath?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  masterHeartbeatPeriod?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  sslCipher?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  verifyServerCertificate?: Maybe<Scalars['Boolean']>;
};

export type GcpSqlOnPremisesConfiguration = {
  caCertificate?: Maybe<Scalars['String']>;
  clientCertificate?: Maybe<Scalars['String']>;
  clientKey?: Maybe<Scalars['String']>;
  dumpFilePath?: Maybe<Scalars['String']>;
  hostPort?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type GcpSqlReplicaConfiguration = {
  failoverTarget?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  mysqlReplicaConfiguration?: Maybe<GcpSqlMySqlReplicaConfiguration>;
};

export type GcpSqlSettings = {
  activationPolicy?: Maybe<Scalars['String']>;
  activeDirectoryConfig?: Maybe<GcpSqlActiveDirectoryConfig>;
  authorizedGaeApplications?: Maybe<Array<Maybe<Scalars['String']>>>;
  availabilityType?: Maybe<Scalars['String']>;
  backupConfiguration?: Maybe<GcpSqlBackupConfiguration>;
  collation?: Maybe<Scalars['String']>;
  crashSafeReplicationEnabled?: Maybe<Scalars['Boolean']>;
  dataDiskSizeGb?: Maybe<Scalars['String']>;
  dataDiskType?: Maybe<Scalars['String']>;
  databaseFlags?: Maybe<Array<Maybe<GcpSqlDatabaseFlags>>>;
  databaseReplicationEnabled?: Maybe<Scalars['Boolean']>;
  denyMaintenancePeriods?: Maybe<Array<Maybe<GcpSqlDenyMaintenancePeriod>>>;
  insightsConfig?: Maybe<GcpSqlInsightsConfig>;
  ipConfiguration?: Maybe<GcpSqlIpConfiguration>;
  kind?: Maybe<Scalars['String']>;
  locationPreference?: Maybe<GcpSqlLocationPreference>;
  maintenanceWindow?: Maybe<GcpSqlMaintenanceWindow>;
  pricingPlan?: Maybe<Scalars['String']>;
  replicationType?: Maybe<Scalars['String']>;
  settingsVersion?: Maybe<Scalars['String']>;
  storageAutoResize?: Maybe<Scalars['Boolean']>;
  storageAutoResizeLimit?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
  userLabels?: Maybe<Array<Maybe<GcpRawLabel>>>;
};

export type GcpSqlSslCert = {
  cert?: Maybe<Scalars['String']>;
  certSerialNumber?: Maybe<Scalars['String']>;
  commonName?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  expirationTime?: Maybe<Scalars['String']>;
  instance?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  sha1Fingerprint?: Maybe<Scalars['String']>;
};

export type GcpSslPolicy = GcpBaseResource & {
  creationTimestamp?: Maybe<Scalars['String']>;
  customFeatures?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  enabledFeatures?: Maybe<Array<Maybe<Scalars['String']>>>;
  fingerprint?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  minTlsVersion?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  selfLink?: Maybe<Scalars['String']>;
  targetHttpsProxies?: Maybe<Array<Maybe<GcpTargetHttpsProxy>>>;
  targetSslProxies?: Maybe<Array<Maybe<GcpTargetSslProxy>>>;
  warnings?: Maybe<Array<Maybe<GcpComputeWarnings>>>;
};

export type GcpStorageBucket = {
  baseUrl?: Maybe<Scalars['String']>;
  defaultEventBasedHold?: Maybe<Scalars['Boolean']>;
  etag?: Maybe<Scalars['String']>;
  iamConfiguration?: Maybe<GcpStorageBucketIamConfiguration>;
  iamPolicy?: Maybe<Array<Maybe<GcpIamPolicy>>>;
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<GcpRawTag>>>;
  location?: Maybe<Scalars['String']>;
  locationType?: Maybe<Scalars['String']>;
  metageneration?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pollIntervalMs?: Maybe<Scalars['Int']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId: Scalars['String'];
  projectNumber?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  rpo?: Maybe<Scalars['String']>;
  satisfiesPZS?: Maybe<Scalars['Boolean']>;
  selfLink?: Maybe<Scalars['String']>;
  storageClass?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
  userProject?: Maybe<Scalars['String']>;
};

export type GcpStorageBucketIamConfiguration = {
  bucketPolicyOnly?: Maybe<GcpStorageBucketIamConfigurationMetadata>;
  publicAccessPrevention?: Maybe<Scalars['String']>;
  uniformBucketLevelAccess?: Maybe<GcpStorageBucketIamConfigurationMetadata>;
};

export type GcpStorageBucketIamConfigurationMetadata = {
  enabled?: Maybe<Scalars['Boolean']>;
  lockedTime?: Maybe<Scalars['String']>;
};

export type GcpStruct = {
  fields?: Maybe<Array<Maybe<GcpValue>>>;
};

export type GcpSubnet = GcpBaseResource & {
  aiPlatformNotebooks?: Maybe<Array<Maybe<GcpAiPlatformNotebook>>>;
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  enableFlowLogs?: Maybe<Scalars['Boolean']>;
  fingerprint?: Maybe<Scalars['String']>;
  gatewayAddress?: Maybe<Scalars['String']>;
  ipCidrRange?: Maybe<Scalars['String']>;
  ipv6CidrRange?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  logConfig?: Maybe<GcpSubnetLogConfig>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  privateIpGoogleAccess?: Maybe<Scalars['Boolean']>;
  privateIpv6GoogleAccess?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  purpose?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  secondaryIpRanges?: Maybe<Array<Maybe<GcpSubnetSecondaryRange>>>;
  selfLink?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  vmInstances?: Maybe<Array<Maybe<GcpVmInstance>>>;
  vpcConnectors?: Maybe<Array<Maybe<GcpVpcConnector>>>;
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

export type GcpTag = GcpBaseResource & {
  folder?: Maybe<Array<Maybe<GcpFolder>>>;
  id: Scalars['String'];
  key: Scalars['String'];
  organization?: Maybe<Array<Maybe<GcpOrganization>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  value: Scalars['String'];
  vmInstance?: Maybe<Array<Maybe<GcpVmInstance>>>;
};

export type GcpTargetHttpsProxy = GcpBaseResource & {
  authorizationPolicy?: Maybe<Scalars['String']>;
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fingerprint?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  proxyBind?: Maybe<Scalars['Boolean']>;
  quicOverride?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  serverTlsPolicy?: Maybe<Scalars['String']>;
  sslCertificates?: Maybe<Array<Maybe<Scalars['String']>>>;
  sslPolicy?: Maybe<Array<Maybe<GcpSslPolicy>>>;
  urlMap?: Maybe<Scalars['String']>;
};

export type GcpTargetSslProxy = GcpBaseResource & {
  creationTimestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  proxyHeader?: Maybe<Scalars['String']>;
  selfLink?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
  sslCertificates?: Maybe<Array<Maybe<Scalars['String']>>>;
  sslPolicy?: Maybe<Array<Maybe<GcpSslPolicy>>>;
};

export type GcpTotalBillingInfo = {
  cost?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  formattedCost?: Maybe<Scalars['String']>;
};

export type GcpValue = {
  boolValue?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  key: Scalars['String'];
  listValue?: Maybe<GcpListValue>;
  nullValue?: Maybe<Scalars['String']>;
  numberValue?: Maybe<Scalars['Float']>;
  stringValue?: Maybe<Scalars['String']>;
  structValue?: Maybe<GcpStruct>;
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
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  networkInterfaces?: Maybe<Array<Maybe<GcpComputeNetworkInterface>>>;
  networkTags?: Maybe<GcpComputeTags>;
  privateIpv6GoogleAccess?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  reservationAffinity?: Maybe<GcpReservationAffinity>;
  resourcePolicies?: Maybe<Array<Maybe<Scalars['String']>>>;
  satisfiesPzs?: Maybe<Scalars['Boolean']>;
  scheduling?: Maybe<GcpScheduling>;
  selfLink?: Maybe<Scalars['String']>;
  serviceAccounts?: Maybe<Array<Maybe<GcpVmInstanceServiceAccount>>>;
  shieldedInstanceConfig?: Maybe<GcpShieldedInstanceConfig>;
  shieldedInstanceIntegrityPolicy?: Maybe<GcpShieldedInstanceIntegrityPolicy>;
  startRestricted?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  subnet?: Maybe<Array<Maybe<GcpSubnet>>>;
  zone?: Maybe<Scalars['String']>;
};

export type GcpVmInstanceServiceAccount = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GcpVpcConnector = {
  cloudFunctions?: Maybe<Array<Maybe<GcpCloudFunction>>>;
  connectedProjects?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  ipCidrRange?: Maybe<Scalars['String']>;
  maxThroughput?: Maybe<Scalars['Int']>;
  minThroughput?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Array<Maybe<GcpNetwork>>>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
  projectId: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<GcpSubnet>>>;
};
