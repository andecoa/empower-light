import { useTelemetryConfig } from '../common/queries/useTelemetryConfig'
import type { NextPage } from 'next'

const Telemetry: NextPage = () => {
  const { data, isLoading, isError } = useTelemetryConfig('ESP-9A6C07')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error encountered. Please try again.</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Telemetry
