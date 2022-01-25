import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getData from './data'
import getConnections from './connections'
import mutation from './mutation'

export default class GcpCdnUrlMap extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = mutation;

  getConnections = getConnections.bind(this)
}
