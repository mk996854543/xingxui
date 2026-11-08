import { useId, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react'
import { demoPassword, demoUser, mockLogin, mockRegister, type MockUser } from '../utils/mockAuth'
import { AuthButtonEnd } from './AuthDecorations'
import { AuthTabs, type AuthMode } from './AuthTabs'
import { LandingIcon, type LandingIconName } from './LandingIcon'

type Field = 'name' | 'email' | 'password'
type FormError = { field?: Field; message: string }

function AuthField({ label, icon, id, invalid, children, ...input }: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon: LandingIconName
  id: string
  invalid?: boolean
  children?: ReactNode
}) {
  return (
    <div className="auth-field" data-invalid={invalid || undefined}>
      <label htmlFor={id}><LandingIcon name={icon} />{label}</label>
      <div className="auth-field__control">
        <input {...input} id={id} aria-invalid={invalid || undefined} />
        {children}
      </div>
    </div>
  )
}

export function MockAuthForm({ busy, onBusyChange, onSuccess }: { busy: boolean; onBusyChange: (busy: boolean) => void; onSuccess: (user: MockUser) => void }) {
  const id = useId()
  const lock = useRef(false)
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [passwords, setPasswords] = useState({ login: '', register: '' })
  const [revealed, setRevealed] = useState(false)
  const [error, setError] = useState<FormError | null>(null)
  const registering = mode === 'register'
  const password = passwords[mode]
  const errorId = id + '-error'

  function changeMode(next: AuthMode) {
    if (next === mode || lock.current) return
    setMode(next)
    setRevealed(false)
    setError(null)
  }

  function editField(field: Field, value: string) {
    if (field === 'email') setEmail(value)
    else if (field === 'name') setName(value)
    else setPasswords((drafts) => ({ ...drafts, [mode]: value }))
    setError((previous) => previous?.field && previous.field !== field ? previous : null)
  }

  function fillDemo() {
    if (lock.current) return
    setEmail(demoUser.email)
    setPasswords((drafts) => ({ ...drafts, login: demoPassword }))
    setRevealed(false)
    setError(null)
  }

  function validate(form: HTMLFormElement): FormError | null {
    const emailInput = form.elements.namedItem('email')
    if (registering && !name.trim()) return { field: 'name', message: '请输入昵称。' }
    if (!email.trim()) return { field: 'email', message: '请输入邮箱。' }
    if (emailInput instanceof HTMLInputElement && emailInput.validity.typeMismatch) {
      return { field: 'email', message: '请输入有效的邮箱地址。' }
    }
    if (!password) return { field: 'password', message: '请输入密码。' }
    if (registering && password.length < 8) return { field: 'password', message: '演示密码至少需要 8 个字符。' }
    return null
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (lock.current) return
    const form = event.currentTarget
    const invalid = validate(form)
    if (invalid) {
      setError(invalid)
      const field = invalid.field ? form.elements.namedItem(invalid.field) : null
      if (field instanceof HTMLInputElement) field.focus()
      return
    }

    lock.current = true
    setError(null)
    setRevealed(false)
    onBusyChange(true)
    try {
      const user = registering ? await mockRegister(email, name, password) : await mockLogin(email, password)
      onSuccess(user)
    } catch (reason) {
      setError({ message: reason instanceof Error ? reason.message : '操作失败，请重试。' })
    } finally {
      lock.current = false
      onBusyChange(false)
    }
  }

  function fieldError(field: Field) {
    return { invalid: error?.field === field, 'aria-describedby': error?.field === field ? errorId : undefined }
  }

  return (
    <>
      <AuthTabs id={id} mode={mode} onChange={changeMode} busy={busy} />
      <section className="auth-modal__tabpanel" role="tabpanel" id={id + '-panel'} aria-labelledby={id + '-' + mode}>
        <form className="auth-form" aria-busy={busy} noValidate onSubmit={(event) => void submit(event)}>
          <div className="auth-form__fold" data-expanded={registering} inert={!registering} aria-hidden={!registering}>
            <div className="auth-form__fold-inner">
              <div className="auth-form__nickname">
                <AuthField label="昵称" icon="user" id={id + '-name'} name="name" required={registering} disabled={!registering || busy} maxLength={20} autoComplete="nickname" value={name} onChange={(event) => editField('name', event.target.value)} placeholder="输入演示昵称" {...fieldError('name')} />
              </div>
            </div>
          </div>
          <AuthField label="邮箱" icon="mail" id={id + '-email'} name="email" type="email" required disabled={busy} maxLength={120} autoComplete="username" value={email} onChange={(event) => editField('email', event.target.value)} placeholder="例如 demo@xingxui.test" {...fieldError('email')} />
          <AuthField label="密码" icon="lock" id={id + '-password'} name="password" type={revealed ? 'text' : 'password'} required disabled={busy} minLength={registering ? 8 : undefined} maxLength={128} autoComplete={registering ? 'new-password' : 'current-password'} spellCheck={false} value={password} onChange={(event) => editField('password', event.target.value)} placeholder={registering ? '至少 8 个字符' : '输入演示密码'} {...fieldError('password')}>
            <button type="button" className="auth-field__toggle" aria-label={revealed ? '隐藏密码' : '显示密码'} aria-controls={id + '-password'} disabled={busy} onClick={() => setRevealed(!revealed)}>
              <LandingIcon name={revealed ? 'eyeOff' : 'eye'} />
            </button>
          </AuthField>
          {error && <p className="auth-form__error" id={errorId} role="alert"><span aria-hidden="true">!</span>{error.message}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>
            <AuthButtonEnd />
            <span>{busy ? '正在处理…' : registering ? '注册并登录' : '登录演示账号'}</span>
            {busy ? <span className="auth-submit__spinner" aria-hidden="true" /> : <LandingIcon name="right" />}
            <AuthButtonEnd right />
          </button>
          <div className="auth-form__fold" data-expanded={!registering} inert={registering} aria-hidden={registering}>
            <div className="auth-form__fold-inner">
              <div className="auth-form__demo">
                <button className="auth-demo" type="button" disabled={busy || registering} onClick={fillDemo}><LandingIcon name="pen" /><span>填入演示账号</span></button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
