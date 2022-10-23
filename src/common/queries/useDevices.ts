import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, Device } from '../types'
import { isDev } from './config'

const fetcher: Fetcher<Device[], string> = (url: string) => {
  if (isDev) {
    return axios('http://localhost:3002/organizations')
      .then((r) => r.data)
      .catch((err) => {
        throw { message: err?.response?.data?.error }
      })
  }

  return axios(url)
    .then((r) => r.data)
    .catch((err) => {
      throw { message: err?.response?.data?.error }
    })
}

export const useDevices = () => {
  const { data, error } = useSWR<Device[], APIError>('/api/devices', fetcher)
  // I'm assuming device ID is suffixed with their relationships
  const normalizedData = data?.map((device) => ({
    ...device,
    _id: device._id.split('.')[0],
  }))
  return { data: normalizedData, isLoading: !error && !data, error }
}
