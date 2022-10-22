import useSWR, { Fetcher } from 'swr'
import type { APIError, DeviceConfig } from '../types'

const fetcher: Fetcher<DeviceConfig, string> = (url: string) =>
  fetch(url).then((r) => r.json())

export const useDeviceConfig = (deviceId: string) => {
  const { data, error } = useSWR<DeviceConfig, APIError>(
    `/api/device-config/${deviceId}`,
    fetcher
  )
  return { data, isLoading: !error && !data, isError: error }
}
