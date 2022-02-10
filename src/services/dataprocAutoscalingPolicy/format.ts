import {
  GcpDataprocAutoscalingPolicy
} from '../../types/generated'
import { RawGcpDataprocAutoscalingPolicy } from './data'
import { formatLabelsFromMap } from '../../utils/format'

export default ({
  service,
  region,
}: {
  service: RawGcpDataprocAutoscalingPolicy
  region: string
}): GcpDataprocAutoscalingPolicy => {
  const {
    id,
    projectId,
    name,
    basicAlgorithm = {},
    workerConfig = {},
    secondaryWorkerConfig = {},
    Labels = {},
  } = service

  return {
    id,
    projectId,
    region,
    name,
    basicAlgorithmYarnConfigGracefulDecommissionTimeout: basicAlgorithm?.yarnConfig?.gracefulDecommissionTimeout?.seconds?.toString() || '',
    basicAlgorithmYarnConfigScaleUpFactor: basicAlgorithm?.yarnConfig?.scaleUpFactor || 0.0,
    basicAlgorithmYarnConfigScaleDownFactor: basicAlgorithm?.yarnConfig?.scaleDownFactor || 0.0,
    basicAlgorithmYarnConfigScaleUpMinWorkerFraction: basicAlgorithm?.yarnConfig?.scaleUpMinWorkerFraction || 0.0,
    basicAlgorithmYarnConfigScaleDownMinWorkerFraction: basicAlgorithm?.yarnConfig?.scaleDownMinWorkerFraction || 0.0,
    basicAlgorithmCooldownPeriod: basicAlgorithm?.cooldownPeriod?.seconds?.toString() || '',
    workerConfigMinInstances: workerConfig?.minInstances || 0,
    workerConfigMaxInstances: workerConfig?.maxInstances || 0,
    workerConfigWeight: workerConfig?.weight || 0,
    secondaryWorkerConfigMinInstances: secondaryWorkerConfig?.minInstances || 0,
    secondaryWorkerConfigMaxInstances: secondaryWorkerConfig?.maxInstances || 0,
    secondaryWorkerConfigWeight: secondaryWorkerConfig?.weight || 0,
    labels: formatLabelsFromMap(Labels),
  }
}
