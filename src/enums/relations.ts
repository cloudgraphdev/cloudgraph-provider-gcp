import services from './services'

/**
 * Set relations between services to data sharing
 * The key of the object represents the parent or base service,
 * it might contain a array of dependant or childs that must be executed after the parent
 */
export default {
  [services.storageBucket]: [services.iamPolicy],
  [services.organization]: [services.folder],
  [services.logBucket]: [services.logView],
  [services.project]: [services.iamPolicy],
  [services.folder]: [services.iamPolicy],
  [services.kms]: [services.kmsCryptoKeys],
  [services.kmsCryptoKeys]: [services.iamPolicy]
}
