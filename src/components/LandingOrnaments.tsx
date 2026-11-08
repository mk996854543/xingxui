import { useId } from 'react'
import { LandingIcon, type LandingIconName } from './LandingIcon'

const petals = [0, 72, 144, 216, 288]
const petalShape = 'M0 1C-4-1-8-5-7.6-9.5c.4-4 3.2-5.9 6-4.5L0-12l1.6-2c2.8-1.4 5.6.5 6 4.5C8-5 4-1 0 1Z'

export function SakuraBlossom({ fill = '#f3a6c9' }: { fill?: string }) {
  return (
    <g>
      {petals.map((angle) => (
        <path key={angle} d={petalShape} transform={`rotate(${angle})`} fill={fill} stroke="#ffe1e4" strokeWidth=".45" />
      ))}
      <path d="M0 0v-5m0 5 4.7-1.6M0 0l3.1 4.2M0 0l-3.1 4.2M0 0l-4.7-1.6" fill="none" stroke="#ffdbab" strokeWidth=".65" />
      <circle r="1.8" fill="#fff1c6" />
    </g>
  )
}

const features: { icon: LandingIconName; label: string }[] = [
  { icon: 'bolt', label: '一站式创作' },
  { icon: 'layers', label: '多模型支持' },
  { icon: 'shield', label: '稳定高效' },
  { icon: 'diamond', label: '高清输出' },
]

export const petalMedallionPath = 'M32 3c5 4 8 6 14 6 7 0 10 5 11 11 1 5 4 9 6 12-2 3-5 7-6 12-1 6-4 11-11 11-6 0-9 2-14 6-5-4-8-6-14-6-7 0-10-5-11-11-1-5-4-9-6-12 2-3 5-7 6-12 1-6 4-11 11-11 6 0 9-2 14-6Z'

function PetalFrame() {
  return (
    <svg aria-hidden="true" className="hero-feature__petals" viewBox="0 0 64 64">
      <path d={petalMedallionPath} fill="#25172e" fillOpacity=".42" stroke="#ffad99" strokeWidth="3.3" strokeOpacity=".44" />
      <path d={petalMedallionPath} fill="none" stroke="#ffe0ad" strokeWidth="1.16" />
      <path d={petalMedallionPath} transform="translate(3.2 3.2) scale(.9)" fill="none" stroke="#efa2b0" strokeWidth=".64" strokeOpacity=".7" />
      <path d="M32 3c5 4 8 6 14 6M1 32c2 3 5 7 6 12m25 17c5-4 8-6 14-6" fill="none" stroke="#fff1cc" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  )
}

function FeatureEndCap({ right = false }: { right?: boolean }) {
  return (
    <svg className={`hero-features__end${right ? ' hero-features__end--right' : ''}`} aria-hidden="true" focusable="false" viewBox="0 0 48 68" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M33 6c-10 4-15 8-17 16C12 28 9 31 3 34c6 3 9 6 13 12 2 8 7 12 17 16l-5-7c-5-3-6-8-5-13l-8-8 8-8c-1-5 0-10 5-13Z" fill="#b6647c" fillOpacity=".3" stroke="#ffac81" strokeWidth="2.3" />
      <path d="M30 11c-8 3-13 8-12 15m12 31c-8-3-13-8-12-15m-10-8 8-5 8 5-8 5Zm16 0 9-6 10 6-10 6Z" stroke="#fff0bf" strokeWidth="1.15" />
      <path d="M29 19c-5 5-3 10 4 9m-4 21c-5-5-3-10 4-9m-8-6 8-3 7 3-7 3Z" stroke="#ffbf8a" />
    </svg>
  )
}

const mainVine = 'M15 18C75 37 111 34 159 42c59 9 104-17 166-10 56 6 99 26 166 8'
const petalsInFlight = [[112, 37, -20], [193, 8, 23], [338, 55, -24], [662, 51, 27], [784, 8, -19], [888, 36, 17]]
const goldDots = [[101, 48], [177, 15], [203, 48], [279, 29], [316, 54], [391, 20], [433, 55], [567, 55], [609, 20], [684, 54], [721, 29], [797, 48], [823, 15], [899, 48]]

