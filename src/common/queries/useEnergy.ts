import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, Energy } from '../types'

const fetcher: Fetcher<Energy[], string> = (url: string) =>
  axios(url)
    .then((r) => r.data)
    .catch((err) => {
      throw { message: err?.response?.data?.error }
    })

export const useEnergy = (deviceId: string, dateISO8601: string) => {
  const { data, error } = useSWR<Energy[], APIError>(
    `/api/energy/${deviceId}?date=${dateISO8601}`,
    fetcher
  )

  return { data, isLoading: !error && !data, error }
}
