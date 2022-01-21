import { DNS } from '@google-cloud/dns'
import CloudGraph from '@cloudgraph/sdk'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import gcpLoggerText from '../../properties/logger'
import { GcpServiceInput } from '../../types'
import { initTestEndpoint, generateGcpErrorLog } from '../../utils'
import { listData }  from '../../utils/fetchUtils'
import { GLOBAL_REGION } from '../../config/constants'

const lt = { ...gcpLoggerText }
const { logger } = CloudGraph

const serviceName = 'SQL Instance'
const apiEndpoint = initTestEndpoint(serviceName)
const pathToUri = (path) => {
  let uri = ''
  if (!isEmpty(path)) {
    uri = `https://www.googleapis.com/compute/v1/${path}`
  }
  return uri
}

interface ITimestamp {
  seconds?: (number|Long|string|null)
  nanos?: (number|null);
}

interface IInt64Value {
  value?: (number|Long|string|null)
}

interface IBoolValue {
  value?: (boolean|null);
}

export interface RawGcpSqlInstance {
  id: string
  projectId: string
  region?: string
  name?: string
  kind?: string
  state?: string
  databaseVersion?: string
  settings?: {
    settingsVersion?: IInt64Value
    authorizedGaeApplications?: string[]
    tier?: string
    kind?: string
    userLabels?: { [k: string]: string }
    availabilityType?: string
    pricingPlan?: string
    replicationType?: string
    storageAutoResizeLimit?: IInt64Value
    activationPolicy?: string
    ipConfiguration?: {
      ipv4Enabled?: IBoolValue
      privateNetwork?: string
      requireSsl?: IBoolValue
      authorizedNetworks?: {
        value?: string
        expirationTime?: ITimestamp
        name?: string
        kind?: string
      }[]
    }
    storageAutoResize?: IBoolValue
    locationPreference?: {
      followGaeApplication?: string
      zone?: string
      secondaryZone?: string
      kind?: string
    }
    databaseFlags?: {
      name?: string
      value?: string
    }[]
    dataDiskType?: string
    maintenanceWindow?: {
      hour?: IInt64Value
      day?: IInt64Value
      updateTrack?: string
      kind?: string
    }
    backupConfiguration?: {
      startTime?: ITimestamp
      enabled?: IBoolValue
      kind?: string
      binaryLogEnabled?: IBoolValue
      replicationLogArchivingEnabled?: IBoolValue
      location?: string
      pointInTimeRecoveryEnabled?: IBoolValue
      transactionLogRetentionDays?: IInt64Value
      backupRetentionSettings?: {
        retentionUnit?: string
        retainedBackups?: IInt64Value
      }
    }
    databaseReplicationEnabled?: IBoolValue
    crashSafeReplicationEnabled?: IBoolValue
    dataDiskSizeGb?: IInt64Value
    activeDirectoryConfig?: {
      kind?: string
      domain?: string
    }
    collation?: string
    denyMaintenancePeriods?: {
      startDate?: string
      endDate?: string
      time?: string
    }[]
    insightsConfig?: {
      queryInsightsEnabled?: boolean
      recordClientAddress?: boolean
      recordApplicationTags?: boolean
      queryStringLength?: IInt64Value
      queryPlansPerMinute?: IInt64Value
    }
  }
  etag?: string
  failoverReplica?: {
    name?: string
    available?: IBoolValue
  }
  masterInstanceName?: string
  replicaNames?: string[]
  maxDiskSize?: IInt64Value
  currentDiskSize?: IInt64Value
  ipAddresses?: {
    type?: string
    ipAddress?: string
    timeToRetire?: ITimestamp
  }[]
  serverCaCert?: {
    kind?: string
    certSerialNumber?: string
    cert?: string
    createTime?: ITimestamp
    commonName?: string
    expirationTime?: ITimestamp
    sha1Fingerprint?: string
    instance?: string
    selfLink?: string
  }
  instanceType?: string
  project?: string
  ipv6Address?: string
  serviceAccountEmailAddress?: string
  onPremisesConfiguration?: {
    hostPort?: string
    kind?: string
    username?: string
    password?: string
    caCertificate?: string
    clientCertificate?: string
    clientKey?: string
    dumpFilePath?: string
  }
  replicaConfiguration?: {
    kind?: string
    mysqlReplicaConfiguration?: {
      dumpFilePath?: string
      username?: string
      password?: string
      connectRetryInterval?: IInt64Value
      masterHeartbeatPeriod?: IInt64Value
      caCertificate?: string
      clientCertificate?: string
      clientKey?: string
      sslCipher?: string
      verifyServerCertificate?: IBoolValue
      kind?: string
    }
    failoverTarget?: IBoolValue
  }
  backendType?: string
  selfLink?: string
  suspensionReason?: string[]
  connectionName?: string
  gceZone?: string
  secondaryGceZone?: string
  diskEncryptionConfiguration?: {
    kmsKeyName?: string
    kind?: string
  }
  diskEncryptionStatus?: {
    kmsKeyVersionName?: string
    kind?: string
  }
  rootPassword?: string
  scheduledMaintenance?: {
    startTime?: ITimestamp
    canDefer?: boolean
    canReschedule?: boolean
  }
  satisfiesPzs?: IBoolValue
  outOfDiskReport?: {
    sqlOutOfDiskState?: string
    sqlMinRecommendedIncreaseSizeGb?: number
  }
}

export default async ({
  config,
}: GcpServiceInput): Promise<{
  [region: string]: RawGcpSqlInstance[]
}> => {
  const instanceList: RawGcpSqlInstance[] = []
  try {
    const service = new DNS({ ...config, apiEndpoint })
    const data = await listData({
      service,
      apiUri: `https://sqladmin.googleapis.com/sql/v1beta4/projects/${config.projectId}/instances`,
      dataFieldName: 'items',
    })
    for (const instance of data) {
      instanceList.push({
        id: instance.name,
        network: [pathToUri(instance?.settings?.ipConfiguration?.privateNetwork)],
        projectId: config.projectId,
        ...instance,
        region: GLOBAL_REGION,
      })
    }
  } catch (error) {
    generateGcpErrorLog(serviceName, 'sql:listInstances', error)
  }

  logger.debug(lt.foundResources(serviceName, instanceList.length))
  return groupBy(instanceList, 'region')
}
