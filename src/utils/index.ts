import CloudGraph from '@cloudgraph/sdk'
import environment from '../config/environment'

const { logger } = CloudGraph

export function initTestConfig(): void {
  jest.setTimeout(900000)
}

export function initTestEndpoint(service?: string): string | undefined {
  const endpoint =
    (environment.NODE_ENV === 'test' && environment.GCP_ENDPOINT) || undefined
  service && endpoint && logger.info(`${service} getData in test mode!`)
  return endpoint
}

export function generateGcpErrorLog(
  service: string,
  functionName: string,
  err?: Error
): void {
  logger.warn(
    `There was a problem getting data for service ${service}, CG encountered an error calling ${functionName}`
  )
  logger.debug(err.message)
}
