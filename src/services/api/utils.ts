import { Loading } from 'quasar'
import { transations } from 'src/config'
import { errorNotify, successNotify } from '../../libs/notify'

declare interface NotifyOptions {
  msg?: string
  method: 'get' | 'post' | 'put' | 'delete'
  success: boolean
}

export function toogleLoad (load: boolean, state: boolean): void {
  if (!load) return
  state ? Loading.show() : Loading.hide()
}

export function notify ({ msg, method, success }: NotifyOptions): boolean | void {
  if (success) return successNotify(msg || transations[method].success)
  return errorNotify(transations[method].error)
}
