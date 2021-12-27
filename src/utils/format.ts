import { GcpRawTag } from '../types/generated'
import { TagMap } from '../types'

export const formatTagsFromMap = (tags: TagMap): GcpRawTag[] => {
  const result: GcpRawTag[] = []
  for (const [key, value] of Object.entries(tags)) {
    // We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
    result.push({ id: `${key}:${value}`, key, value })
  }
  return result
}

export const obfuscateSensitiveString = (s: string): string => {
  const stars = '*'.repeat(Math.min(30, s.length - 6))
  return s.slice(0, 3) + stars + s.slice(stars.length + 3, s.length)
}

export const enumKeyToString = (enumType: any, key: any): string => {
  const keys = Object.keys(enumType)
  const stateIndex = enumType[key]
  return keys[stateIndex]
}

export const etagToString = (etag: string | Uint8Array): string => {
  return etag instanceof Uint8Array ? Buffer.from(etag).toString('base64') : etag
}