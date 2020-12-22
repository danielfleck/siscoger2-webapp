/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios, { AxiosResponse } from 'axios'
import { Loading, LocalStorage } from 'quasar'
import { transations } from 'src/config'
// import PrettyLog from '@emersonbraun/pretty-log'
import { errorNotify, successNotify } from './notify'
require('dotenv').config()

const getCompleteURL = (URL: string) => {
  const cleanURL = URL.charAt(0) === '/' ? URL.slice(1, URL.length) : URL
  const api = String(process.env.API_URL) || 'http://127.0.0.1:8888'
  return `${api}/${cleanURL}`
}

declare interface Headers {
  Accept: string,
  'Content-Type': 'application/json' | 'multipart/form-data',
  Authorization: string | null
}

type Response = any

type MainData = {
  method: string,
  path: string,
  status: number,
  returntype: string,
  message: string,
  'data (count)': number
  data?: any
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

const setHeaders = (file = false) => {
  headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json'
  headers.Authorization = getToken()
  return headers
}

function redirectIfNotLogged (response: { status: number }) {
  if (response.status === 403) window.location.replace('/login')
  return true
}

const getReturnType = (status: number) => (
  status >= 200 && status < 300 ? 'success' : 'error'
)

function logResponse (response: AxiosResponse<any>) {
  const mainData = getMainDataOfResponse(response)
  // PrettyLog.success(`Response ${mainData.path}:`)
  console.table(mainData)
}

function getMainDataOfResponse (response: AxiosResponse<any>, withData = false) {
  console.log(response)
  const mainData = {
    method: response.config.method,
    path: response.config.url,
    status: response.status,
    returntype: getReturnType(response.status),
    message: response.statusText,
    'data (count)': response.data.length || 0
  } as MainData
  if (withData) mainData.data = response.data
  return mainData
}

function setResponse (response: AxiosResponse, { complete = false, debug = false }): Response {
  redirectIfNotLogged(response)
  if (debug) logResponse(response)
  delete response.headers.Authorization // remove token of response

  if (complete) return getMainDataOfResponse(response, true)
  return response.data
}

export async function get (URL: string, { silent = true, msg = '', complete = false, load = true, debug = false } = {}): Promise<Response> {
  if (load) Loading.show()
  const headers = setHeaders()
  if (debug) console.time('⌚️ time to get request')

  try {
    const response = await axios.get(getCompleteURL(URL), { headers })
    if (debug) console.timeEnd('⌚️ time to get request')
    if (!silent) successNotify(msg || transations.get.success)
    if (load) Loading.hide()

    return setResponse(response, { complete, debug })
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to get request')
    if (!silent) errorNotify(transations.get.error)
    // PrettyLog.error(`Error to get ${URL}`, e)
    if (load) Loading.hide()

    return setResponse(e.response, { complete, debug })
  }
}

export async function post (URL: string, data: unknown, { file = false, silent = false, msg = '', complete = false, load = true, debug = false } = {}): Promise<Response> {
  if (load) Loading.show()
  const headers = setHeaders(file)
  if (debug) console.time('⌚️ time to post request')

  try {
    const response = await axios.post(getCompleteURL(URL), data, { headers })
    if (debug) console.timeEnd('⌚️ time to post request')
    if (!silent) successNotify(msg || transations.post.success)
    if (load) Loading.hide()

    return setResponse(response, { complete, debug })
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to post request')
    // PrettyLog.error(`Error to post ${URL}`, e)
    if (load) Loading.hide()
    return setResponse(e.response, { complete, debug })
  }
}

export async function put (URL: string, data: unknown, { silent = false, msg = '', complete = false, load = true, debug = false } = {}): Promise<Response> {
  if (load) Loading.show()
  const headers = setHeaders()
  if (debug) console.time('⌚️ time to put request')

  try {
    const response = await axios.put(getCompleteURL(URL), data, { headers })
    if (debug) console.timeEnd('⌚️ time to put request')
    if (!silent) successNotify(msg || transations.put.success)
    if (load) Loading.hide()

    return setResponse(response, { complete, debug })
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to put request')
    // PrettyLog.error(`Error to put ${URL}`, e)
    if (load) Loading.hide()

    return setResponse(e.response, { complete, debug })
  }
}

export async function deleteData (URL: string, { silent = false, msg = '', complete = false, load = true, debug = false } = {}): Promise<Response> {
  if (load) Loading.show()
  const headers = setHeaders()
  if (debug) console.time('⌚️ time to delete request')

  try {
    const response = await axios.delete(getCompleteURL(URL), { headers })
    if (debug) console.timeEnd('⌚️ time to delete request')
    if (!silent) successNotify(msg || transations.delete.success)
    if (load) Loading.hide()

    return setResponse(response, { complete, debug })
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to delete request')
    // PrettyLog.error(`Error to delete ${URL}`, e)
    if (load) Loading.hide()

    return setResponse(e.response, { complete, debug })
  }
}
