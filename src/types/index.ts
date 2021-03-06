export interface Tags {
  key: string
  value: string
}

export interface TagMap {
  [property: string]: string
}

export interface LabelMap {
  [property: string]: string
}

export interface KeyValueMapMap {
  [k: string]: string | number | boolean | Long
}

export interface GcpServiceInput {
  regions: string
  config: GcpCredentials
  rawData: rawDataInterface[]
}

export interface GcpCredentials {
  projectId: string
  keyFilename: string
  email?: string
}

export interface rawDataInterface {
  name: string
  projectId?: string
  region?: string
  data: any
  labels?: LabelMap
  tags?: TagMap
  network?: string[]
  subnet?: string[]
  vpcConnector?: string[]
}
