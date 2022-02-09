import cuid from 'cuid'
import { google } from '@google-cloud/notebooks/build/protos/protos'
import {
  GcpAiPlatformNotebook,
  GcpAiPlatformNotebookDisk,
} from '../../types/generated'
import { enumKeyToString, formatKeyValueMap, formatLabelsFromMap } from '../../utils/format'
import { toISOString } from '../../utils/dateutils'
import { RawGcpAiPlatformNotebook } from './data'


// TODO disk object is not available in the v1beta1 version.
// This definition is base on unused type of v1 version and SDK document:
// https://cloud.google.com/vertex-ai/docs/workbench/reference/rest/v1/projects.locations.instances
const formatDisk = (disk: google.cloud.notebooks.v1.Instance.IDisk): GcpAiPlatformNotebookDisk => {
  const {
    autoDelete,
    boot,
    deviceName,
    diskSizeGb,
    guestOsFeatures = [],
    index,
    kind,
    licenses = [],
    mode,
    source,
    type,
  } = disk

  return {
    id: cuid(),
    autoDelete,
    boot,
    deviceName,
    diskSizeGb: diskSizeGb?.toString() || '0',
    guestOsFeaturesTypes: guestOsFeatures?.map(f => f?.type),
    index: index?.toString() || '0',
    kind,
    licenses,
    mode,
    source,
    type,
  }
}

// TODO object definition is based on the v1beta1 version
// Couple fields are missing from the document
// Need to update the SDK once a stable version is released
export default ({
  service,
  account,
  region,
}: {
  service: RawGcpAiPlatformNotebook
  account: string
  region: string
}): GcpAiPlatformNotebook => {
  const {
    id,
    projectId,
    Labels = {},
    name,
    vmImage = {},
    containerImage = {},
    postStartupScript,
    proxyUri,
    instanceOwners = [],
    serviceAccount,
    // serviceAccountScopes = [], // v1
    machineType,
    acceleratorConfig = {},
    state,
    installGpuDriver,
    customGpuDriverPath,
    bootDiskType,
    bootDiskSizeGb,
    dataDiskType,
    dataDiskSizeGb,
    noRemoveDataDisk,
    diskEncryption,
    // disks = [],  // v1
    // shieldedInstanceConfig,  // v1
    noPublicIp,
    noProxyAccess,
    // network,
    // subnet,
    metadata,
    // tags = [], // v1
    // upgradeHistory, // v1
    // nicType, // v1
    // reservationAffinity, // v1
    createTime,
    updateTime,
  } = service

  return {
    id: id || cuid(),
    projectId,
    region,
    labels: formatLabelsFromMap(Labels),
    name,
    vmImageProject: vmImage?.project || '',
    vmImageImageName: vmImage?.imageName || '',
    vmImageImageFamily: vmImage?.imageFamily || '',
    containerImageRepository: containerImage?.repository || '',
    containerImageTag: containerImage?.tag || '',
    postStartupScript,
    proxyUri,
    instanceOwners,
    serviceAccount,
    machineType,
    acceleratorConfigType: enumKeyToString(google.cloud.notebooks.v1beta1.Instance.AcceleratorType, acceleratorConfig?.type),
    acceleratorConfigCoreCount: acceleratorConfig?.coreCount?.toString() || '0',
    state: enumKeyToString(google.cloud.notebooks.v1.Instance.State, state),
    installGpuDriver,
    customGpuDriverPath,
    bootDiskType: enumKeyToString(google.cloud.notebooks.v1.Instance.DiskType, bootDiskType),
    bootDiskSizeGb: bootDiskSizeGb?.toString() || '0',
    dataDiskType: enumKeyToString(google.cloud.notebooks.v1.Instance.DiskType, dataDiskType),
    dataDiskSizeGb: dataDiskSizeGb?.toString() || '0',
    noRemoveDataDisk,
    diskEncryption: enumKeyToString(google.cloud.notebooks.v1.Instance.DiskEncryption, diskEncryption),
    noPublicIp,
    noProxyAccess,
    metadata: formatKeyValueMap(metadata),
    createTime: toISOString(createTime?.seconds?.toString()),
    updateTime: toISOString(updateTime?.seconds?.toString()),
    // kmsKey - connection
    // network - connection
    // subnet - connection
  }
}
