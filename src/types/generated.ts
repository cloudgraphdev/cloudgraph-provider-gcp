export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Tag = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GcpProject = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['String']>;
  deleteTime?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  labels?: Maybe<Array<Maybe<Tag>>>;
  vpc?: Maybe<Array<Maybe<GcpVpcConnector>>>;
};

export type GcpTag = {
  id: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
};

export type GcpVpcConnector = {
  id: Scalars['String'];
  projectId: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  ipCidrRange?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  minThroughput?: Maybe<Scalars['Int']>;
  maxThroughput?: Maybe<Scalars['Int']>;
  connectedProjects?: Maybe<Array<Maybe<Scalars['String']>>>;
  subnet?: Maybe<Scalars['String']>;
  project?: Maybe<Array<Maybe<GcpProject>>>;
};
