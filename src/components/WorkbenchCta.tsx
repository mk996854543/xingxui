import { useId } from 'react'
import { LandingIcon } from './LandingIcon'
import { petalMedallionPath, SakuraBlossom } from './LandingOrnaments'

const panelShape = 'M39 5H316c9 0 16 4 24 12 7 7 12 14 14 23-2 9-7 16-14 23-8 8-15 12-24 12H39C22 75 10 64 6 51L3 40l3-11C10 16 22 5 39 5Z'

export function WorkbenchCta({ onClick }: { onClick: () => void }) {
  const prefix = `cta-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const id = (name: string) => `${prefix}-${name}`
  const paint = (name: string) => `url(#${id(name)})`

  return (
    <button className="hero-cta" type="button" aria-label="进入工作台" onClick={onClick}>
      <svg className="hero-cta__art" aria-hidden="true" focusable="false" width="360" height="80" viewBox="0 0 360 80">
        <defs>
          <linearGradient id={id('glass')} x2="100%" y2="100%">
            <stop stopColor="#79445f" stopOpacity=".73" />
            <stop offset=".42" stopColor="#34213f" stopOpacity=".91" />
            <stop offset=".8" stopColor="#2d1938" stopOpacity=".89" />
            <stop offset="1" stopColor="#643a54" stopOpacity=".76" />
          </linearGradient>
          <linearGradient id={id('rim')} x2="100%" y2="100%">
            <stop stopColor="#fff2c8" />
            <stop offset=".22" stopColor="#ffa98f" />
            <stop offset=".46" stopColor="#fff2cb" />
            <stop offset=".72" stopColor="#f39ac4" />
            <stop offset="1" stopColor="#ffdea1" />
          </linearGradient>
          <linearGradient id={id('badge')} x2="100%" y2="100%">
            <stop stopColor="#f1a4c3" stopOpacity=".35" />
            <stop offset="1" stopColor="#392442" stopOpacity=".42" />
          </linearGradient>
          <radialGradient id={id('cherry')} cx="44%" cy="10%" r="92%">
            <stop stopColor="#fff5e9" />
            <stop offset=".44" stopColor="#ffc1cf" />
            <stop offset="1" stopColor="#e77ca6" />
          </radialGradient>
          <linearGradient id={id('silk')} x2="100%" y2="0%">
            <stop stopColor="#d58463" />
            <stop offset=".47" stopColor="#ffdf9a" />
            <stop offset="1" stopColor="#f39a72" />
          </linearGradient>
          <linearGradient id={id('shine')} x2="100%" y2="0%">
            <stop stopColor="#ffe5d5" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffe5d5" stopOpacity=".58" />
            <stop offset="1" stopColor="#ffe5d5" stopOpacity="0" />
          </linearGradient>
          <clipPath id={id('panel')}><path d={panelShape} /></clipPath>
        </defs>
        <path d={panelShape} fill="none" stroke="#ff96ae" strokeWidth="4.4" strokeOpacity=".27" />
        <path d={panelShape} fill={paint('glass')} stroke={paint('rim')} strokeWidth="1.75" />
        <path d="M39 8h276c14 0 30 17 35 32-5 15-21 32-35 32H39C23 72 12 59 7 40 12 21 23 8 39 8Z" fill="none" stroke="#ffbdab" strokeOpacity=".48" strokeWidth=".74" />
        <g clipPath={paint('panel')}>
          <path className="hero-cta__sweep" d="M-135 80-85 0h66l-50 80Z" fill={paint('shine')} />
        </g>
        <g className="hero-cta__filigree" fill="none" stroke={paint('rim')} strokeLinecap="round">
          <path d="M0 45C4 19 22 4 49 4c16 0 26-1 42 0M3 52c3 15 16 23 34 24 15 1 23-1 38 0m-59-4C6 60 10 54 5 40m1-4C4 22 17 13 21 12m286-8c19-4 39 10 46 27 2 5 4 8 9 9-5 1-7 4-9 9-7 17-27 30-46 27" strokeWidth="1" />
          <path d="M2 52c5 21 21 26 53 26m-47-21C5 37 12 19 24 13m298-6c21 0 24 28 38 33-15 6-17 32-38 33" strokeOpacity=".58" strokeWidth=".65" />
          <path d="m349 40 5-4 6 4-6 4Z" strokeWidth=".7" />
        </g>
        <g className="hero-cta__medallion" transform="translate(35 12) scale(.87)">
          <path d={petalMedallionPath} fill={paint('badge')} stroke={paint('rim')} strokeWidth="1.45" />
        </g>
        <g className="hero-cta__symbol" transform="translate(45 22) scale(1.53)" color="#fff1dc">
          <LandingIcon name="film" />
        </g>
        <text className="hero-cta__label" x="183" y="40" textAnchor="middle" dominantBaseline="central" fill="#fff0da">进入工作台</text>
        <path d="M274 25v30" stroke="#ffcf9f" strokeOpacity=".76" strokeWidth=".7" />
        <path className="hero-cta__arrow" d="M292 40h26m-10-10 10 10-10 10" fill="none" stroke="#fff0da" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
        <g className="hero-cta__blossoms">
          <path d="M3 49c7-31 21-43 48-45 11-1 19 1 29-3M44 6c4-4 12-7 18-6M6 44l10-10" fill="none" stroke={paint('rim')} strokeWidth="1.1" />
          <g transform="translate(22 11) rotate(-14) scale(.84)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(8 29) rotate(19) scale(.58)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(39 4) rotate(16) scale(.51)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(57 5) rotate(30) scale(.34)"><SakuraBlossom fill={paint('cherry')} /></g>
          <g transform="translate(2 45) rotate(-18) scale(.34)"><SakuraBlossom fill={paint('cherry')} /></g>
          <path d="M-8 49c-4-1-6 1-6 4 4 2 7 0 6-4Zm76-49c2-3 5-4 8-3-1 3-4 5-8 3Z" fill="#ffc3d5" />
        </g>
        <g className="hero-cta__tassel" stroke={paint('rim')} strokeWidth=".75">
          <path d="M360 40q2 9 1 16v16" fill="none" />
          <path d="m361 55 3 4-3 5-3-5Zm0 11 2.6 3.5-2.6 4.2-2.6-4.2Z" fill="#e991b4" />
          <circle cx="361" cy="75" r="2.1" fill="#ffe5b6" />
          <path d="M360 77c-2 7-4 15-4 21q5 2 10 0c0-6-2-14-4-21Z" fill={paint('silk')} />
          <path d="m360 80-2 18m3-18v19m1-19 2 18" stroke="#fff1bc" strokeWidth=".5" />
        </g>
      </svg>
    </button>
  )
}
