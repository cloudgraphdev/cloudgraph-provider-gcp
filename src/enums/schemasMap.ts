import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.projects]: 'gcpProject',
  [services.vpc]: 'gcpVpcConnector',
  [services.iam]: 'gcpIamPolicy',
  tag: 'gcpTag',
}
