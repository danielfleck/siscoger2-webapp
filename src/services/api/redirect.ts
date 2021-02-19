import { errorNotify } from '../alert'
import { removeToken } from '../auth'

export function redirectIfBadStatus (status: number) {
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
