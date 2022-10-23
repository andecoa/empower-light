import DeviceSearch from '../components/DeviceSearch'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-500 text-center mb-4">
        Hello
      </h1>
      <DeviceSearch />
    </div>
  )
}

export default Home
