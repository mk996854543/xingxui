import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <main className="app-shell">
      <Outlet />
    </main>
  )
}
