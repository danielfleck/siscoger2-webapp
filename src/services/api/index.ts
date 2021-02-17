/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosResponse } from 'axios'
import { Loading } from 'quasar'
import { getCompleteURL, setHeaders } from './request'
import { Response, setResponse } from './response'

declare interface Request {
  silent: boolean
  file?: boolean
  msg?: string
  load?: boolean
  debug?: boolean
}

const defaultGetRequest: Request = {
  silent: true,
  file: false,
  msg: '',
  load: true,
  debug: false
}

const defaultRequest: Request = {
  silent: false,
  file: false,
  msg: '',
  load: true,
  debug: false
}

export const api = {
  async get (URL: string, { silent, debug, load, msg }: Request = defaultGetRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders()
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.get(getCompleteURL(URL), { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  },

  async post (URL: string, data: unknown, { silent, debug, load, msg, file }: Request = defaultRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders(file)
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.post(getCompleteURL(URL), data, { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  },

  async put (URL: string, data: unknown, { silent, debug, load, msg }: Request = defaultGetRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders()
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.put(getCompleteURL(URL), data, { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  },

  async delete (URL: string, { silent, debug, load, msg }: Request = defaultGetRequest): Promise<Response> {
    if (load) Loading.show()
    const headers = setHeaders()
    const time = Date.now()

    try {
      const response: AxiosResponse = await axios.delete(getCompleteURL(URL), { headers })
      return setResponse(response, { time, debug, silent, msg, load })
    } catch (e) {
      return setResponse(e.response, { time, debug, silent, msg, load })
    }
  }
}
