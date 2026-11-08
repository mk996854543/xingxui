import { useId, useState } from 'react'
import type { MockUser } from '../utils/mockAuth'
import { AuthDecorations, AuthTitleRule, AuthCloseTassel } from './AuthDecorations'
import { LandingDialog } from './LandingDialog'
import { MockAuthForm } from './MockAuthForm'
import '../styles/auth-modal.css'

export function AuthModal({ title, onDismiss, onSuccess }: { title: string; onDismiss: () => void; onSuccess: (user: MockUser) => void }) {
  const descriptionId = useId()
  const [busy, setBusy] = useState(false)

  return (
    <LandingDialog
      title={title}
      onDismiss={onDismiss}
      appearance="auth"
      descriptionId={descriptionId}
      decoration={<AuthDecorations />}
      headingDetail={<AuthTitleRule />}
      closeDetail={<AuthCloseTassel />}
      dismissDisabled={busy}
    >
      <p className="auth-modal__intro" id={descriptionId}>这是本地演示。无需邮箱验证码，请勿输入真实密码。</p>
      <MockAuthForm busy={busy} onBusyChange={setBusy} onSuccess={onSuccess} />
    </LandingDialog>
  )
}
