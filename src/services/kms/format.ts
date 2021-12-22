import { google } from '@google-cloud/kms/build/protos/protos'

import { GcpKmsCryptoKey, GcpKmsKeyRing, GcpKmsImportJob } from '../../types/generated'
import { RawGcpKms, RawGcpKmsCryptoKey } from './data'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'
import { toISOString } from '../../utils/dateutils'

const formatCryptoKey = ({
  name,
  primary,
  purpose,
  createTime,
  nextRotationTime,
  rotationPeriod,
  versionTemplate,
  Labels = {},
  importOnly,
  destroyScheduledDuration,
}: RawGcpKmsCryptoKey): GcpKmsCryptoKey => {
  return {
    name,
    primaryName: primary?.name || '',
    primaryState: enumKeyToString(
      google.cloud.kms.v1.CryptoKeyVersion.CryptoKeyVersionState,
      primary?.state,
    ),
    primaryProtectionLevel: enumKeyToString(
      google.cloud.kms.v1.ProtectionLevel,
      primary?.protectionLevel,
    ),
    primaryAlgorithm: enumKeyToString(
      google.cloud.kms.v1.CryptoKeyVersion.CryptoKeyVersionAlgorithm,
      primary?.algorithm,
    ),
    primaryAttestationFormat: enumKeyToString(
      google.cloud.kms.v1.KeyOperationAttestation.AttestationFormat,
      primary?.attestation?.format,
    ),
    primaryAttestationContent: primary?.attestation?.content?.toString() || '',
    primaryCreateTime: toISOString(primary?.createTime?.seconds?.toString()),
    primaryGenerateTime: toISOString(primary?.generateTime?.seconds?.toString()),
    primaryDestroyTime: toISOString(primary?.destroyTime?.seconds?.toString()),
    primaryDestroyEventTime: toISOString(primary?.destroyEventTime?.seconds?.toString()),
    primaryImportJob: primary?.importJob || '',
    primaryImportTime: toISOString(primary?.importTime?.seconds?.toString()),
    primaryImportFailureReason: primary?.importFailureReason || '',
    primaryExternalProtectionLevelOptionsExternalKeyUri: 
      primary?.externalProtectionLevelOptions?.externalKeyUri || '',
    primaryReimportEligible: primary?.reimportEligible || false,
    purpose: enumKeyToString(google.cloud.kms.v1.CryptoKey.CryptoKeyPurpose, purpose),
    createTime: toISOString(createTime?.seconds?.toString()),
    nextRotationTime: toISOString(nextRotationTime?.seconds?.toString()),
    rotationPeriod: toISOString(rotationPeriod?.seconds?.toString()),
    versionTemplateAlgorithm: enumKeyToString(
      google.cloud.kms.v1.ProtectionLevel,
      versionTemplate?.algorithm,
    ),
    versionTemplateProtectionLevel: enumKeyToString(
      google.cloud.kms.v1.CryptoKeyVersion.CryptoKeyVersionAlgorithm,
      versionTemplate?.protectionLevel,
    ),
    labels: formatLabelsFromMap(Labels),
    importOnly,
    destroyScheduledDuration: toISOString(destroyScheduledDuration?.seconds?.toString()),
  }
}

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
    cryptoKeys,
    importJobs,
    Labels,
  } = service

  return {
    id: name,
    projectId: account,
    region,
    name,
    createTime: toISOString(createTime.seconds.toString()),
    cryptoKeys: cryptoKeys?.map(cryptoKey => formatCryptoKey(cryptoKey)) || [],
    importJobs: importJobs?.map(importJob => formatImportJob(importJob)) || [],
    labels: formatLabelsFromMap(Labels),
  }
}
