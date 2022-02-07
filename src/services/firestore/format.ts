import { GcpFirestoreDatabase } from '../../types/generated'
import { RawGcpFirestoreDatabase } from './data'

export default ({
  service,
}: {
  service: RawGcpFirestoreDatabase
  region: string
}): GcpFirestoreDatabase => {
  const {
    id,
    projectId,
    region,
    name,
    createTime,
    updateTime,
    locationId,
    type,
    concurrencyMode,
    appEngineIntegrationMode,
    keyPrefix,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    createTime,
    updateTime,
    locationId,
    type,
    concurrencyMode,
    appEngineIntegrationMode,
    keyPrefix,
  }
}
