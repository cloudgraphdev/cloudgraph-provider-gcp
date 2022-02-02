import { google } from '@google-cloud/kms/build/protos/protos'

import { GcpKmsKeyRing, GcpKmsImportJob } from '../../types/generated'
import { RawGcpKms } from './data'
import { enumKeyToString } from '../../utils/format'
import { toISOString } from '../../utils/dateutils'

const formatImportJob = ({
  name,
  importMethod,
  protectionLevel,
  createTime,
  generateTime,
  expireTime,
  expireEventTime,
  state,
  attestation,
}: google.cloud.kms.v1.IImportJob): GcpKmsImportJob => {
  return {
    name,
    importMethod: enumKeyToString(google.cloud.kms.v1.ImportJob.ImportMethod, importMethod),
    protectionLevel: enumKeyToString(google.cloud.kms.v1.ProtectionLevel, protectionLevel),
    createTime: toISOString(createTime?.seconds?.toString()),
    generateTime: toISOString(generateTime?.seconds?.toString()),
    expireTime: toISOString(expireTime?.seconds?.toString()),
    expireEventTime: toISOString(expireEventTime?.seconds?.toString()),
    state: enumKeyToString(google.cloud.kms.v1.ImportJob.ImportJobState, state),
    attestationContent: enumKeyToString(google.cloud.kms.v1.KeyOperationAttestation.AttestationFormat, attestation?.content),
    attestationFormat: attestation?.content?.toString() || '',
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpKms
  account: string
  region: string
}): GcpKmsKeyRing => {
  const {
    name,
    createTime,
    importJobs,
  } = service

  return {
    id: name,
    projectId: account,
    region,
    name,
    createTime: toISOString(createTime.seconds.toString()),
    importJobs: importJobs?.map(importJob => formatImportJob(importJob)) || [],
  }
}
