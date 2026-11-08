import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { LandingDialog } from '../components/LandingDialog'
import { LandingIcon, LotusMark } from '../components/LandingIcon'
import { LandingFeatureBar } from '../components/LandingOrnaments'
import { AuthModal } from '../components/AuthModal'
import { WorkbenchCta } from '../components/WorkbenchCta'
import { useHeroCarousel } from '../hooks/useHeroCarousel'
import { mockLogout, type MockUser } from '../utils/mockAuth'
import '../styles/landing.css'

type HeroScene = { name: string } & ({ background: string; character: string } | { portrait: string })

const scenes: HeroScene[] = [
  { name: '月下樱庭', background: '/images/landing/moon-background.webp', character: '/images/landing/moon-character.webp' },
  { name: '花间初晓', background: '/images/landing/dawn-background.webp', character: '/images/landing/dawn-character.webp' },
  { name: '花间月', portrait: '/images/landing/flower-moon.webp' },
  { name: '云水清欢', portrait: '/images/landing/cloud-and-water.webp' },
  { name: '山海秘境', portrait: '/images/landing/mountain-realm.webp' },
  { name: '九天玄境', portrait: '/images/landing/celestial-realm.webp' },
  { name: '春阁听风', portrait: '/images/landing/spring-pavilion.webp' },
  { name: '花间醉', portrait: '/images/landing/flower-reverie.webp' },
]

const help = [
  { title: '平台介绍', text: '星绘次元是一个面向漫剧创作的 AI 平台，规划覆盖剧本、分镜、画面与成片。' },
  { title: '进入工作台', text: '点击首页的主按钮。登录后即可到达工作台入口，制作界面暂未开放。' },
  { title: '演示登录与注册', text: '从右上角打开账号面板，可以填入演示账号，也可以注册本地演示账号。' },
  { title: '人物与背景轮播', text: '可切换主题、暂停或关闭轮播。人物和背景切换时，按钮与文字保持不动。' },
]

type Panel = 'auth' | 'account' | 'notice' | 'search'
type LandingPageProps = { user: MockUser | null; onUserChange: (user: MockUser | null) => void }

const noticeKey = 'xingxui:landing-notice-read:v1'

function noticeWasRead() {
  try { return localStorage.getItem(noticeKey) === '1' } catch { return false }
}

