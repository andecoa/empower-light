import Link from 'next/link'
import { useRouter } from 'next/router'
import DeviceSearch from './DeviceSearch'

const navigation = [
  {
    name: 'Device Details',
    route: '/device-details',
  },
  {
    name: 'Donations',
    route: '/donations',
  },
  {
    name: 'Settings',
    route: '/settings',
  },
]

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const hideNavBar = router.pathname === '/_error' || router.pathname === '/'

  if (hideNavBar) {
    return (
      <div className="bg-blue-300 flex flex-col justify-center items-center h-screen">
        {children}
      </div>
    )
  }

  return (
    <div className="flex flex-nowrap h-screen">
      <div className="w-80 bg-blue-300 p-10 pb-20 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="white" />
            </svg>
          </div>
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-blue-500">Welcome,</h2>
            <span className="text-xl text-blue-500">Empower2Transform</span>
          </div>
          <div>
            <DeviceSearch />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {navigation.map((navigation) => (
            <Link href={navigation.route} key={navigation.name}>
              <a className="px-6 py-2 bg-indigo-800 rounded-md text-center text-white">
                {navigation.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-10">{children}</div>
    </div>
  )
}

type LayoutProps = {
  children: React.ReactNode
}
