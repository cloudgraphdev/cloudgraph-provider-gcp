import cuid from 'cuid'
import { etagToString } from '../../utils/format'
import { GcpIamPolicy } from '../../types/generated'
import { RawGcpIamPolicy } from './data'

export default ({
  service,
  region,
}: {
  service: RawGcpIamPolicy
  region: string
}): GcpIamPolicy => {
  const {
    id,
    projectId,
    version,
    bindings,
    auditConfigs,
    etag,
    folderId,
    storageBucketId,
    cryptoKeyId
  } = service

  return {
    id,
    projectId,
    folderId,
    storageBucketId,
    cryptoKeyId,
    region,
    version,
    bindings: bindings.map(binding => ({
      id: cuid(),
      ...binding,
    })),
    auditConfigs: auditConfigs?.map(config => ({
      id: cuid(),
      ...config,
      auditLogConfigs: config?.auditLogConfigs?.map(logConfig => ({
        id: cuid(),
        ...logConfig,
      })),
    })),
    etag: etagToString(etag),
  }
}
