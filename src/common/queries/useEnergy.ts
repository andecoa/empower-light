import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, Energy } from '../types'
import { isDev } from './config'

// const fetcher: Fetcher<Energy[], string> = async (
//   url: string,
//   deviceId: string
// ) => {
//   if (isDev) {
//     return axios(`http://localhost:3002/organizations?_id=${deviceId}`)
//       .then((r) => r.data)
//       .catch((err) => {
//         throw { message: err?.response?.data?.error }
//       })
//   }

//   return axios(url)
//     .then((r) => r.data)
//     .catch((err) => {
//       throw { message: err?.response?.data?.error }
//     })
// }

const devFetcher = (url: string) => {
  return axios(url)
    .then((r) => r.data)
    .catch((err) => {
      throw { message: err?.response?.data?.error }
    })
}

// TODO forcing into dev fetcher to meet deadline
export const useEnergy = (deviceId: string) => {
  const { data, error } = useSWR<Energy[], APIError>(
    deviceId ? `http://localhost:3002/energy?_id=${deviceId}` : null,
    deviceId ? devFetcher : null
  )

  return { data, isLoading: !error && !data, error }
}
