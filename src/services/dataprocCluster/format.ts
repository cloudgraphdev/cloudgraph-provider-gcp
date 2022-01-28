import cuid from 'cuid'
import { google } from '@google-cloud/dataproc/build/protos/protos'
import {
  GcpDataprocCluster,
  GcpDataprocClusterConfig,
  GcpDataprocClusterConfigEndpoint,
  GcpDataprocClusterConfigGceCluster,
  GcpDataprocClusterConfigGke,
  GcpDataprocClusterConfigInstanceGroup,
  GcpDataprocClusterConfigLifecycleConfig,
  GcpDataprocClusterConfigNodeInitializationAction,
  GcpDataprocClusterConfigSecurity,
  GcpDataprocClusterConfigSoftware,
  GcpDataprocClusterStatus,
} from '../../types/generated'
import { RawGcpDataprocCluster } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString, formatKeyValueMap, formatLabelsFromMap } from '../../utils/format'

const formatClusterConfigGceCluster = ({
  zoneUri,
  networkUri,
  subnetworkUri,
  internalIpOnly,
  privateIpv6GoogleAccess,
  serviceAccount,
  serviceAccountScopes,
  tags,
  metadata = {},
  reservationAffinity,
  nodeGroupAffinity,
  shieldedInstanceConfig,
  confidentialInstanceConfig,
}: google.cloud.dataproc.v1.IGceClusterConfig): GcpDataprocClusterConfigGceCluster => {
  return {
    zoneUri,
    networkUri,
    subnetworkUri,
    internalIpOnly,
    privateIpv6GoogleAccess: enumKeyToString(google.cloud.dataproc.v1.GceClusterConfig.PrivateIpv6GoogleAccess, privateIpv6GoogleAccess),
    serviceAccount,
    serviceAccountScopes,
    tags,
    metadata: formatKeyValueMap(metadata),
    consumeReservationType: enumKeyToString(google.cloud.dataproc.v1.ReservationAffinity.Type, reservationAffinity?.consumeReservationType),
    reservationAffinityKey: reservationAffinity?.key || '',
    reservationAffinityValues: reservationAffinity?.values || [],
    nodeGroupAffinityNodeGroupUri: nodeGroupAffinity?.nodeGroupUri || '',
    shieldedInstanceConfigEnableSecureBoot: shieldedInstanceConfig?.enableSecureBoot || false,
    shieldedInstanceConfigEnableVtpm: shieldedInstanceConfig?.enableVtpm || false,
    shieldedInstanceConfigEnableIntegrityMonitoring: shieldedInstanceConfig?.enableIntegrityMonitoring || false,
    confidentialInstanceConfigEnableConfidentialCompute: confidentialInstanceConfig?.enableConfidentialCompute || false,
  }
}

const formatClusterConfigInstanceGroup = ({
  numInstances,
  instanceNames,
  imageUri,
  machineTypeUri,
  diskConfig = {},
  isPreemptible,
  preemptibility,
  managedGroupConfig = {},
  accelerators = [],
  minCpuPlatform,
}: google.cloud.dataproc.v1.IInstanceGroupConfig): GcpDataprocClusterConfigInstanceGroup => {
  return {
    numInstances,
    instanceNames,
    imageUri,
    machineTypeUri,
    diskConfigBootDiskType: diskConfig?.bootDiskType || '',
    diskConfigBootDiskSizeGb: diskConfig?.bootDiskSizeGb || 0,
    diskConfigNumLocalSsds: diskConfig?.numLocalSsds || 0,
    isPreemptible,
    preemptibility: enumKeyToString(google.cloud.dataproc.v1.InstanceGroupConfig.Preemptibility, preemptibility),
    managedGroupConfigInstanceTemplateName: managedGroupConfig?.instanceTemplateName || '',
    managedGroupConfigInstanceGroupManagerName: managedGroupConfig?.instanceGroupManagerName || '',
    accelerators: accelerators?.map(({
      acceleratorTypeUri,
      acceleratorCount,
    }) => {
      return {
        id: cuid(),
        acceleratorTypeUri,
        acceleratorCount,
      }}),
    minCpuPlatform,
  }
}

const formatClusterConfigSoftware = ({
  imageVersion,
  properties,
  optionalComponents = [],
}: google.cloud.dataproc.v1.ISoftwareConfig): GcpDataprocClusterConfigSoftware => {
  return {
    imageVersion,
    properties: formatKeyValueMap(properties),
    optionalComponents: optionalComponents?.map(component => {
      return enumKeyToString(google.cloud.dataproc.v1.Component, component)
    }),
  }
}

const formatClusterConfigNodeInitializationAction = ({
  executableFile,
  executionTimeout,
}: google.cloud.dataproc.v1.INodeInitializationAction): GcpDataprocClusterConfigNodeInitializationAction => {
  return {
    id: cuid(),
    executableFile,
    executionTimeout: executionTimeout?.seconds?.toString() || '',
  }
}

