import { Service } from '@cloudgraph/sdk';
import BaseService from '../base';
import getConnections from './connections';
import getData from './data'
import mutation from './mutation';

export default class GcpLabel extends BaseService implements Service {
  format = ({service}: {service: any}): any => service

  getConnections = getConnections.bind(this)

  getData = getData.bind(this)

  mutation = mutation;
}
