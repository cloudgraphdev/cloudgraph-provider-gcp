import cuid from 'cuid'
import { google } from '@google-cloud/asset/build/protos/protos'
import { etagToString } from '../../utils/format'
import { GcpAsset, GcpValue, GcpAssetSoftwarePackage } from '../../types/generated'
import { RawGcpAsset } from './data'
import { toISOString } from '../../utils/dateutils'
import { enumKeyToString } from '../../utils/format'

const parseGcpValue = (key: string, gcpValue: google.protobuf.IValue): GcpValue => ({
  id: cuid(),
  key,
  nullValue: enumKeyToString(google.protobuf.NullValue, gcpValue?.nullValue),
  numberValue: gcpValue?.numberValue,
  stringValue: gcpValue?.stringValue,
  boolValue: gcpValue?.boolValue,
  structValue: {
    fields: Object.keys(gcpValue?.structValue?.fields || {}).map(key => (
      parseGcpValue(key, gcpValue?.structValue?.fields[key])
    )),
  },
  listValue: {
    values: Object.keys(gcpValue?.listValue?.values || {}).map(key => (
      parseGcpValue(key, gcpValue?.listValue?.values[key])
    )),
  },
})

const parseSoftwarePackage = (softwarePackage: google.cloud.osconfig.v1.Inventory.ISoftwarePackage): GcpAssetSoftwarePackage => ({
  ...softwarePackage,
  wuaPackage: {
    ...softwarePackage?.wuaPackage,
    categories: softwarePackage?.wuaPackage?.categories?.map(category => ({
      id: cuid(),
      ...category,
    })),
    lastDeploymentChangeTime: toISOString(softwarePackage?.wuaPackage?.lastDeploymentChangeTime?.seconds?.toString()),
  },
  qfePackage: {
    ...softwarePackage?.qfePackage,
    installTime: toISOString(softwarePackage?.qfePackage?.installTime?.seconds?.toString()),
  },
  windowsApplication: {
    ...softwarePackage?.windowsApplication,
    installDate: (new Date(softwarePackage?.windowsApplication?.installDate?.year, 
                          softwarePackage?.windowsApplication?.installDate?.month, 
                          softwarePackage?.windowsApplication?.installDate?.day))?.toISOString(),
  },
})

export default ({
  service,
  region,
}: {
  service: RawGcpAsset
  region: string
}): GcpAsset => {
  const {
    id,
    projectId,
    name,
    updateTime,
    assetType,
    resource,
    orgPolicy,
    accessPolicy,
    accessLevel,
    servicePerimeter,
    osInventory,
    relatedAssets,
    ancestors,
  } = service

  return {
    id,
    projectId,
    region,
    name,
    updateTime: toISOString(updateTime?.seconds?.toString()),
    assetType,
    resource: {
      ...resource,
      data: {
        fields: Object.keys(resource?.data?.fields || {}).map(key => ({
          ...parseGcpValue(key, resource?.data?.fields[key]),
        })),
      },
    },
    orgPolicy: orgPolicy?.map(policy => ({
      id: cuid(),
      ...policy,
      etag: etagToString(policy?.etag),
      updateTime: toISOString(policy?.updateTime?.seconds?.toString()),
      listPolicy: {
        ...policy?.listPolicy,
        allValues: enumKeyToString(google.cloud.orgpolicy.v1.Policy.ListPolicy.AllValues, policy?.listPolicy?.allValues),
      },
    })),
    accessPolicy: {
      ...accessPolicy,
      createTime: toISOString(accessPolicy?.createTime?.seconds?.toString()),
      updateTime: toISOString(accessPolicy?.updateTime?.seconds?.toString()),
    },
    accessLevel: {
      ...accessLevel,
      basic: {
        ...accessLevel?.basic,
        conditions: accessLevel?.basic?.conditions?.map(condition => ({
          id: cuid(),
          ...condition,
          devicePolicy: {
            ...condition?.devicePolicy,
            allowedEncryptionStatuses: condition?.devicePolicy?.allowedEncryptionStatuses?.map(status => (
              enumKeyToString(google.identity.accesscontextmanager.type.DeviceEncryptionStatus, status)
            )),
            osConstraints: condition?.devicePolicy?.osConstraints?.map(constraint => ({
              id: cuid(),
              ...constraint,
              osType: enumKeyToString(google.identity.accesscontextmanager.type.OsType, constraint?.osType),
            })),
            allowedDeviceManagementLevels: condition?.devicePolicy?.allowedDeviceManagementLevels?.map(level => (
              enumKeyToString(google.identity.accesscontextmanager.type.DeviceManagementLevel, level)
            )),
          },
        })),
        combiningFunction: enumKeyToString(google.identity.accesscontextmanager.v1.BasicLevel.ConditionCombiningFunction, accessLevel?.basic?.combiningFunction),
      },
      createTime: toISOString(accessLevel?.createTime?.seconds?.toString()),
      updateTime: toISOString(accessLevel?.updateTime?.seconds?.toString()),
    },
    servicePerimeter: {
      ...servicePerimeter,
      createTime: toISOString(servicePerimeter?.createTime?.seconds?.toString()),
      updateTime: toISOString(servicePerimeter?.updateTime?.seconds?.toString()),
      perimeterType: enumKeyToString(google.identity.accesscontextmanager.v1.ServicePerimeter.PerimeterType, servicePerimeter?.perimeterType),
      spec: {

      },
    },
    osInventory: {
      ...osInventory,
      items: Object.keys(osInventory?.items || {}).map(key => ({
        id: cuid(),
        key,
        ...osInventory?.items[key],
        originType: enumKeyToString(google.cloud.osconfig.v1.Inventory.Item.OriginType, osInventory?.items[key]?.originType),
        createTime: toISOString(osInventory?.items[key]?.createTime?.seconds?.toString()),
        updateTime: toISOString(osInventory?.items[key]?.updateTime?.seconds?.toString()),
        type: enumKeyToString(google.cloud.osconfig.v1.Inventory.Item.Type, osInventory?.items[key]?.type),
        installedPackage: parseSoftwarePackage(osInventory?.items[key]?.installedPackage),
        availablePackage: parseSoftwarePackage(osInventory?.items[key]?.availablePackage),
      })),
      updateTime: toISOString(osInventory?.updateTime?.seconds?.toString()),
    },
    relatedAssets: {
      ...relatedAssets,
      assets: relatedAssets?.assets?.map(asset => ({
        id: cuid(),
        ...asset,
      })),
    },
    ancestors,
  }
}
