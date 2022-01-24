import cuid from 'cuid'
import { GcpSqlInstance } from '../../types/generated'
import { RawGcpSqlInstance } from './data'
import { formatLabelsFromMap } from '../../utils/format'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpSqlInstance
  account: string
  region: string
}): GcpSqlInstance => {
  const {
    id,
    name,
    projectId,
    kind,
    state,
    databaseVersion,
    settings,
    etag,
    failoverReplica,
    masterInstanceName,
    replicaNames,
    maxDiskSize,
    currentDiskSize,
    ipAddresses,
    serverCaCert,
    instanceType,
    ipv6Address,
    serviceAccountEmailAddress,
    onPremisesConfiguration,
    replicaConfiguration,
    backendType,
    selfLink,
    suspensionReason,
    connectionName,
    gceZone,
    secondaryGceZone,
    diskEncryptionConfiguration,
    diskEncryptionStatus,
    rootPassword,
    scheduledMaintenance,
    satisfiesPzs,
    outOfDiskReport,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    kind,
    state,
    databaseVersion,
    settings: {
      ...settings,
      settingsVersion: settings?.settingsVersion?.value?.toString(),
      userLabels: formatLabelsFromMap(settings?.userLabels),
      storageAutoResizeLimit: settings?.storageAutoResizeLimit?.value?.toString(),
      ipConfiguration: {
        ...settings?.ipConfiguration,
        ipv4Enabled: settings?.ipConfiguration?.ipv4Enabled?.value,
        requireSsl: settings?.ipConfiguration?.requireSsl?.value,
        authorizedNetworks: settings?.ipConfiguration?.authorizedNetworks?.map(network => ({
          id: cuid(),
          ...network,
          expirationTime: toISOString(network?.expirationTime?.seconds?.toString()),
        })),
      },
      storageAutoResize: settings?.storageAutoResize?.value,
      databaseFlags: settings?.databaseFlags?.map(flag => ({
        id: cuid(),
        ...flag,
      })),
      maintenanceWindow: {
        ...settings?.maintenanceWindow,
        hour: settings?.maintenanceWindow?.hour?.value?.toString(),
        day: settings?.maintenanceWindow?.day?.value?.toString(),
      },
      backupConfiguration: {
        ...settings?.backupConfiguration,
        startTime: toISOString(settings?.backupConfiguration?.startTime?.seconds?.toString()),
        enabled: settings?.backupConfiguration?.enabled?.value,
        binaryLogEnabled: settings?.backupConfiguration?.binaryLogEnabled?.value,
        replicationLogArchivingEnabled: settings?.backupConfiguration?.replicationLogArchivingEnabled?.value,
        pointInTimeRecoveryEnabled: settings?.backupConfiguration?.pointInTimeRecoveryEnabled?.value,
        transactionLogRetentionDays: settings?.backupConfiguration?.transactionLogRetentionDays?.value?.toString(),
        backupRetentionSettings: {
          ...settings?.backupConfiguration?.backupRetentionSettings,
          retainedBackups: settings?.backupConfiguration?.backupRetentionSettings?.retainedBackups?.value?.toString(),
        }
      },
      databaseReplicationEnabled: settings?.databaseReplicationEnabled?.value,
      crashSafeReplicationEnabled: settings?.crashSafeReplicationEnabled?.value,
      dataDiskSizeGb: settings?.dataDiskSizeGb?.value?.toString(),
      denyMaintenancePeriods: settings?.denyMaintenancePeriods?.map(period => ({
        id: cuid(),
        ...period,
      })),
      insightsConfig: {
        ...settings?.insightsConfig,
        queryStringLength: settings?.insightsConfig?.queryStringLength?.value?.toString(),
        queryPlansPerMinute: settings?.insightsConfig?.queryPlansPerMinute?.value?.toString(),
      },
    },
    etag,
    failoverReplica: {
      ...failoverReplica,
      available: failoverReplica?.available?.value,
    },
    masterInstanceName,
    replicaNames,
    maxDiskSize: maxDiskSize?.value?.toString(),
    currentDiskSize: currentDiskSize?.value?.toString(),
    ipAddresses: ipAddresses?.map(address => ({
      id: cuid(),
      ...address,
      timeToRetire: toISOString(address?.timeToRetire?.seconds?.toString()),
    })),
    serverCaCert: {
      ...serverCaCert,
      createTime: toISOString(serverCaCert?.createTime?.seconds?.toString()),
      expirationTime: toISOString(serverCaCert?.expirationTime?.seconds?.toString()),
    },
    instanceType,
    ipv6Address,
    serviceAccountEmailAddress,
    onPremisesConfiguration,
    replicaConfiguration: {
      ...replicaConfiguration,
      mysqlReplicaConfiguration: {
        ...replicaConfiguration?.mysqlReplicaConfiguration,
        connectRetryInterval: replicaConfiguration?.mysqlReplicaConfiguration?.connectRetryInterval?.value?.toString(),
        masterHeartbeatPeriod: replicaConfiguration?.mysqlReplicaConfiguration?.masterHeartbeatPeriod?.value?.toString(),
        verifyServerCertificate: replicaConfiguration?.mysqlReplicaConfiguration?.verifyServerCertificate?.value,
      },
      failoverTarget: replicaConfiguration?.failoverTarget?.value,
    },
    backendType,
    selfLink,
    suspensionReason,
    connectionName,
    gceZone,
    secondaryGceZone,
    diskEncryptionConfiguration,
    diskEncryptionStatus,
    rootPassword,
    scheduledMaintenance: {
      ...scheduledMaintenance,
      startTime: toISOString(scheduledMaintenance?.startTime?.seconds?.toString()),
    },
    satisfiesPzs: satisfiesPzs?.value,
    outOfDiskReport,
  }
}
