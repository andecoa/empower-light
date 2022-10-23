import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, Device } from '../types'

const fetcher: Fetcher<Device[], string> = (url: string) =>
  axios(url)
    .then((r) => r.data)
    .catch((err) => {
      throw { message: err?.response?.data?.error }
    })

export const useDevices = () => {
  const { data, error } = useSWR<Device[], APIError>('/api/devices', fetcher)
  return { data, isLoading: !error && !data, error }
}
