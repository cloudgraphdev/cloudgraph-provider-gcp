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
import GcpFirewall from '../services/firewall'
import GcpFolder from '../services/folder'
import GcpOrganization from '../services/organization'
import GcpSecretManager from '../services/secretManager'
import GcpNetwork from '../services/network'
import GcpSubnet from '../services/subnet'
import GcpVmInstance from '../services/vmInstance'

/**
 * serviceMap is an object that contains all currently supported services
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.firewall]: GcpFirewall,
  [services.project]: GcpProject,
  [services.kms]: GcpKms,
  [services.vpc]: GcpVpc,
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
  tag: GcpTag,
}
