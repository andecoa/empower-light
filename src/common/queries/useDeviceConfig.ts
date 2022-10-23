import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, DeviceConfig } from '../types'

const fetcher: Fetcher<DeviceConfig, string> = (url: string) =>
  axios(url)
    .then((r) => r.data)
    .catch((err) => {
      throw { message: err?.response?.data?.error }
    })

export const useDeviceConfig = (deviceId: string) => {
  const { data, error } = useSWR<DeviceConfig, APIError>(
    `/api/device-config/${deviceId}`,
    fetcher
  )
  return { data, isLoading: !error && !data, error }
}
