import { google } from '@google-cloud/access-approval/build/protos/protos'
import { GcpAccessApproval } from '../../types/generated'
import { RawGcpAccessApproval } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
}: {
  service: RawGcpAccessApproval
  region: string
}): GcpAccessApproval => {
  const {
    id,
    projectId,
    region,
    name,
    requestedResourceName,
    requestedResourceProperties,
    requestedReason,
    requestedLocations,
    requestTime,
    requestedExpiration,
    approve,
    dismiss,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    requestedResourceName,
    requestedResourceProperties: {
      excludesDescendants: requestedResourceProperties?.excludesDescendants,
    },
    requestedReason: {
      type: enumKeyToString(google.cloud.accessapproval.v1.AccessReason.Type, requestedReason?.type),
      detail: requestedReason?.detail,
    },
    requestedLocations: {
      principalOfficeCountry: requestedLocations?.principalOfficeCountry,
      principalPhysicalLocationCountry: requestedLocations?.principalPhysicalLocationCountry,
    },
    requestTime: toISOString(requestTime?.seconds?.toString()),
    requestedExpiration: toISOString(requestedExpiration?.seconds?.toString()),
    approve: {
      approveTime: toISOString(approve.approveTime?.seconds?.toString()),
      expireTime: toISOString(approve.expireTime?.seconds?.toString()),
      invalidateTime: toISOString(approve.invalidateTime?.seconds?.toString()),
      signatureInfo: {
        signature: approve?.signatureInfo?.signature ? String.fromCharCode.apply(approve?.signatureInfo?.signature) : '',
        googlePublicKeyPem: approve?.signatureInfo?.googlePublicKeyPem,
        customerKmsKeyVersion: approve?.signatureInfo?.customerKmsKeyVersion,
      },
      autoApproved: approve?.autoApproved,
    },
    dismiss: {
      dismissTime: toISOString(dismiss.dismissTime?.seconds?.toString()),
      implicit: dismiss.implicit,
    },
  }
}
