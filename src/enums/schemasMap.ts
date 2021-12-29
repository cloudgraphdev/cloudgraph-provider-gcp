import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.project]: 'gcpProject',
  [services.kms]: 'gcpKmsKeyRing',
  [services.vpc]: 'gcpVpcConnector',
  [services.iamPolicy]: 'gcpIamPolicy',
  [services.logBucket]: 'gcpLogBucket',
  [services.logSink]: 'gcpLogSink',
  [services.logView]: 'gcpLogView',
  tag: 'gcpTag',
}
