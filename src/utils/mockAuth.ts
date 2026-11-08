export type MockUser = { email: string; name: string }

type MockAccount = MockUser & { salt: string; digest: string }

const sessionKey = 'xingxui:demo-session:v1'
const accountsKey = 'xingxui:demo-accounts:v1'

export const demoUser = { email: 'demo@xingxui.test', name: '演示用户' }
export const demoPassword = 'Xingxui123'

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

function getAccounts() {
  const accounts = read<MockAccount[]>(accountsKey, [])
  return Array.isArray(accounts) ? accounts : []
}

async function digestPassword(salt: string, password: string) {
  const bytes = new TextEncoder().encode(salt + ':' + password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function getMockSession(): MockUser | null {
  const session = read<MockUser | null>(sessionKey, null)
  return session && typeof session.name === 'string' && typeof session.email === 'string' ? session : null
}

function signIn(user: MockUser) {
  localStorage.setItem(sessionKey, JSON.stringify(user))
  return user
}

export async function mockLogin(email: string, password: string) {
  const address = email.trim().toLowerCase()
  if (address === demoUser.email && password === demoPassword) return signIn(demoUser)

  const account = getAccounts().find((candidate) => candidate.email === address)
  if (!account || await digestPassword(account.salt, password) !== account.digest) {
    throw new Error('演示邮箱或密码不正确。可使用演示账号，或先注册本地账号。')
  }
  return signIn({ email: account.email, name: account.name })
}

export async function mockRegister(email: string, name: string, password: string) {
  const address = email.trim().toLowerCase()
  const displayName = name.trim()
  if (!displayName) throw new Error('请输入昵称。')
  if (password.length < 8) throw new Error('演示密码至少需要 8 个字符。')
  const accounts = getAccounts()
  if (address === demoUser.email || accounts.some((account) => account.email === address)) {
    throw new Error('这个演示邮箱已注册，请直接登录。')
  }
  const salt = crypto.randomUUID()
  const digest = await digestPassword(salt, password)
  localStorage.setItem(accountsKey, JSON.stringify([...accounts, { email: address, name: displayName, salt, digest }]))
  return signIn({ email: address, name: displayName })
}

export function mockLogout() {
  localStorage.removeItem(sessionKey)
}
