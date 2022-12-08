import CloudGraph, {
  Service,
  Opts,
  ProviderData,
  sortResourcesDependencies,
} from '@cloudgraph/sdk'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import chalk from 'chalk'
import { DocumentNode } from 'graphql'
import { isEmpty, merge, unionBy } from 'lodash'
import path from 'path'

import regions from '../enums/regions'
import serviceMap from '../enums/serviceMap'
import schemasMap from '../enums/schemasMap'
import services from '../enums/services'
import { GcpBilling, GcpCredentials, rawDataInterface } from '../types'
import { DEFAULT_REGION, DEFAULT_RESOURCES } from '../config/constants'
import relations from '../enums/relations'

export const enums = {
  services,
  regions,
  schemasMap,
}

export default class Provider extends CloudGraph.Client {
  constructor(config: any) {
    super(config)
    this.properties = enums
  }

  private properties: {
    services: { [key: string]: string }
    regions: string[]
  }

  async askForGcpCredentials(): Promise<GcpCredentials> {
    return this.interface.prompt([
      {
        type: 'input',
        message: 'Please input a valid project ID: ',
        name: 'projectId',
      },
      {
        type: 'input',
        message: 'Please input the path to your service account key file: ',
        name: 'keyFilename',
      },
      {
        type: 'input',
        message: 'Please input the account email address: ',
        name: 'email',
        when: answers => answers.keyFilename.match(/^.*\.(pem|p12)/g),
      },
    ])
  }

  async askForGcpBillingConfig(): Promise<GcpBilling> {
    return this.interface.prompt([
      {
        type: 'input',
        message: 'Please input a valid billing account id: ',
        name: 'billingAccountId',
      },
      {
        type: 'input',
        message: 'Please input a valid billing bigQuery Dataset: ',
        name: 'bigQueryDataset',
      },
    ])
  }

  logSelectedAccessRegionsAndResources(
    subscriptionsToLog: string[],
    regionsToLog: string,
    resourcesToLog: string
  ): void {
    this.logger.info(
      `Projects configured: ${chalk.green(subscriptionsToLog.join(', '))}`
    )
    this.logger.info(
      `Regions configured: ${chalk.green(regionsToLog.replace(/,/g, ', '))}`
    )
    this.logger.info(
      `Resources configured: ${chalk.green(resourcesToLog.replace(/,/g, ', '))}`
    )
  }

  private printGcpCredentials(account: GcpCredentials): void {
    this.logger.success(
      `projectId: ${chalk.underline.green(account.projectId)}`
    )
  }

  async configure(): Promise<{ [key: string]: any }> {
    const { flags = {}, cloudGraphConfig, ...providerSettings } = this.config
    const result: { [key: string]: any } = { ...providerSettings }

    const accounts: GcpCredentials[] = []
    let billingConfig: GcpBilling

    /**
     * Multi subscription setup flow
     */
    while (true) {
      if (accounts.length > 0) {
        const { addSubscription } = await this.interface.prompt([
          {
            type: 'confirm',
            message: 'Configure another GCP project?',
            name: 'addSubscription',
            default: true,
          },
        ])
        if (!addSubscription) {
          break
        }
      }
      const { projectId, keyFilename, email }: GcpCredentials =
        await this.askForGcpCredentials()
      if (projectId && keyFilename) {
        accounts.push({
          projectId,
          keyFilename,
          email,
        })
      }
    }

    if (!accounts.length) {
      accounts.push({ projectId: '', keyFilename: '' })
    }

    result.accounts = accounts

    /**
     * Billing bigQuery setup flow
     */
    if (isEmpty(billingConfig)) {
      const { addBillingConfig } = await this.interface.prompt([
        {
          type: 'confirm',
          message: 'Do you want to configure export cloud Billing data to BigQuery?',
          name: 'addBillingConfig',
          default: true,
        },
      ])
      if (addBillingConfig) {
        const { billingAccountId, bigQueryDataset } =
          await this.askForGcpBillingConfig()
        if (billingAccountId && bigQueryDataset) {
          billingConfig = { billingAccountId, bigQueryDataset }
        }
      }
    }
    result.billing = billingConfig || {}

    const { regions: regionsAnswer } = await this.interface.prompt([
      {
        type: 'checkbox',
        message: 'Select regions to scan',
        loop: false,
        name: 'regions',
        choices: regions.map((region: string) => ({
          name: region,
        })),
      },
    ])
    this.logger.debug(`Regions selected: ${regionsAnswer}`)
    if (!regionsAnswer.length) {
      this.logger.info(
        `No Regions selected, using default region: ${chalk.green(
          DEFAULT_REGION
        )}`
      )
      result.regions = DEFAULT_REGION
    } else {
      result.regions = regionsAnswer.join(',')
    }

    // Prompt for resources if flag set
    if (flags.resources) {
      const { resources: resourcesAnswer } = await this.interface.prompt([
        {
          type: 'checkbox',
          message: 'Select services to scan',
          loop: false,
          name: 'resources',
          choices: Object.values(services as { [key: string]: string }).map(
            (service: string) => ({
              name: service,
            })
          ),
        },
      ])
      this.logger.debug(resourcesAnswer)
      if (resourcesAnswer.length > 0) {
        result.resources = resourcesAnswer.join(',')
      } else {
        result.resources = DEFAULT_RESOURCES
      }
    } else {
      result.resources = DEFAULT_RESOURCES
    }
    const confettiBall = String.fromCodePoint(0x1f38a) // confetti ball emoji
    this.logger.success(
      `${confettiBall} ${chalk.green(
        'GCP'
      )} configuration successfully completed ${confettiBall}`
    )
    this.logSelectedAccessRegionsAndResources(
      result.accounts.map(acct => acct.roleArn ?? acct.profile),
      result.regions,
      result.resources
    )

    return result
  }

