import { google } from '@google-cloud/kms/build/protos/protos'

import { GcpKmsCryptoKey } from '../../types/generated'
import { RawGcpKmsCryptoKey } from './data'
import { enumKeyToString, formatLabelsFromMap } from '../../utils/format'
import { toISOString } from '../../utils/dateutils'


export default ({
  service,
  account,
  region,
}: {
  service: RawGcpKmsCryptoKey
  account: string
  region: string
}): GcpKmsCryptoKey => {
  const {
    id,
    name,
    kmsKeyRingId,
    primary,
    purpose,
    createTime,
    nextRotationTime,
    rotationPeriod,
    versionTemplate,
    Labels = {},
    importOnly,
    destroyScheduledDuration,
  } = service

  return {
    id,
    projectId: account,
    region,
    name,
    kmsKeyRingId,
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
    rotationPeriod: rotationPeriod?.seconds?.toString(),
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