function LandingSearch() {
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()
  const matches = help.filter(({ title, text }) => (title + text).toLowerCase().includes(term))

  return (
    <>
      <label className="search-field">
        <LandingIcon name="search" />
        <input type="search" autoFocus placeholder="搜索功能或使用帮助…" aria-label="搜索功能或使用帮助" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <div aria-live="polite">
        {matches.length > 0 ? (
          <ul className="search-results">
            {matches.map(({ title, text }) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}
          </ul>
        ) : <p className="search-empty">没有匹配结果，试试「轮播」或「登录」。</p>}
      </div>
    </>
  )
}

export function LandingPage({ user, onUserChange }: LandingPageProps) {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const hasWorkbenchIntent = params.get('intent') === 'workbench'
  const [panel, setPanel] = useState<Panel | null>(() => hasWorkbenchIntent && !user ? 'auth' : null)
  const [enterAfterAuth, setEnterAfterAuth] = useState(hasWorkbenchIntent && !user)
  const [noticeRead, setNoticeRead] = useState(noticeWasRead)
  const carousel = useHeroCarousel(scenes.length)
  const activeScene = scenes[carousel.current]

  function dismiss() {
    setPanel(null)
    if (hasWorkbenchIntent) setParams({}, { replace: true })
  }

  function enterWorkbench() {
    if (user) {
      void navigate('/workbench')
      return
    }
    setEnterAfterAuth(true)
    setPanel('auth')
  }

  function authComplete(nextUser: MockUser) {
    onUserChange(nextUser)
    if (enterAfterAuth) {
      setPanel(null)
      void navigate('/workbench', { replace: hasWorkbenchIntent })
    } else {
      dismiss()
    }
  }

  function readNotice() {
    setNoticeRead(true)
    try { localStorage.setItem(noticeKey, '1') } catch { /* 仍可在本页标为已读。 */ }
  }

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header__inner">
          <Link className="landing-brand" to="/" aria-label="星绘次元首页">
            <LotusMark />
            <span><strong>星绘次元</strong><small>AI 漫剧创作平台</small></span>
          </Link>
          <div className="landing-toolbar">
            <button className="landing-search" type="button" aria-label="搜索功能或使用帮助" onClick={() => setPanel('search')}>
              <LandingIcon name="search" /><span>搜索功能、教程或资源…</span>
            </button>
            <button className="landing-icon-button notice-button" type="button" aria-label={noticeRead ? '通知' : '通知，有未读消息'} onClick={() => setPanel('notice')}>
              <LandingIcon name="bell" />{!noticeRead && <i aria-hidden="true" />}
            </button>
            <button className="landing-avatar" type="button" aria-label={user ? '演示账号' : '登录或注册'} onClick={() => {
              setEnterAfterAuth(false)
              setPanel(user ? 'account' : 'auth')
            }}>
              {user ? <span aria-hidden="true">{Array.from(user.name)[0]}</span> : <LandingIcon name="user" />}
            </button>
          </div>
        </div>
      </header>
      <main className="landing-hero">
        <div className="hero-art" aria-hidden="true">
          {scenes.map((scene, index) => {
            if (!carousel.requested.includes(index)) return null
            const portrait = 'portrait' in scene
            const layers = portrait
              ? [['portrait', scene.portrait]] as const
              : [['background', scene.background], ['character', scene.character]] as const
            return (
              <div className={`hero-scene${portrait ? ' hero-scene--portrait' : ''}${index === carousel.current ? ' is-current' : ''}`} key={scene.name} data-scene={scene.name}>
                {layers.map(([layer, source]) => (
                  <img
                    key={layer}
                    className={`hero-scene__${layer}`}
                    src={source}
                    alt=""
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    draggable={false}
                    onLoad={(event) => {
                      const image = event.currentTarget
                      const ready = () => {
                        if (image.isConnected) carousel.setLayerStatus(index, layer, 'loaded')
                      }
                      if (typeof image.decode !== 'function') {
                        ready()
                        return
                      }
                      void image.decode().then(ready, () => {
                        if (!image.isConnected) return
                        image.hidden = true
                        carousel.setLayerStatus(index, layer, 'failed')
                      })
                    }}
                    onError={(event) => {
                      event.currentTarget.hidden = true
                      carousel.setLayerStatus(index, layer, 'failed')
                    }}
                  />
                ))}
              </div>
            )
          })}
          <div className="hero-veil" />
        </div>
        <div className="hero-stage">
          <section className="hero-copy" aria-labelledby="hero-title">
            <h1 id="hero-title" className="hero-title">星绘次元<LandingIcon name="film" /></h1>
            <p className="hero-subtitle">AI 漫剧创作平台</p>
            <p className="hero-tagline">让创意，化为精彩的漫剧世界</p>
            <WorkbenchCta onClick={enterWorkbench} />
          </section>
          <LandingFeatureBar />
          <div className="hero-controls" role="group" aria-label="人物与背景轮播">
            {carousel.enabled ? (
              <>
                <span className="hero-controls__label">{activeScene?.name}</span>
                <button type="button" className="landing-icon-button" aria-label="上一张" disabled={!carousel.canStep} onClick={() => carousel.step(-1)}><LandingIcon name="left" /></button>
                <span className="hero-controls__number" aria-label={`第 ${carousel.current + 1} 张，共 ${scenes.length} 张`}>{String(carousel.current + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
                <button type="button" className="landing-icon-button" aria-label="下一张" disabled={!carousel.canStep} onClick={() => carousel.step(1)}><LandingIcon name="right" /></button>
                <button type="button" className="landing-icon-button" aria-label={carousel.playing ? '暂停轮播' : '继续轮播'} onClick={carousel.togglePlayback}><LandingIcon name={carousel.playing ? 'pause' : 'play'} /></button>
                <button type="button" className="landing-icon-button" aria-label="关闭轮播" onClick={carousel.toggleEnabled}><LandingIcon name="close" /></button>
              </>
            ) : <button type="button" className="hero-controls__restore" onClick={carousel.toggleEnabled}><LandingIcon name="play" />开启轮播</button>}
          </div>
        </div>
      </main>
      {panel === 'auth' && <AuthModal title={enterAfterAuth ? '登录后进入工作台' : '欢迎来到星绘次元'} onDismiss={dismiss} onSuccess={authComplete} />}
      {panel === 'search' && <LandingDialog title="站内搜索" onDismiss={dismiss}><LandingSearch /></LandingDialog>}
      {panel === 'notice' && (
        <LandingDialog title="通知" onDismiss={dismiss}>
          <div className="landing-notice"><strong>星绘次元介绍页开放预览</strong><p>可体验主题切换与模拟登录。漫剧制作工作台暂未开放。</p></div>
          {noticeRead ? <p className="notice-read" role="status"><LandingIcon name="check" />已读</p> : <button className="landing-action" type="button" onClick={readNotice}>标为已读</button>}
        </LandingDialog>
      )}
      {panel === 'account' && user && (
        <LandingDialog title="演示账号" onDismiss={dismiss}>
          <div className="landing-notice"><strong>{user.name}</strong><p>{user.email}</p></div>
          <button className="landing-action" type="button" onClick={() => {
            mockLogout()
            onUserChange(null)
            dismiss()
          }}>退出登录</button>
        </LandingDialog>
      )}
    </div>
  )
}
