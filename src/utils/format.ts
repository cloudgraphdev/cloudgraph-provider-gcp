import { GcpRawLabel } from '../types/generated'
import { LabelMap } from '../types'

export const formatLabelsFromMap = (labels: LabelMap): GcpRawLabel[] => {
  return Object.keys(labels).map(key => ({
    // We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
    id:`${key}:${labels[key]}`,
    key,
    value: labels[key],
  }))
}

export const obfuscateSensitiveString = (s: string): string => {
  const stars = '*'.repeat(Math.min(30, s.length - 6))
  return s.slice(0, 3) + stars + s.slice(stars.length + 3, s.length)
}

export const enumKeyToString = (enumType: any, key: any): string => {
  if (!key)
    return '';
  const keys = Object.keys(enumType)
  const stateIndex = enumType[key]
  return keys[stateIndex]
}

export const etagToString = (etag: string | Uint8Array): string => {
  return etag instanceof Uint8Array ? Buffer.from(etag).toString('base64') : etag
}