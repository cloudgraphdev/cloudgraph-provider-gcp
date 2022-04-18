import cuid from 'cuid'
import { google } from '@google-cloud/bigquery-data-transfer/build/protos/protos'
import { GcpKeyValue, GcpKeyValues, GcpRawLabel, GcpRawTag, GcpBigQueryDataTransferParam } from '../types/generated'
import { TagMap, LabelMap, KeyValueMapMap } from '../types'

export const formatKeyValueMap = (keyValueMap: KeyValueMapMap): GcpKeyValue[] => {
  return Object.keys(keyValueMap || {}).map(key => ({
    id: cuid(),
    key,
    value: keyValueMap[key].toString(),
  }))
}

export const formatKeyValuesMap = (keyValueMap: KeyValueMapMap): GcpKeyValues[] => {
  return Object.keys(keyValueMap || {}).map(key => ({
    id: cuid(),
    key,
    values: keyValueMap[key] as string[]
  }))
}

// We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
export const formatLabelsFromMap = (labels: LabelMap): GcpRawLabel[] => formatKeyValueMap(labels)

// We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
export const formatTagsFromMap = (tags: TagMap): GcpRawTag[] => formatKeyValueMap(tags)

// We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
export const formatKeyValuesFromMap = (tags: TagMap): GcpKeyValues[] => formatKeyValuesMap(tags)

export const obfuscateSensitiveString = (s: string): string => {
  const stars = '*'.repeat(Math.min(30, s.length - 6))
  return s.slice(0, 3) + stars + s.slice(stars.length + 3, s.length)
}

export const enumKeyToString = (enumType: any, key: any): string => {
  if (!key)
    return '';
  const keys = Object.keys(enumType)
  const stateIndex = enumType[key]
  return keys[stateIndex] || key
}

export const etagToString = (etag: string | Uint8Array): string => {
  return etag instanceof Uint8Array ? Buffer.from(etag).toString('base64') : etag
}

export const formatParamFields = (data: { [k: string]: google.protobuf.IValue }|null): GcpBigQueryDataTransferParam[] => {
  const result = {};
  const recurse = (cur, prop: string) => {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for (let i = 0, l = cur.length; i < l; i += 1)
        recurse(cur[i], `${prop}[${i}]`)
      if (cur.length === 0)
          result[prop] = [];
    } else {
      let isEmpty = true
      for (const p of Object.keys(cur)) {
        isEmpty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (isEmpty && prop)
          result[prop] = {}
    }
  }
  recurse(data, '');
  return Object.keys(result).map(key => ({
    id: cuid(),
    key,
    value: result[key].toString()
  }))
}