  /**
   * getSchema is used to get the schema for provider
   * @returns A string of graphql sub schemas
   */
  getSchema(): DocumentNode {
    const typesArray = loadFilesSync(path.join(__dirname), {
      recursive: true,
      extensions: ['graphql'],
    })
    return mergeTypeDefs(typesArray)
  }

  /**
   * Factory function to return service classes based on input service
   * @param service a service that is listed within the service map (current supported services)
   * @returns Instance of a service class to interact with that service
   */
  private getService(service: string): Service {
    if (serviceMap[service]) {
      return new serviceMap[service](this)
    }
  }

  private mergeRawData(
    oldData: rawDataInterface[],
    newData: rawDataInterface[]
  ): rawDataInterface[] {
    if (isEmpty(oldData)) {
      return newData
    }
    const result: rawDataInterface[] = []
    for (const entity of oldData) {
      try {
        const { name, data } = entity
        const newDataForEntity =
          newData.find(({ name: serviceName }) => name === serviceName).data ||
          {}
        if (newDataForEntity) {
          let mergedData = {}
          // if there is no old data for this service but there is new data, use the new data
          if (isEmpty(data)) {
            mergedData = newDataForEntity
          } else {
            // if we have data for an entity (like vpc) in both data sets, merge their data
            for (const region in data) {
              if (newDataForEntity[region]) {
                this.logger.debug(
                  `Found additional data for ${name} in ${region}, merging`
                )
                mergedData[region] = [
                  ...(data[region] ?? []),
                  ...newDataForEntity[region],
                ]
              } else {
                mergedData[region] = data[region]
              }
            }
          }
          result.push({
            name,
            data: mergedData,
          })
          // if not, just use the old data
        } else {
          result.push({
            name,
            data,
          })
        }
      } catch (error: any) {
        this.logger.debug(error)
        this.logger.error('There was an error merging raw data')
      }
    }
    return result
  }

  private async getRawData(
    account: GcpCredentials,
    opts?: Opts,
    billing?: GcpBilling
  ): Promise<rawDataInterface[]> {
    let { regions: configuredRegions, resources: configuredResources } =
      this.config
    const result: rawDataInterface[] = []
    if (!configuredRegions) {
      configuredRegions = this.properties.regions.join(',')
    } else {
      configuredRegions = [...new Set(configuredRegions.split(','))].join(',')
    }
    if (!configuredResources) {
      configuredResources = Object.values(this.properties.services).join(',')
    }
    const resourceNames: string[] = sortResourcesDependencies(relations, [
      ...new Set<string>(configuredResources.split(',')),
    ]).concat(['label', 'tag'])

    const { projectId } = account
    const config = { ...account, billing }

    this.printGcpCredentials(account)

    try {
      for (const resource of resourceNames) {
        const serviceClass = this.getService(resource)
        if (serviceClass && serviceClass.getData) {
          const data = await serviceClass.getData({
            regions: configuredRegions,
            config,
            opts,
            rawData: result,
          })
          result.push({
            name: resource,
            projectId,
            data,
          })
          this.logger.success(`${resource} scan completed`)
        } else {
          this.logger.warn(
            `Skipping service ${resource} as there was an issue getting data for it. Is it currently supported?`
          )
        }
      }
      this.logger.success(`Project: ${projectId} scan completed`)
    } catch (error: any) {
      this.logger.error('There was an error scanning sdk data')
      this.logger.debug(error)
    }
    return result
  }

