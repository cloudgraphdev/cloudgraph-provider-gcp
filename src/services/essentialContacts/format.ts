import { google } from '@google-cloud/essential-contacts/build/protos/protos'
import { GcpEssentialContact } from '../../types/generated'
import { RawGcpEssentialContact } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

export default ({
  service,
}: {
  service: RawGcpEssentialContact
  region: string
}): GcpEssentialContact => {
  const {
    id,
    projectId,
    region,
    name,
    email,
    notificationCategorySubscriptions,
    languageTag,
    validationState,
    validateTime,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    email,
    notificationCategorySubscriptions: notificationCategorySubscriptions.map(subscription => 
      enumKeyToString(google.cloud.essentialcontacts.v1.NotificationCategory, subscription)
    ),
    languageTag,
    validationState: enumKeyToString(google.cloud.essentialcontacts.v1.ValidationState, validationState),
    validateTime: toISOString(validateTime?.seconds?.toString()),
  }
}
