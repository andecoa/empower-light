import type { NextPage } from 'next'
import { useDeviceConfig } from '../common/queries/useDeviceConfig'

const Home: NextPage = () => {
  const { data, isLoading, isError } = useDeviceConfig('ESP-9A6C07')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error encountered. Please try again.</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Home
