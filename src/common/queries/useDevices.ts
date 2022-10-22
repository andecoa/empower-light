import useSWR, { Fetcher } from 'swr'
import type { APIError, Device } from '../types'

const fetcher: Fetcher<Device[], string> = (url: string) =>
  fetch(url).then((r) => r.json())

export const useDevices = () => {
  const { data, error } = useSWR<Device[], APIError>('/api/devices', fetcher)
  return { data, isLoading: !error && !data, isError: error }
}
