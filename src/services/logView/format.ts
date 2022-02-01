import { GcpLogView } from '../../types/generated'
import { RawGcpLogView } from './data'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  region,
}: {
  service: RawGcpLogView
  account: string
  region: string
}): GcpLogView => {
  const { id, name, projectId, description, createTime, updateTime, filter } =
    service

  return {
    id,
    projectId,
    name,
    region,
    description,
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    filter,
  }
}
