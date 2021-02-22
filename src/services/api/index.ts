/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosResponse } from 'axios'
import { Loading } from 'quasar'
import { redirectIfBadStatus } from './redirect'
import { getCompleteURL, setHeaders } from './request'
import { Response, setResponse } from './response'

declare interface Request {
  silent?: boolean
  file?: boolean
  msg?: string
  load?: boolean
  debug?: boolean
  noRedirect?: boolean
}

const defaultGetRequest: Request = {
  silent: true,
  file: false,
  msg: '',
  load: true,
  debug: false,
  noRedirect: true
}

const defaultRequest = {
  silent: false,
  file: false,
  msg: '',
  load: true,
  debug: false,
  noRedirect: true
}

export const api = {
  async get (URL: string, { silent, debug, load, msg, noRedirect }: Request = defaultGetRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders()
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.get(getCompleteURL(URL), { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect)
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  },

  async post (URL: string, data: unknown, { silent, debug, load, msg, file, noRedirect }: Request = defaultRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders(file)
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.post(getCompleteURL(URL), data, { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect)
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  },

  async put (URL: string, data: unknown, { silent, debug, load, msg, noRedirect }: Request = defaultRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders()
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.put(getCompleteURL(URL), data, { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect)
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  },

  async delete (URL: string, { silent, debug, load, msg, noRedirect }: Request = defaultRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders()
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.delete(getCompleteURL(URL), { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect)
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  }
}
