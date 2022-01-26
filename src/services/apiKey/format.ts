import cuid from 'cuid'
import { GcpApiKey } from '../../types/generated'
import { RawGcpApiKey } from './data'

export default ({
  service,
  region,
}: {
  service: RawGcpApiKey
  region: string
}): GcpApiKey => {
  const {
    id,
    projectId,
    name,
    displayName,
    keyString,
    createTime,
    updateTime,
    deleteTime,
    restrictions,
    etag,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    displayName,
    keyString,
    createTime,
    updateTime,
    deleteTime,
    restrictions: {
      ...restrictions,
      apiTargets: restrictions?.apiTargets?.map(target => ({
        id: cuid(),
        ...target,
      })),
      androidKeyRestrictions: {
        allowedApplications: restrictions?.androidKeyRestrictions?.allowedApplications?.map(app => ({
          id: cuid(),
          ...app,
        })),
      },
    },
    etag,
  }
}
