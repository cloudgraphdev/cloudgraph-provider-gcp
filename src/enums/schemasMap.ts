import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.firewall]: 'gcpFirewall',
  [services.project]: 'gcpProject',
  [services.kms]: 'gcpKmsKeyRing',
  [services.dnsManagedZone]: 'gcpDnsManagedZone',
  [services.dnsPolicy]: 'gcpDnsPolicy',
  [services.vpc]: 'gcpVpcConnector',
  [services.iamPolicy]: 'gcpIamPolicy',
  [services.logBucket]: 'gcpLogBucket',
  [services.logSink]: 'gcpLogSink',
  [services.logView]: 'gcpLogView',
  [services.folder]: 'gcpFolder',
  [services.organization]: 'gcpOrganization',
  [services.secretManager]: 'gcpSecret',
  [services.network]: 'gcpNetwork',
  [services.subnet]: 'gcpSubnet',
  [services.vmInstance]: 'gcpVmInstance',
  [services.logMetric]: 'gcpLogMetric',
  [services.alertPolicy]: 'gcpAlertPolicy',
  [services.cloudFunction]: 'gcpCloudFunction',
  tag: 'gcpTag',
}
