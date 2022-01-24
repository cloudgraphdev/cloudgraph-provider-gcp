import cuid from 'cuid'
import { GcpServiceAccount } from '../../types/generated'
import { RawGcpServiceAccount } from './data'

export default ({
  service,
}: {
  service: RawGcpServiceAccount
  account: string
  region: string
}): GcpServiceAccount => {
  const {
    id,
    projectId,
    name,
    email,
    displayName,
    etag,
    oauth2ClientId,
    region,
    keys = [],
  } = service

  const serviceAccountKeys = keys.map(key => ({ id: cuid(), ...key }))

  return {
    id,
    projectId,
    name,
    email,
    displayName,
    etag,
    oauth2ClientId,
    region,
    keys: serviceAccountKeys,
  }
}
