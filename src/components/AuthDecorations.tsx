import { useId } from 'react'
import { SakuraBlossom } from './LandingOrnaments'

const lotus = {
  rear: 'M0 4C-20 4-38-6-43-19c14-2 28 2 43 16 15-14 29-18 43-16C38-6 20 4 0 4Z',
  side: 'M0 3C-18-3-29-16-31-34-18-30-7-20 0-4c7-16 18-26 31-30C29-16 18-3 0 3Z',
  heart: 'M0 3c-15-9-19-25 0-43C19-22 15-6 0 3Z',
  front: 'M0 3C-15 7-29 3-35-6c11-4 25 0 35 7 10-7 24-11 35-7C29 3 15 7 0 3Z',
}

function Lotus({ fill, detailed = false }: { fill: string; detailed?: boolean }) {
  return (
    <g stroke="#ffe3ba" strokeWidth=".95" strokeLinejoin="round">
      <path d={lotus.rear} fill="#e87eae" />
      <path d={lotus.side} fill={fill} />
      <path d={lotus.heart} fill={fill} />
      <path d={lotus.front} fill="#fdaecb" />
      {detailed && <path d="M0 2c-10-5-9-15 0-22 9 7 10 17 0 22Z" fill="#ffd1dc" />}
      <path d="M0-28v12m-3-2 3 4 3-4" fill="none" stroke="#fff5cf" strokeWidth=".7" />
    </g>
  )
}

export function AuthTitleRule() {
  return (
    <svg className="auth-title-rule" aria-hidden="true" focusable="false" width="290" height="27" viewBox="0 0 290 27">
      <path d="M1 15h103c12 0 16-6 22 0-6 6-10 0-22 0m185 0H186c-12 0-16-6-22 0 6 6 10 0 22 0M83 15c7-4 13-4 19 0-6 4-12 4-19 0Zm124 0c-7-4-13-4-19 0 6 4 12 4 19 0Z" fill="none" stroke="#f6c5a6" strokeWidth=".75" />
      <path d="m106 15 2-2 2 2-2 2Zm74 0 2-2 2 2-2 2Z" fill="#ffe6bf" />
      <g transform="translate(145 21) scale(.43)"><Lotus fill="#ffd1d9" /></g>
    </svg>
  )
}

export function AuthCloseTassel() {
  return (
    <svg className="auth-close__tassel" aria-hidden="true" focusable="false" width="20" height="52" viewBox="0 0 20 52">
      <path d="M10 1v23" stroke="#e8bd8c" strokeWidth=".8" />
      <path d="m10 11 3 4-3 4-3-4Z" fill="#f5c7d4" stroke="#ffe4af" strokeWidth=".8" />
      <circle cx="10" cy="24" r="1.8" fill="#fff0ba" />
      <path d="M10 26c3 6 5 15 4 20l-4 5-4-5c-1-5 1-14 4-20Z" fill="#e98fb3" stroke="#f9d4a2" strokeWidth=".8" />
      <path d="M10 28v21m-1-18-1 15m3-15 1 15" fill="none" stroke="#fff0bb" strokeWidth=".55" />
    </svg>
  )
}

export function AuthButtonEnd({ right = false }: { right?: boolean }) {
  return (
    <svg className={`auth-submit__end${right ? ' auth-submit__end--right' : ''}`} aria-hidden="true" focusable="false" viewBox="0 0 60 50" fill="none">
      <path d="M57 2H27c-7 0-12 4-13 10-5 1-8 5-9 9l-4 4 4 4c1 4 4 8 9 9 1 6 6 10 13 10h30" stroke="#fff1c3" strokeWidth="1.35" />
      <path d="M15 15c1-7 10-11 14-6 2 3-1 7-4 5m-10 21c1 7 10 11 14 6 2-3-1-7-4-5M7 25l8-3 6 3-6 3Z" stroke="#ffdda9" strokeWidth=".9" />
      <path d="M27 24c4-6 10-6 15-2-2 5-9 6-15 2Zm-4-3c-4-1-6-5-5-9 5 0 8 4 5 9Z" fill="#ffdfde" fillOpacity=".85" />
    </svg>
  )
}

const floating = [[47, 70, -13], [91, 93, 21], [136, 104, 28], [331, 97, -30], [367, 78, 18], [416, 52, -24], [446, 31, 27]]

