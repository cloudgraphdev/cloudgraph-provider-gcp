import { GcpBilling } from '../../types/generated'
import { RawGcpBilling } from './data'
import { formatCostData } from './utils'

export default ({
  service,
  account,
  region,
}: {
  service: RawGcpBilling
  account: string
  region: string
}): GcpBilling => {
  const {
    totalCostLast30Days,
    totalCostMonthToDate,
    last30DaysDailyAverage,
    monthToDateDailyAverage,
    monthToDate = {},
    last30Days = {},
  } = service
  const formattedMonthToDate = formatCostData(monthToDate)
  const formattedLast30Days = formatCostData(last30Days)
  const formattedLast30DailyAverage = formatCostData(last30DaysDailyAverage)
  const formattedMonthToDateDailyAverage = formatCostData(
    monthToDateDailyAverage
  )
  return {
    id: `billing:${account}`,
    projectId: account,
    region,
    totalCostMonthToDate,
    totalCostLast30Days,
    monthToDate: formattedMonthToDate,
    last30Days: formattedLast30Days,
    monthToDateDailyAverage: formattedMonthToDateDailyAverage,
    last30DaysDailyAverage: formattedLast30DailyAverage,
  }
}
