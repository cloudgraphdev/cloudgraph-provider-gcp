import cuid from 'cuid'
import { etagToString } from '../../utils/format'
import { GcpIamPolicy } from '../../types/generated'
import { RawGcpIamPolicy } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpIamPolicy
  account: string
  region: string
}): GcpIamPolicy => {
  const {
    id,
    version,
    bindings,
    etag,
  } = service

  return {
    id,
    projectId: account,
    version,
    bindings: bindings.map(binding => ({
      id: cuid(),
      ...binding,
    })),
    etag: etagToString(etag),
  }
}
