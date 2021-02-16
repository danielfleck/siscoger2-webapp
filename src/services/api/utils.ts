import { Loading } from 'quasar'
import { transations } from 'src/config'
import { errorNotify, successNotify } from '../../libs/notify'

declare interface NotifyOptions {
  silent: boolean
  msg?: string
  method: 'get' | 'post' | 'put' | 'delete'
  success: boolean
}

export function toogleLoad (load: boolean, state: boolean): void {
  if (!load) return
  state ? Loading.show() : Loading.hide()
}

export function notify ({ silent, msg, method, success }: NotifyOptions): void {
  if (!silent) return
  if (success) successNotify(msg || transations[method].success)
  errorNotify(transations[method].error)
}