function FeatureOrnament() {
  const prefix = `ornament-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const id = (name: string) => `${prefix}-${name}`
  const paint = (name: string) => `url(#${id(name)})`
  const href = (name: string) => `#${id(name)}`

  return (
    <svg className="hero-ornament" aria-hidden="true" focusable="false" width="1000" height="104" viewBox="0 0 1000 104">
      <defs>
        <linearGradient id={id('gold')} x2="100%" y2="0%">
          <stop stopColor="#ffbe95" />
          <stop offset=".28" stopColor="#fff0c2" />
          <stop offset=".52" stopColor="#ffbb8c" />
          <stop offset=".8" stopColor="#ffe6ac" />
          <stop offset="1" stopColor="#fff2c6" />
        </linearGradient>
        <radialGradient id={id('sakura')} cx="45%" cy="18%" r="88%">
          <stop stopColor="#fff0f5" />
          <stop offset=".45" stopColor="#ffc4d9" />
          <stop offset="1" stopColor="#ef79a7" />
        </radialGradient>
        <linearGradient id={id('lotus')} x2="0%" y2="100%">
          <stop stopColor="#ee65a5" />
          <stop offset=".42" stopColor="#ff9bcb" />
          <stop offset="1" stopColor="#fff1dc" />
        </linearGradient>
        <linearGradient id={id('crystal')} x2="100%" y2="100%">
          <stop stopColor="#fff2c9" />
          <stop offset=".48" stopColor="#ff9bca" />
          <stop offset="1" stopColor="#f05c9d" />
        </linearGradient>
        <path id={id('vine')} d={mainVine} />
        <path id={id('glint')} d="M0-6 1.35-1.4 6 0 1.35 1.4 0 6-1.35 1.4-6 0-1.35-1.4Z" />
        <g id={id('filigree')} fill="none" strokeLinecap="round">
          <use href={href('vine')} strokeWidth="1.65" />
          <path d="M22 19c39 31 105 31 152 24 61-10 97-19 155-4 60 15 92 13 158 0M48 22c37 4 74 36 127 26 46-9 88-24 135-15 55 10 84 28 143 10m-218-9c43 13 68 17 110 12 38-5 64-23 105-13 9 2 18 7 25 9" strokeWidth="1.02" opacity=".83" />
          <path d="M68 37c9 8 21 11 28 10m59-4c24 13 54 16 67 6 5-4 3-9-1-9m149 3c25 7 39 1 52-6 10-5 28-9 34-2 3 4-3 7-7 5" strokeWidth=".71" opacity=".87" />
          <path d="M116 39c7-6 15-8 22-6-3 6-10 8-22 6Zm173-6c7-7 17-8 24-4-5 5-12 6-24 4Zm105 13c7-5 18-5 25-3-5 4-15 6-25 3Zm58-9 5-3 5 3-5 3Z" fill={paint('gold')} fillOpacity=".46" strokeWidth=".68" />
        </g>
        <g id={id('cherry-cluster')}>
          <path d="M30 20c29 1 56 14 80 31m-38-22c9-7 23-11 34-12m-11 26c22 1 36-6 49-16M67 29c-4 10-9 19-17 24" fill="none" stroke={paint('gold')} strokeWidth="1.5" strokeLinecap="round" />
          <g transform="translate(36 20) rotate(-11) scale(.84)"><SakuraBlossom fill={paint('sakura')} /></g>
          <g transform="translate(62 27) rotate(13) scale(1.24)"><SakuraBlossom fill={paint('sakura')} /></g>
          <g transform="translate(87 38) rotate(33) scale(.94)"><SakuraBlossom fill={paint('sakura')} /></g>
          <g transform="translate(109 18) rotate(-24) scale(.72)"><SakuraBlossom fill={paint('sakura')} /></g>
          <g transform="translate(126 43) rotate(10) scale(.69)"><SakuraBlossom fill={paint('sakura')} /></g>
          <g transform="translate(51 51) rotate(27) scale(.55)"><SakuraBlossom fill={paint('sakura')} /></g>
          <circle cx="146" cy="26" r="2.65" fill="#ffc4df" />
        </g>
        <g id={id('butterfly')} fill={paint('sakura')} stroke="#ffdeb1" strokeWidth=".9" strokeLinejoin="round">
          <path d="M0 2C-13-15-21-12-17-3c2 5 10 6 16 6-8-1-12 2-9 6C-7 13-2 8 0 2Zm0 0C13-15 21-12 17-3c-2 5-10 6-16 6 8-1 12 2 9 6C7 13 2 8 0 2Z" />
          <path d="M0 6V-2m0 0-4-4m4 4 4-4" fill="none" strokeLinecap="round" />
        </g>
        <g id={id('gem')} strokeLinecap="round" strokeLinejoin="round">
          <path d="M0-12c2 4 7 9 7 13 0 4-4 8-7 12C-3 9-7 5-7 1s5-9 7-13Z" fill={paint('crystal')} strokeWidth="1.05" />
          <path d="M0-10-3 1 0 11 3 1 0-10ZM-5 1H5" fill="none" stroke="#fff0cd" strokeOpacity=".8" strokeWidth=".57" />
        </g>
      </defs>

      <g className="hero-ornament__vines" stroke={paint('gold')}>
        <use href={href('filigree')} />
        <use href={href('filigree')} transform="translate(1000 0) scale(-1 1)" />
      </g>
      <g className="hero-ornament__vines-light" fill="none" stroke="#fff2c3" strokeWidth="2.15" strokeLinecap="round">
        <use href={href('vine')} />
        <use href={href('vine')} transform="translate(1000 0) scale(-1 1)" />
      </g>
      <g className="hero-ornament__cherries">
        <use href={href('cherry-cluster')} transform="translate(103 19) scale(.73)" />
        <use href={href('cherry-cluster')} transform="translate(897 19) scale(-.73 .73)" />
      </g>
      <g className="hero-ornament__lotus" stroke="#fff0bb" strokeWidth="2.4" strokeLinejoin="round">
        <g transform="translate(269 -5) scale(.462)">
        <path d="M500 76c-32 2-63-8-75-25 26-4 52 1 75 25Zm0 0c32 2 63-8 75-25-26-4-52 1-75 25Z" fill={paint('lotus')} />
        <path d="M500 75c-29-1-52-19-62-47 25 2 49 19 62 47Zm0 0c29-1 52-19 62-47-25 2-49 19-62 47Z" fill={paint('lotus')} />
        <path d="M500 74c-23-10-35-30-34-57 20 8 32 27 34 57Zm0 0c23-10 35-30 34-57-20 8-32 27-34 57Z" fill={paint('lotus')} />
        <path d="M500 73c-16-18-17-38 0-62 17 24 16 44 0 62Z" fill={paint('lotus')} />
        <path d="M500 76c-26 1-45-6-53-21 20-3 37 3 53 21Zm0 0c26 1 45-6 53-21-20-3-37 3-53 21Z" fill={paint('lotus')} />
        <path d="M500 71c-10-9-7-20 0-30 7 10 10 21 0 30Z" fill="#fff3d7" stroke="#ffc0b3" strokeWidth="1.5" />
        <path d="M500 76c8 5 8 13 0 23-8-10-8-18 0-23Z" fill={paint('lotus')} />
        <path d="M458 36c9 15 22 27 36 35m48-35c-9 15-22 27-36 35" stroke="#fff1d9" strokeOpacity=".68" strokeWidth="1.32" fill="none" />
        </g>
      </g>
      <g className="hero-ornament__pendant" fill="none" stroke={paint('gold')} strokeLinecap="round" strokeLinejoin="round">
        <path d="M500 41v32m-41-31v20m82-20v20" strokeWidth=".91" />
        <path d="m500 47 1.7 2-1.7 2-1.7-2zm0 11 1.7 2-1.7 2-1.7-2zm-41-9 1.3 1.7-1.3 1.7-1.3-1.7zm82 0 1.3 1.7-1.3 1.7-1.3-1.7z" fill="#ffe9b9" strokeWidth=".53" />
        <use href={href('gem')} transform="translate(500 81) scale(.9)" />
        <use href={href('gem')} transform="translate(459 66) scale(.65)" />
        <use href={href('gem')} transform="translate(541 66) scale(.65)" />
      </g>
      <g className="hero-ornament__butterflies">
        <g transform="translate(73 47) rotate(-19) scale(.52)"><use className="hero-ornament__butterfly" href={href('butterfly')} /></g>
        <g transform="translate(927 47) rotate(19) scale(-.52 .52)"><use className="hero-ornament__butterfly hero-ornament__butterfly--right" href={href('butterfly')} /></g>
      </g>
      <g className="hero-ornament__floating-petals" fill={paint('sakura')}>
        {petalsInFlight.map(([x, y, angle]) => (
          <g key={x} transform={`translate(${x} ${y}) rotate(${angle})`}>
            <path d="M-4 1c2-6 7-6 10-3-1 4-6 7-10 3Z" />
          </g>
        ))}
      </g>
      <g className="hero-ornament__stars" fill="#ffe7b7">
        {goldDots.map(([x, y], index) => <circle key={x} cx={x} cy={y} r={index % 3 === 0 ? 1.75 : 1.15} />)}
        <use href={href('glint')} transform="translate(316 20) scale(.61)" />
        <use href={href('glint')} transform="translate(410 41) scale(.58)" />
        <use href={href('glint')} transform="translate(590 41) scale(.58)" />
        <use href={href('glint')} transform="translate(684 20) scale(.61)" />
      </g>
    </svg>
  )
}

export function LandingFeatureBar() {
  return (
    <div className="hero-feature-group">
      <ul className="hero-features" aria-label="平台特色">
        {features.map(({ icon, label }) => (
          <li key={label}>
            <span className="hero-feature">
              <span className="hero-feature__medallion" aria-hidden="true">
                <PetalFrame />
                <LandingIcon className="hero-feature__icon" name={icon} />
              </span>
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>
      <FeatureEndCap />
      <FeatureEndCap right />
      <FeatureOrnament />
    </div>
  )
}
