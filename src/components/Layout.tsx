const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center">
      <div>
        <div>
          <h2>Welcome,</h2>
          <span>Empower2Transform</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

type LayoutProps = {
  children: React.ReactNode
}

export default Layout
