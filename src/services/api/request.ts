import { LocalStorage } from 'quasar'

declare interface Headers {
  Accept: string,
  'Content-Type': 'application/json' | 'multipart/form-data',
  Authorization: string | null
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: null
} as Headers

const getToken = () => {
  const token = LocalStorage.getItem('token')
  return token ? `Bearer ${String(token)}` : ''
}

export const setToken = (token: string) => {
  LocalStorage.set('token', token)
}

export const setHeaders = (file = false):Headers => {
  headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json'
  headers.Authorization = getToken()
  return headers
}

export const getCompleteURL = (URL: string) => {
  const cleanURL = URL.charAt(0) === '/' ? URL.slice(1, URL.length) : URL
  const api = String(process.env.API_URL) || 'http://127.0.0.1:8888'
  return `${api}/${cleanURL}`
}
