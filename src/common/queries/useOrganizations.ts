import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import type { APIError, Organization } from '../types'
import { isDev } from './config'

const fetcher: Fetcher<Organization[], string> = async (url: string) => {
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

export const useOrganizations = () => {
  const { data, error } = useSWR<Organization[], APIError>(
    `/api/organizations`,
    fetcher
  )
  return { data, isLoading: !error && !data, error }
}
