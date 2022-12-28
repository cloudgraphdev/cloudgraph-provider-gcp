import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.firewall]: 'gcpFirewall',
  [services.project]: 'gcpProject',
  [services.bigQueryDataset]: 'gcpBigQueryDataset',
  [services.bigQueryConnection]: 'gcpBigQueryConnection',
  [services.bigQueryReservation]: 'gcpBigQueryReservation',
  [services.bigQueryReservationCapacityCommitment]: 'gcpBigQueryReservationCapacityCommitment',
  [services.bigQueryDataTransfer]: 'gcpBigQueryDataTransfer',
  [services.bigQueryDataTransferRun]: 'gcpBigQueryDataTransferRun',
  [services.billing]: 'gcpBilling',
  [services.kmsKeyRing]: 'gcpKmsKeyRing',
  [services.kmsCryptoKeys]: 'gcpKmsCryptoKey',
  [services.cdnBackendBucket]: 'gcpCdnBackendBucket',
  [services.cloudRouter]: 'gcpCloudRouter',
  [services.cdnBackendService]: 'gcpCdnBackendService',
  [services.cdnUrlMap]: 'gcpCdnUrlMap',
  [services.dnsManagedZone]: 'gcpDnsManagedZone',
  [services.dnsPolicy]: 'gcpDnsPolicy',
  [services.vpcConnector]: 'gcpVpcConnector',
  [services.iamPolicy]: 'gcpIamPolicy',
  [services.logBucket]: 'gcpLogBucket',
  [services.logSink]: 'gcpLogSink',
  [services.logView]: 'gcpLogView',
  [services.folder]: 'gcpFolder',
  [services.organization]: 'gcpOrganization',
  [services.secretManager]: 'gcpSecret',
  [services.network]: 'gcpNetwork',
  [services.storageBucket]: 'gcpStorageBucket',
  [services.subnet]: 'gcpSubnet',
  [services.vmInstance]: 'gcpVmInstance',
  [services.logMetric]: 'gcpLogMetric',
  [services.alertPolicy]: 'gcpAlertPolicy',
  [services.cloudFunction]: 'gcpCloudFunction',
  [services.assets]: 'gcpAsset',
  [services.targetSslProxies]: 'gcpTargetSslProxy',
  [services.targetHttpsProxies]: 'gcpTargetHttpsProxy',
  [services.sqlInstances]: 'gcpSqlInstance',
  [services.sslPolicies]: 'gcpSslPolicy',
  [services.serviceAccount]: 'gcpServiceAccount',
  [services.apiKey]: 'gcpApiKey',
  [services.computeProject]: 'gcpComputeProject',
  [services.dataprocCluster]: 'gcpDataprocCluster',
  [services.dataprocAutoscalingPolicy]: 'gcpDataprocAutoscalingPolicy',
  [services.dataprocJob]: 'gcpDataprocJob',
  [services.dataprocWorkflowTemplate]: 'gcpDataprocWorkflowTemplate',
  [services.aiPlatformNotebook]: 'gcpAiPlatformNotebook',
  [services.apiGatewayGateway]: 'gcpApiGatewayGateway',
  [services.apiGatewayApi]: 'gcpApiGatewayApi',
  [services.apiGatewayApiConfig]: 'gcpApiGatewayApiConfig',
  [services.firestoreDatabase]: 'gcpFirestoreDatabase',
  [services.essentialContacts]: 'gcpEssentialContact',
  [services.accessApproval]: 'gcpAccessApproval',
  tag: 'gcpTag',
}
