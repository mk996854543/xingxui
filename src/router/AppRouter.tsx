import { useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import { PageCard } from '../components/PageCard'
import { AppLayout } from '../layouts/AppLayout'
import { LandingPage } from '../pages/LandingPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { getMockSession } from '../utils/mockAuth'

export function AppRouter() {
  const [user, setUser] = useState(getMockSession)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage user={user} onUserChange={setUser} />} />
        <Route element={<AppLayout />}>
          <Route path="workbench" element={user ? (
            <PageCard title="已进入工作台入口" description="漫剧制作工作台暂未开放。当前仅预览网站介绍页与登录流程。">
              <Link to="/" className="page-card__link">返回星绘次元首页</Link>
            </PageCard>
          ) : <Navigate to="/?intent=workbench" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
