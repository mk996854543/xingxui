import type { ReactNode } from 'react'

const marks = {
  search: <><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4.2 4.2"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9"/><path d="M10 21h4"/></>,
  user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></>,
  userPlus: <><circle cx="9" cy="7.5" r="3.4"/><path d="M2.5 20v-1.5a6.5 6.5 0 0 1 11-4.7M14 18h7m-3.5-3.5v7"/></>,
  mail: <><rect x="2.5" y="4.5" width="19" height="15" rx="2.4"/><path d="m3.5 6 8.5 7 8.5-7"/></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="11" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5M12 15v2"/></>,
  eye: <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.6"/></>,
  eyeOff: <><path d="M3 3l18 18M10 6.2a10 10 0 0 1 2-.2c6.4 0 10 6 10 6a18 18 0 0 1-3 3.3M6.2 7.8A16 16 0 0 0 2 12s3.6 6 10 6a10 10 0 0 0 3.8-.7M10.2 10.2a2.6 2.6 0 0 0 3.6 3.6"/></>,
  pen: <><path d="m4 15 10.7-10.7 5 5L9 20l-5 1zM12.5 6.5l5 5M13 21h8"/></>,
  film: <><path d="M3 10h18v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5zM3 10l-1-4 17.7-4.4 1 4.1zM6 5l3.7 3.2M12 3.5l3.5 3.2"/><path d="m10 13 5 3-5 3z" fill="currentColor" stroke="none"/></>,
  left: <path d="m15 5-7 7 7 7"/>,
  right: <path d="m9 5 7 7-7 7"/>,
  play: <path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>,
  pause: <path d="M9 5v14m6-14v14"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  bolt: <path d="m14 2-9 12h6l-1 8 9-12h-6z"/>,
  layers: <><path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
  shield: <><path d="M12 2c2.7 2.4 5.5 3.4 8 3.6v6c0 5-3 7.9-8 10.4-5-2.5-8-5.4-8-10.4v-6c2.5-.2 5.3-1.2 8-3.6Z"/><path d="m8.5 12 2.3 2.3 4.7-5"/></>,
  diamond: <path d="m2 9 5-5h10l5 5-10 12zM2 9h20M7 4l2 5 3 12 3-12 2-5"/>,
  check: <path d="m5 12 4 4L19 6"/>,
} satisfies Record<string, ReactNode>

export type LandingIconName = keyof typeof marks

export function LandingIcon({ name, className }: { name: LandingIconName; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      {marks[name]}
    </svg>
  )
}

export function LotusMark() {
  return (
    <svg aria-hidden="true" className="brand-mark" viewBox="0 0 52 46" fill="currentColor">
      <path d="M26 1c8 9 10 17 4 27l-4 6-4-6C16 18 18 10 26 1Z"/>
      <path d="M8 9c10 2 16 8 17 24C15 29 9 21 8 9Zm36 0c-10 2-16 8-17 24 10-4 16-12 17-24Z"/>
      <path d="M2 24c10-1 18 3 23 12C14 37 6 33 2 24Zm48 0c-10-1-18 3-23 12 11 1 19-3 23-12Z"/>
      <path d="M8 38c8 1 13 0 18-3 5 3 10 4 18 3-5 5-11 6-18 2-7 4-13 3-18-2Zm14 4 4-2 4 2-4 3-4-3Z"/>
    </svg>
  )
}
