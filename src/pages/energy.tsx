import { NextPage } from 'next'
import { useEnergy } from '../common/queries/useEnergy'

const Energy: NextPage = () => {
  const { data, isLoading, isError } = useEnergy('ESP-9A6C07', '2022-10-08')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error encountered. Please try again.</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Energy
