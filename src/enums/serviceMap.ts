import services from './services'
import GcpProject from '../services/project'
import GcpVpc from '../services/vpc'
import GcpTag from '../services/tag'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.projects]: GcpProject,
  [services.vpc]: GcpVpc,
  tag: GcpTag,
}
