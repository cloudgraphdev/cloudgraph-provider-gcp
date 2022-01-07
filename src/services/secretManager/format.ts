import cuid from 'cuid'
import { GcpSecret } from '../../types/generated'
import { RawGcpSecret } from './data'
import { formatLabelsFromMap } from '../../utils/format'
import { toISOString } from '../../utils/dateutils'

export default ({
  service,
  region,
}: {
  service: RawGcpSecret
  region: string
}): GcpSecret => {
  const {
    id,
    projectId,
    name,
    replication,
    createTime,
    labels,
    topics,
    expireTime,
    ttl,
    etag,
    rotation,
  } = service

  return {
    id,
    projectId,
    name,
    region,
    replication: {
      automatic: {
        customerManagedEncryption: {
          kmsKeyName: replication?.automatic?.customerManagedEncryption?.kmsKeyName,
        },
      },
      userManaged: {
        replicas: replication?.userManaged?.replicas?.map(replica => ({
          id: cuid(),
          location: replica?.location,
          customerManagedEncryption: {
            kmsKeyVersionName: replica?.customerManagedEncryption?.kmsKeyName,
          },
        })),
      },
    },
    createTime: toISOString(createTime?.seconds?.toString()),
    labels: formatLabelsFromMap(labels),
    topics: topics?.map(topic => ({
      id: cuid(),
      name: topic?.name,
    })),
    expireTime: toISOString(expireTime?.seconds?.toString()),
    ttl: {
      seconds: ttl?.seconds?.toString(), 
      nanos: ttl?.nanos,
    },
    etag,
    rotation: {
      nextRotationTime: toISOString(rotation?.nextRotationTime?.seconds?.toString()),
      rotationPeriod: {
        seconds: rotation?.rotationPeriod?.seconds.toString(),
        nanos: rotation?.rotationPeriod?.nanos,
      },
    },
  }
}
