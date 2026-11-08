import { Link } from 'react-router'
import { PageCard } from '../components/PageCard'

export function NotFoundPage() {
  return (
    <PageCard title="页面不存在" description="找不到你访问的页面。">
      <Link className="page-card__link" to="/">
        返回启动页
      </Link>
    </PageCard>
  )
}
