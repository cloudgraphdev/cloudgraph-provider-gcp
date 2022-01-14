import cuid from 'cuid'
import { google } from '@google-cloud/bigquery-connection/build/protos/protos'
import { GcpBigQueryConnection } from '../../types/generated'
import { enumKeyToString } from '../../utils/format'
import { RawGcpBigqueryConnection } from './data'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpBigqueryConnection
  account: string
  region: string
}): GcpBigQueryConnection => {
  const {
    id,
    name,
    friendlyName,
    description,
    hasCredential,
    creationTime,
    lastModifiedTime,
    cloudSql = {},
    aws = {},
    cloudSpanner = {},
  } = service

  return {
    id: id || cuid(),
    name,
    projectId: account,
    region,
    friendlyName,
    description,
    hasCredential,
    creationTime: toISOString(creationTime?.toString()),
    lastModifiedTime: toISOString(lastModifiedTime?.toString()),
    cloudSqlInstanceId: cloudSql?.instanceId || '',
    cloudSqlDatabase: cloudSql?.database || '',
    cloudSqlType: enumKeyToString(google.cloud.bigquery.connection.v1.CloudSqlProperties.DatabaseType, cloudSql?.type),
    awsCrossAccountRoleIamRoleId: aws?.crossAccountRole?.iamRoleId || '',
    awsCrossAccountRoleIamUserId: aws?.crossAccountRole?.iamUserId || '',
    awsCrossAccountRoleExternalId: aws?.crossAccountRole?.externalId || '',
    awsAccessRoleIamRoleId: aws?.accessRole?.iamRoleId || '',
    awsAccessRoleIdentity: aws?.accessRole?.identity || '',
    cloudSpannerDatabase:  cloudSpanner?.database || '',
    cloudSpannerUseParallelism: cloudSpanner?.useParallelism || false,
  }
}
