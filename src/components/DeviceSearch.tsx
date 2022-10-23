import Router, { useRouter } from 'next/router'
import { useDevices } from '../common/queries/useDevices'

const DeviceSearch = () => {
  const router = useRouter()
  const { data, error, isLoading } = useDevices()

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Router.push({
      pathname: '/device-details/[deviceId]',
      query: { deviceId: e.target.value },
    })
  }

  const defaultPath = router.query.deviceId

  return (
    <select
      onChange={handleSelect}
      className="w-full max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      disabled={isLoading}
      defaultValue={defaultPath || undefined}
    >
      <option disabled>
        {isLoading
          ? 'Loading devices'
          : error || !data
          ? 'Sorry, unable to retrieve device'
          : 'Select device'}
      </option>
      {data &&
        data.map((device) => (
          <option value={device._id} key={device._id}>
            {device._id}
          </option>
        ))}
    </select>
  )
}

export default DeviceSearch
