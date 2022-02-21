import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getData from './data'
import mutation from './mutation'

export default class GcpApiGatewayGateway extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = mutation;
}
