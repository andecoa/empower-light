import { useRouter } from 'next/router'
import moment from 'moment'
import { useEnergy } from '../../common/queries/useEnergy'
import { EnergyBarChart } from '../../components/EnergyBarChart'
import { useState } from 'react'
import { Energy } from '../../common/types'

const DeviceDetailsPage = () => {
  const router = useRouter()
  const deviceId = router.query.deviceId as string
  const { data, error, isLoading } = useEnergy(deviceId)
  const [monthYear, setMonthYear] = useState(() => moment().format('YYYY-MM'))

  const filteredData = data?.filter((row) => row.ts.startsWith(monthYear)) || []
  const getCumulativeEnergySum = () => {
    if (!filteredData) return []
    const sums: Energy[] = []
    filteredData.reduce(
      (prev, curr, i) => (sums[i] = { ...curr, ein: curr.ein + prev.ein }),
      { ein: 0 }
    )
    return sums
  }

  const cumulativeEnergyInSum = getCumulativeEnergySum()
  const energyInDollars =
    cumulativeEnergyInSum.length > 1
      ? (cumulativeEnergyInSum.at(-1).ein / 50).toFixed(2)
      : 0
  const energyInEmissions =
    cumulativeEnergyInSum.length > 1
      ? (cumulativeEnergyInSum.at(-1).ein / 400).toFixed(2)
      : 0

  const dateBack = () => {
    let current = moment(monthYear)
    current = moment(current).clone().subtract(1, 'months')
    setMonthYear(current.format('YYYY-MM'))
  }

  const dateForward = () => {
    let current = moment(monthYear)
    current = moment(current).clone().add(1, 'months')
    setMonthYear(current.format('YYYY-MM'))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Energy Dashboard - {deviceId}</h1>
        <div className="text-lg">
          <button
            onClick={dateBack}
            className="py-2 px-4 mr-2 border-2 bg-blue-300"
          >
            {'<'}
          </button>
          <span>{monthYear}</span>
          <button
            onClick={dateForward}
            className="py-2 px-4 ml-2 border-2 bg-blue-300 disabled:bg-gray-300"
            disabled={moment(monthYear).add(1, 'months') > moment()}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="mb-10 border rounded-xl drop-shadow-lg px-4 py-10">
        <h2 className="font-bold mb-2 text-center">
          Energy Generated and Consumed - {moment(monthYear).format('MMM yyyy')}
        </h2>
        <div className="w-full h-96">
          <EnergyBarChart data={filteredData} disableEOut={false} />
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="p-4 border w-1/3 rounded-xl drop-shadow-lg text-center">
          <h2 className="font-bold mb-10">Impact</h2>
          <div className="mb-10">
            <p className="text-5xl font-bold mb-2">${energyInDollars}</p>
            <p className="text-sm font-bold text-gray-500 uppercase">
              Generated
            </p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">{energyInEmissions}</p>
            <p className="text-sm font-bold text-gray-500 uppercase">
              grams C02/kwh
            </p>
          </div>
        </div>
        <div className="w-2/3 h-96 border rounded-xl drop-shadow-lg px-4 pt-10">
          <h2 className="font-bold mb-2 text-center">
            Cumulative Energy Generated
          </h2>
          <EnergyBarChart data={cumulativeEnergyInSum} disableEOut />
        </div>
      </div>
    </div>
  )
}

export default DeviceDetailsPage
