import { useRef, type KeyboardEvent } from 'react'
import { LandingIcon } from './LandingIcon'

export type AuthMode = 'login' | 'register'

const tabs = [
  { mode: 'login', label: '登录', icon: 'user' },
  { mode: 'register', label: '注册', icon: 'userPlus' },
] as const

export function AuthTabs({ mode, onChange, busy, id }: { mode: AuthMode; onChange: (mode: AuthMode) => void; busy: boolean; id: string }) {
  const refs = useRef<Partial<Record<AuthMode, HTMLButtonElement>>>({})

  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const next = event.key === 'Home' ? 'login'
      : event.key === 'End' ? 'register'
      : event.key === 'ArrowLeft' || event.key === 'ArrowRight' ? (mode === 'login' ? 'register' : 'login')
      : null
    if (!next || busy) return
    event.preventDefault()
    onChange(next)
    refs.current[next]?.focus()
  }

  return (
    <div className="auth-tabs" role="tablist" aria-label="登录方式" data-mode={mode}>
      {tabs.map(({ mode: value, label, icon }) => (
        <button key={value} ref={(node) => { if (node) refs.current[value] = node }} id={`${id}-${value}`} type="button" role="tab" aria-selected={value === mode} aria-controls={`${id}-panel`} tabIndex={value === mode ? 0 : -1} disabled={busy} onClick={() => onChange(value)} onKeyDown={keyDown}>
          <LandingIcon name={icon} />
          {label}
        </button>
      ))}
    </div>
  )
}
