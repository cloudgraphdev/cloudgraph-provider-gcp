import services from './services'
import GcpProject from '../services/project'
import GcpKms from '../services/kms'
import GcpVpc from '../services/vpc'
import GcpIam from '../services/iam'
import GcpTag from '../services/tag'
import GcpLogBucket from '../services/logBucket'
import GcpLogSink from '../services/logSink'
import GcpLogView from '../services/logView'
import GcpStorageBucket from '../services/storageBucket'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.project]: GcpProject,
  [services.kms]: GcpKms,
  [services.vpc]: GcpVpc,
  [services.iamPolicy]: GcpIam,
  [services.logBucket]: GcpLogBucket,
  [services.logSink]: GcpLogSink,
  [services.logView]: GcpLogView,
  [services.storageBucket]: GcpStorageBucket,
  tag: GcpTag,
}
