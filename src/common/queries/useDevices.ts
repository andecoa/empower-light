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
  // I'm assuming device ID is suffixed with their relationships
  const normalizedData = data?.map((device) => ({
    ...device,
    _id: device._id.split('.')[0],
  }))
  return { data: normalizedData, isLoading: !error && !data, error }
}
