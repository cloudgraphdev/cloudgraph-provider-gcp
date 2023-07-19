import CloudGraph from '@cloudgraph/sdk'
import { ProviderError } from '@cloudgraph/sdk/dist/src/types'
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

const errorsHistory: ProviderError[] = []

export function getAllProviderErrors(): ProviderError[] {
  return errorsHistory
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

  errorsHistory.push({
    service,
    function: functionName,
    message: err?.message,
  })
}
