import Router, { useRouter } from 'next/router'
import { useOrganizations } from '../common/queries/useOrganizations'

const DeviceSearch = () => {
  const router = useRouter()
  const { data, error, isLoading } = useOrganizations()

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Router.push({
      pathname: '/device-details/[deviceId]',
      query: { deviceId: e.target.value },
    })
  }

  const selectedDevice = router.query.deviceId

  return (
    <select
      onChange={handleSelect}
      className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      disabled={isLoading}
      value={selectedDevice || 'disabled'}
    >
      <option disabled value="disabled">
        {isLoading
          ? 'Loading devices'
          : error || !data
          ? 'Sorry, unable to retrieve device'
          : 'Select device'}
      </option>
      {data &&
        data.map((org) => {
          return org.deviceIds.map((deviceId) => {
            return (
              <option value={deviceId} key={deviceId}>
                {org.name} - {deviceId}
              </option>
            )
          })
        })}
    </select>
  )
}

export default DeviceSearch