  /**
   * getData is used to fetch all provider data specified in the config for the provider
   * @param opts: A set of optional values to configure how getData works
   * @returns Promise<any> All provider data
   */
  async getData({ opts }: { opts: Opts }): Promise<ProviderData> {
    const result: ProviderData = {
      entities: [],
      connections: {},
    }
    let { regions: configuredRegions, resources: configuredResources } =
      this.config
    const { accounts: configuredAccounts }: { accounts: GcpCredentials[] } =
      this.config
    if (!configuredRegions) {
      configuredRegions = this.properties.regions.join(',')
    } else {
      configuredRegions = [...new Set(configuredRegions.split(','))].join(',')
    }
    if (!configuredResources) {
      configuredResources = Object.values(this.properties.services).join(',')
    }

    // Billing config
    const { billing = {} } = this.config

    this.logSelectedAccessRegionsAndResources(
      configuredAccounts.map(acct => {
        return acct.projectId
      }),
      configuredRegions,
      configuredResources
    )

    let rawData: rawDataInterface[] = []
    // We need to keep a merged copy of raw data so we can handle connections but keep a separate raw
    // data so we can pass along accountId
    // TODO: find a better way to handle this
    let mergedRawData: rawDataInterface[] = []
    const crawledAccounts = []
    for (const account of configuredAccounts) {
      const { projectId } = account

      if (!crawledAccounts.find(val => val === projectId)) {
        crawledAccounts.push(projectId)
        const newRawData = await this.getRawData(account, opts, billing)
        mergedRawData = this.mergeRawData(mergedRawData, newRawData)
        rawData = [...rawData, ...newRawData]
      } else {
        this.logger.warn(
          // eslint-disable-next-line max-len
          `${projectId} has already been crawled, skipping...`
        )
      }
    }

    /**
     * Loop through the sdk data to format entities and build connections
     * 1. Format data with provider service format function
     * 2. build connections for data with provider service connections function
     * 3. spread new connections over result.connections
     * 4. push the array of formatted entities into result.entites
     */
    for (const serviceData of rawData) {
      try {
        const serviceClass = this.getService(serviceData.name)
        const entities: any[] = []
        for (const region of Object.keys(serviceData.data)) {
          const data = serviceData.data[region]
          if (!isEmpty(data)) {
            data.forEach((service: any) => {
              const formattedData = serviceClass.format({
                service,
                region,
                account: serviceData.projectId,
              })
              entities.push(formattedData)
              if (typeof serviceClass.getConnections === 'function') {
                // We need to loop through all configured regions here because services can be connected to things in another region
                let serviceConnections = {}
                for (const connectionRegion of configuredRegions.split(',')) {
                  // Use merged raw data for connections so we can connect across accounts
                  const newConnections = serviceClass.getConnections({
                    service,
                    region: connectionRegion,
                    account: serviceData.projectId,
                    data: mergedRawData,
                  })
                  // IF we have no pre existing connections for this service, use new connections
                  // IF we have pre existing connections, check if its for the same serivce id, if so
                  // check if the connections list for that id is empty, use new connections for that id if so.
                  // otherwise, merge connections by unioning on id of the connections
                  if (!isEmpty(serviceConnections)) {
                    const entries: [string, any][] =
                      Object.entries(newConnections)
                    for (const [key, value] of entries) {
                      // If there are no service connections for this entity i.e. { [serviceId]: [] }
                      // use new connections for that key
                      if (serviceConnections[key]) {
                        if (isEmpty(serviceConnections[key])) {
                          serviceConnections[key] = newConnections[key] ?? []
                        } else {
                          serviceConnections[key] = unionBy(
                            serviceConnections[key],
                            newConnections[key] ?? [],
                            'id'
                          )
                        }
                      } else {
                        serviceConnections = {
                          ...serviceConnections,
                          ...newConnections,
                        }
                      }
                    }
                  } else {
                    serviceConnections = newConnections
                  }
                }
                result.connections = {
                  ...result.connections,
                  ...serviceConnections,
                }
              }
            })
          }
        }
        /**
         * we have 2 things to check here, both dealing with multi-account senarios
         * 1. Do we already have an entity by this name in the result (i.e. both accounts have vpcs)
         * 2. Do we already have the data for an entity that lives in multiple accounts
         * (i.e. a cloudtrail that appears in a master and sandbox account).
         * If so, we need to merge the data. We use lodash merge to recursively merge arrays as there are
         * cases where acct A gets more data for service obj X than acct B does.
         * (i.e. Acct A cannot access the cloudtrail's tags but acct B can because the cloudtrail's arn points to acct B)
         */
        const existingServiceIdx = result.entities.findIndex(({ name }) => {
          return name === serviceData.name
        })
        if (existingServiceIdx > -1) {
          const existingData = result.entities[existingServiceIdx].data
          for (const currentEntity of entities) {
            const exisingEntityIdx = existingData.findIndex(
              ({ id }) => id === currentEntity.id
            )
            if (exisingEntityIdx > -1) {
              const entityToDelete = existingData[exisingEntityIdx]
              existingData.splice(exisingEntityIdx, 1)
              const entityToMergeIdx = entities.findIndex(
                ({ id }) => id === currentEntity.id
              )
              entities[entityToMergeIdx] = merge(entityToDelete, currentEntity)
            }
          }
          result.entities[existingServiceIdx] = {
            name: serviceData.name,
            mutation: serviceClass.mutation,
            data: [...existingData, ...entities],
          }
        } else {
          result.entities.push({
            name: serviceData.name,
            mutation: serviceClass.mutation,
            data: entities,
          })
        }
      } catch (error: any) {
        this.logger.error(
          `There was an error formatting/connecting service ${serviceData.name}`
        )
        this.logger.debug(error)
      }
    }

    return result
  }
}
