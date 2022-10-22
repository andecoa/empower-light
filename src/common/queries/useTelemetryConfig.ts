import useSWR, { Fetcher } from 'swr'
import type { APIError, TelemetryConfig } from '../types'

const fetcher: Fetcher<TelemetryConfig, string> = (url: string) =>
  fetch(url).then((r) => r.json())

export const useTelemetryConfig = (deviceId: string) => {
  const { data, error } = useSWR<TelemetryConfig, APIError>(
    `/api/telemetry-config/${deviceId}`,
    fetcher
  )
  return { data, isLoading: !error && !data, isError: error }
}
