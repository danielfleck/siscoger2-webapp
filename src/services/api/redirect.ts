import { errorNotify } from '../alert'
import { removeToken } from '../auth'

export function redirectIfBadStatus (status: number, noRedirect = false) {
  console.log(noRedirect)
  if (noRedirect) return
  if (status === 401) {
    removeToken()
    return window.location.replace('/login')
  }

  console.log(status)
  if (status === 403) {
    errorNotify('Não autorizado')
    return window.location.replace('/')
  }
}
