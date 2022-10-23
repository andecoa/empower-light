import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, TelemetryConfig } from '../types'

const fetcher: Fetcher<TelemetryConfig, string> = (url: string) =>
  axios(url)
    .then((r) => r.data)
    .catch((err) => {
      throw { message: err?.response?.data?.error }
    })

export const useTelemetryConfig = (deviceId: string) => {
  const { data, error } = useSWR<TelemetryConfig, APIError>(
    `/api/telemetry-config/${deviceId}`,
    fetcher
  )
  return { data, isLoading: !error && !data, error }
}