const formatClusterConfigSecurity = ({
  kerberosConfig = {},
  identityConfig = {},
}: google.cloud.dataproc.v1.ISecurityConfig): GcpDataprocClusterConfigSecurity => {
  return {
    kerberosConfigEnableKerberos: kerberosConfig?.enableKerberos || false,
    kerberosConfigRootPrincipalPasswordUri: kerberosConfig?.rootPrincipalPasswordUri || '',
    kerberosConfigKmsKeyUri: kerberosConfig?.kmsKeyUri || '',
    kerberosConfigKeystoreUri: kerberosConfig?.keystoreUri || '',
    kerberosConfigTruststoreUri: kerberosConfig?.truststoreUri || '',
    kerberosConfigKeystorePasswordUri: kerberosConfig?.keystorePasswordUri || '',
    kerberosConfigKeyPasswordUri: kerberosConfig?.keyPasswordUri || '',
    kerberosConfigTruststorePasswordUri: kerberosConfig?.truststorePasswordUri || '',
    kerberosConfigCrossRealmTrustRealm: kerberosConfig?.crossRealmTrustRealm || '',
    kerberosConfigCrossRealmTrustKdc: kerberosConfig?.crossRealmTrustKdc || '',
    kerberosConfigCrossRealmTrustAdminServer: kerberosConfig?.crossRealmTrustAdminServer || '',
    kerberosConfigCrossRealmTrustSharedPasswordUri: kerberosConfig?.crossRealmTrustSharedPasswordUri || '',
    kerberosConfigKdcDbKeyUri: kerberosConfig?.kdcDbKeyUri || '',
    kerberosConfigTgtLifetimeHours: kerberosConfig?.tgtLifetimeHours || 0,
    kerberosConfigRealm: kerberosConfig?.realm || '',
    identityConfigUserServiceAccountMapping: formatKeyValueMap(identityConfig?.userServiceAccountMapping),
  }
}

const formatClusterConfigLifecycle = ({
  idleDeleteTtl,
  autoDeleteTime,
  autoDeleteTtl,
  idleStartTime,
}: google.cloud.dataproc.v1.ILifecycleConfig): GcpDataprocClusterConfigLifecycleConfig => {
  return {
    idleDeleteTtl: idleDeleteTtl.seconds?.toString() || '',
    autoDeleteTime: toISOString(autoDeleteTime?.seconds?.toString()),
    autoDeleteTtl: autoDeleteTtl.seconds?.toString() || '',
    idleStartTime: toISOString(idleStartTime?.seconds?.toString()),
  }
}

const formatClusterConfigEndpoint = ({
  httpPorts,
  enableHttpPortAccess,
}: google.cloud.dataproc.v1.IEndpointConfig): GcpDataprocClusterConfigEndpoint => {
  return {
    httpPorts: formatKeyValueMap(httpPorts),
    enableHttpPortAccess,
  }
}

const formatClusterConfigGke = ({
  namespacedGkeDeploymentTarget,
}: google.cloud.dataproc.v1.IGkeClusterConfig): GcpDataprocClusterConfigGke => {
  return {
    namespacedGkeDeploymentTargetTargetGkeCluster: namespacedGkeDeploymentTarget?.targetGkeCluster || '',
    namespacedGkeDeploymentTargetClusterNamespace: namespacedGkeDeploymentTarget?.clusterNamespace || '',
  }
}

const formatClusterConfig = ({
  configBucket,
  tempBucket,
  gceClusterConfig = {},
  masterConfig = {},
  workerConfig = {},
  secondaryWorkerConfig = {},
  softwareConfig = {},
  initializationActions = [],
  encryptionConfig = {},
  autoscalingConfig = {},
  securityConfig = {},
  lifecycleConfig = {},
  endpointConfig = {},
  metastoreConfig = {},
  gkeClusterConfig = {},
}: google.cloud.dataproc.v1.IClusterConfig): GcpDataprocClusterConfig => {
  return {
    configBucket,
    tempBucket,
    gceClusterConfig: formatClusterConfigGceCluster(gceClusterConfig),
    masterConfig: formatClusterConfigInstanceGroup(masterConfig),
    workerConfig: formatClusterConfigInstanceGroup(workerConfig),
    secondaryWorkerConfig: formatClusterConfigInstanceGroup(secondaryWorkerConfig),
    softwareConfig: formatClusterConfigSoftware(softwareConfig),
    initializationActions: initializationActions?.map(formatClusterConfigNodeInitializationAction),
    encryptionConfigGcePdKmsKeyName: encryptionConfig?.gcePdKmsKeyName || '',
    autoscalingConfigPolicyUri: autoscalingConfig?.policyUri || '',
    securityConfig: formatClusterConfigSecurity(securityConfig),
    lifecycleConfig: formatClusterConfigLifecycle(lifecycleConfig),
    endpointConfig: formatClusterConfigEndpoint(endpointConfig),
    metastoreMetastoreServiceConfig: metastoreConfig?.dataprocMetastoreService || '',
    gkeClusterConfig: formatClusterConfigGke(gkeClusterConfig),
  }
}

const formatClusterStatus = ({
  state,
  detail,
  stateStartTime,
  substate,
}: google.cloud.dataproc.v1.IClusterStatus): GcpDataprocClusterStatus => {
  return {
    id: cuid(),
    state: enumKeyToString(google.cloud.dataproc.v1.ClusterStatus.State, state),
    detail,
    stateStartTime: toISOString(stateStartTime?.seconds?.toString()) || '',
    substate: enumKeyToString(google.cloud.dataproc.v1.ClusterStatus.Substate, substate),
  }
}

export default ({
  service,
  region,
}: {
  service: RawGcpDataprocCluster
  region: string
}): GcpDataprocCluster => {
  const {
    id,
    projectId,
    clusterName,
    config = {},
    Labels,
    status = {},
    statusHistory = [],
    clusterUuid,
    metrics = {},
  } = service

  return {
    id,
    projectId,
    region,
    name: clusterName,
    config: formatClusterConfig(config),
    labels: formatLabelsFromMap(Labels),
    status: formatClusterStatus(status),
    statusHistory: statusHistory?.map(history => formatClusterStatus(history)),
    clusterUuid,
    hdfsMetrics: formatKeyValueMap(metrics?.hdfsMetrics || {}),
    yarnMetrics: formatKeyValueMap(metrics?.yarnMetrics || {}),
  }
}