export function AuthDecorations() {
  const key = 'auth-art-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => key + '-' + name
  const paint = (name: string) => 'url(#' + id(name) + ')'

  return (
    <div className="auth-decorations" aria-hidden="true">
      <svg className="auth-decorations__corner" focusable="false" viewBox="0 0 214 166">
        <defs>
          <radialGradient id={id('cherry')} cx="45%" cy="12%" r="94%">
            <stop stopColor="#fff4eb" />
            <stop offset=".54" stopColor="#ffc4dc" />
            <stop offset="1" stopColor="#e38aac" />
          </radialGradient>
          <linearGradient id={id('branch')} x2="100%" y2="100%">
            <stop stopColor="#fff1c5" />
            <stop offset=".42" stopColor="#b77a61" />
            <stop offset=".75" stopColor="#fce1a9" />
            <stop offset="1" stopColor="#f4a9b9" />
          </linearGradient>
        </defs>
        <g className="auth-decorations__vine" fill="none" stroke={paint('branch')} strokeLinecap="round">
          <path d="M0 123c10-4 13-19 10-31C5 61 22 44 50 34c36-13 57-13 90-26m-91 25c16-13 25-19 39-21m-44 28c-16 12-18 29-26 40m42-50c30 9 62-16 104-14 13 1 27 7 46 3" strokeWidth="2.7" />
          <path d="M5 110c13-16-4-38 12-54 19-20 46-19 72-30m-67 23c-1-9 4-14 13-17m68-12c27-9 53 1 71 5" strokeWidth=".82" />
          <path d="M50 38c6-10 15-11 20-10-4 7-11 11-20 10Zm68-19c5-5 12-6 16-3-4 4-9 5-16 3Z" fill="#e4b585" fillOpacity=".8" strokeWidth=".5" />
        </g>
        <g className="auth-decorations__blossoms">
          <g transform="translate(35 34) rotate(-10) scale(1.28)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(13 40) rotate(19) scale(.66)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(59 25) rotate(-18) scale(.83)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(53 7) rotate(32) scale(.7)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(81 17) rotate(-21) scale(.57)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(16 68) rotate(-28) scale(.4)"><SakuraBlossom fill={paint('cherry')} /></g>
          <path d="M103 13q6-6 11-4-1 7-11 4ZM27 60q7 0 8 6-7 1-8-6Z" fill="#ffd1d9" />
        </g>
        <g className="auth-decorations__corner-petals" fill="#ffc0d6">
          <g transform="translate(82 55) rotate(30)"><path d="M-4 0c3-5 8-4 10 0-3 4-7 4-10 0Z" /></g>
          <g transform="translate(33 83) rotate(18)"><path d="M-3 0c2-4 6-4 8-1-2 4-5 5-8 1Z" /></g>
        </g>
      </svg>

      <svg className="auth-decorations__foot" focusable="false" viewBox="0 0 480 125" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id('mist')} x2="0%" y2="100%">
            <stop stopColor="#b878a9" stopOpacity="0" />
            <stop offset=".72" stopColor="#c481aa" stopOpacity=".27" />
            <stop offset="1" stopColor="#ffb6d2" stopOpacity=".53" />
          </linearGradient>
          <linearGradient id={id('water')} x2="0%" y2="100%">
            <stop stopColor="#d899b2" stopOpacity=".12" />
            <stop offset="1" stopColor="#ffacbc" stopOpacity=".46" />
          </linearGradient>
          <linearGradient id={id('lotus')} x2="0%" y2="100%">
            <stop stopColor="#ec8ab3" />
            <stop offset=".57" stopColor="#ffc3dc" />
            <stop offset="1" stopColor="#fff1dc" />
          </linearGradient>
          <linearGradient id={id('gold')} x2="100%" y2="0%">
            <stop stopColor="#eab487" stopOpacity=".33" />
            <stop offset=".35" stopColor="#ffe8b0" />
            <stop offset=".6" stopColor="#eeb59a" />
            <stop offset="1" stopColor="#fbd3a1" stopOpacity=".33" />
          </linearGradient>
        </defs>
        <rect width="480" height="125" fill={paint('mist')} />
        <path d="M0 51c62 38 114 49 198 46 117-3 195-25 282-79v107H0Z" fill={paint('water')} />
        <path d="M0 81c96 31 174 34 243 26 90-12 164-15 237-48v66H0Z" fill="#eb9cb1" opacity=".17" />
        <g className="auth-decorations__vines" fill="none" stroke={paint('gold')} strokeLinecap="round">
          <path d="M0 41c15 30 33 49 63 61 43 17 95 14 136 11m281-74c-26 28-67 45-114 61-30 10-63 14-87 13M0 80c20 16 34 14 52 22 22 10 31 8 63 10m365-41c-24 18-35 18-51 23-14 5-22 11-38 14" strokeWidth="1.1" />
          <path className="auth-decorations__vine-light" d="M0 41c15 30 33 49 63 61 43 17 95 14 136 11m281-74c-26 28-67 45-114 61-30 10-63 14-87 13" stroke="#fff0c0" strokeWidth="1.4" />
        </g>
        <g fill="none" stroke={paint('gold')} opacity=".6">
          <ellipse cx="240" cy="102" rx="77" ry="10" />
          <ellipse cx="240" cy="102" rx="57" ry="7.2" />
          <ellipse cx="240" cy="102" rx="40" ry="4.4" />
          <path d="M140 109c30 8 64 9 104 9m-20-1c39 1 77-2 113-12" strokeWidth=".68" />
        </g>
        <g className="auth-decorations__lotus">
          <g transform="translate(240 101) scale(.88)"><Lotus fill={paint('lotus')} detailed /></g>
        </g>
        <path d="M240 118c-7-7-13-5-16-2 1 4 8 5 16 3 8 2 15 1 16-3-3-3-9-5-16 2Zm0-6 5 7-5 6-5-6Z" fill="#ffd59c" fillOpacity=".64" stroke="#ffecc0" strokeWidth=".7" />
        <g className="auth-decorations__floating-petals" fill="#ffc1d5" stroke="#ffe3de" strokeWidth=".6">
          {floating.map(([x, y, angle]) => <g key={x} transform={`translate(${x} ${y}) rotate(${angle})`}><path d="M-5 0c2-6 8-7 13-2-2 5-8 7-13 2Z" /></g>)}
        </g>
        <g className="auth-decorations__glints" fill="#ffe8bd">
          <circle cx="32" cy="83" r="1.3" /><circle cx="119" cy="68" r="1" /><circle cx="173" cy="84" r="1.25" />
          <circle cx="310" cy="71" r="1.45" /><circle cx="390" cy="42" r="1" /><circle cx="431" cy="83" r="1.4" />
          <path d="m150 84 1-2.7 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1Zm201-17 1-3 1 3 3 1-3 1-1 3-1-3-3-1Z" />
        </g>
      </svg>
    </div>
  )
}
