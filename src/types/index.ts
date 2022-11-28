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

export interface GcpBilling {
  billingAccountId: string
  bigQueryDataset: string
}
export interface GcpCredentials {
  projectId: string
  keyFilename: string
  email?: string
}
export interface GcpConfig extends GcpCredentials {
  billing?: GcpBilling
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

export interface GcpServiceInput {
  regions: string
  config: GcpConfig
  rawData: rawDataInterface[]
}
