import { useEffect, useId, useRef, type ReactNode } from 'react'
import { LandingIcon } from './LandingIcon'

type LandingDialogProps = {
  title: string
  onDismiss: () => void
  children: ReactNode
  appearance?: 'auth'
  descriptionId?: string
  decoration?: ReactNode
  headingDetail?: ReactNode
  closeDetail?: ReactNode
  dismissDisabled?: boolean
}

export function LandingDialog({ title, onDismiss, children, appearance, descriptionId, decoration, headingDetail, closeDetail, dismissDisabled }: LandingDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const auth = appearance === 'auth'

  useEffect(() => {
    const dialog = ref.current
    const trigger = document.activeElement
    if (!dialog) return
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])

  function dismiss() {
    if (dismissDisabled) return
    const dialog = ref.current
    if (!auth || !dialog) {
      onDismiss()
      return
    }
    if (dialog.dataset.closing) return
    dialog.dataset.closing = 'true'
    dialog.querySelector('.landing-dialog__surface')?.setAttribute('inert', '')
    const animations = dialog.getAnimations?.() ?? []
    if (animations.length === 0) {
      onDismiss()
      return
    }
    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (dialog.isConnected && dialog.open) onDismiss()
    })
  }

  const close = (
    <button className={auth ? 'auth-close' : 'landing-icon-button'} type="button" aria-label="关闭弹窗" disabled={dismissDisabled} onClick={dismiss}>
      <LandingIcon name="close" />
      {closeDetail}
    </button>
  )

  return (
    <dialog
      ref={ref}
      className={auth ? 'landing-dialog landing-dialog--auth' : 'landing-dialog'}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        dismiss()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      {decoration}
      <div className="landing-dialog__surface">
        {auth && <div className="auth-close-rail">{close}</div>}
        <div className="landing-dialog__head">
          <h2 id={titleId}>{title}</h2>
          {!auth && close}
        </div>
        {headingDetail}
        {children}
      </div>
    </dialog>
  )
}
