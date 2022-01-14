import services from './services'
import GcpProject from '../services/project'
import GcpBigQuery from '../services/bigquery'
import GcpBigQueryConnection from '../services/bigqueryConnection'
import GcpBigqueryReservation from '../services/bigqueryReservation'
import GcpBigqueryReservationCapacityCommitment from '../services/bigqueryReservationCapacityCommitment'
import GcpBigqueryDataTransfer from '../services/bigqueryDataTransfer'
import GcpBigqueryDataTransferRun from '../services/bigqueryDataTransferRun'
import GcpKmsKeyRing from '../services/kms'
import GcpKmsCryptoKey from '../services/kmsCryptoKey'
import GcpDnsManagedZone from '../services/dnsManagedZone'
import GcpVpc from '../services/vpc'
import GcpIam from '../services/iam'
import GcpTag from '../services/tag'
import GcpLogBucket from '../services/logBucket'
import GcpLogSink from '../services/logSink'
import GcpLogView from '../services/logView'
import GcpStorageBucket from '../services/storageBucket'
import GcpFirewall from '../services/firewall'
import GcpFolder from '../services/folder'
import GcpOrganization from '../services/organization'
import GcpSecretManager from '../services/secretManager'
import GcpNetwork from '../services/network'
import GcpSubnet from '../services/subnet'
import GcpVmInstance from '../services/vmInstance'
import GcpDnsPolicy from '../services/dnsPolicy'
import GcpLogMetric from '../services/logMetric'
import GcpAlertPolicy from '../services/alertPolicy'
import GcpCloudFunction from '../services/cloudFunction'
import GcpAssets from '../services/assetInventory'
import GcpTargetSslProxies from '../services/targetSslProxy'
import GcpTargetHttpsProxies from '../services/targetHttpsProxy'
import GcpSqlInstances from '../services/sqlInstance'
import GcpSslPolicies from '../services/sslPolicy'
import GcpServiceAccount from '../services/serviceAccount'
import GcpApiKey from '../services/apiKey'
import GcpComputeProject from '../services/computeProject'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.firewall]: GcpFirewall,
  [services.project]: GcpProject,
  [services.bigquery]: GcpBigQuery,
  [services.bigqueryConnection]: GcpBigQueryConnection,
  [services.bigqueryReservation]: GcpBigqueryReservation,
  [services.bigqueryReservationCapacityCommitment]: GcpBigqueryReservationCapacityCommitment,
  [services.bigqueryDataTransfer]: GcpBigqueryDataTransfer,
  [services.bigqueryDataTransferRun]: GcpBigqueryDataTransferRun,
  [services.kmsKeyRing]: GcpKmsKeyRing,
  [services.kmsCryptoKeys]: GcpKmsCryptoKey,
  [services.dnsManagedZone]: GcpDnsManagedZone,
  [services.dnsPolicy]: GcpDnsPolicy,
  [services.vpcConnector]: GcpVpc,
  [services.iamPolicy]: GcpIam,
  [services.logBucket]: GcpLogBucket,
  [services.logSink]: GcpLogSink,
  [services.logView]: GcpLogView,
  [services.storageBucket]: GcpStorageBucket,
  [services.folder]: GcpFolder,
  [services.organization]: GcpOrganization,
  [services.secretManager]: GcpSecretManager,
  [services.network]: GcpNetwork,
  [services.subnet]: GcpSubnet,
  [services.vmInstance]: GcpVmInstance,
  [services.logMetric]: GcpLogMetric,
  [services.alertPolicy]: GcpAlertPolicy,
  [services.cloudFunction]: GcpCloudFunction,
  [services.assets]: GcpAssets,
  [services.targetSslProxies]: GcpTargetSslProxies,
  [services.targetHttpsProxies]: GcpTargetHttpsProxies,
  [services.sqlInstances]: GcpSqlInstances,
  [services.sslPolicies]: GcpSslPolicies,
  [services.serviceAccount]: GcpServiceAccount,
  [services.apiKey]: GcpApiKey,
  [services.computeProject]: GcpComputeProject,
  tag: GcpTag,
}
