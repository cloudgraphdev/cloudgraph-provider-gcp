import cuid from 'cuid'
import { GcpServiceAccount } from '../../types/generated'
import { RawGcpServiceAccount } from './data'

// id: String! @id @search(by: [hash])
// projectId: String! @search(by: [hash, regexp])
// name: String @search(by: [hash, regexp])
// email: String @search(by: [hash, regexp])
// displayName: String @search(by: [hash, regexp])
// etag: String @search(by: [hash, regexp])
// oauth2ClientId: String @search(by: [hash, regexp])
// region: String @search(by: [hash, regexp])

export default ({
  service,
}: {
  service: RawGcpServiceAccount
  account: string
  region: string
}): GcpServiceAccount => {
  const {
    uniqueId: id,
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
