import type { ReactNode } from 'react'

type PageCardProps = {
  title: string
  description: string
  children?: ReactNode
}

export function PageCard({ title, description, children }: PageCardProps) {
  return (
    <section className="page-card">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  )
}
