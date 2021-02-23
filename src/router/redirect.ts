import { LocalStorage } from 'quasar'
import { errorNotify } from 'src/services/alert/notify'
import { User } from 'src/types'
import { Route } from 'vue-router'

export type Next = (arg0?: string | undefined) => void
export interface Meta { meta: { auth: boolean | undefined, roles: string[] | undefined, permissions: string[] | undefined} }

// const routeLogin = (to: Route, from: Route) => from.path !== '/login' || to.path !== '/login'

export function checkIfIsLogged (next: Next) {
  const logged = LocalStorage.getItem('token')
  if (!logged) {
    errorNotify('Não autenticado')
    next('/login')
  }
}

export function checkIfHasTerms (next: Next) {
  const user = LocalStorage.getItem('user') as unknown as User
  if (!user.terms) {
    return next('/termos')
  }
}

export function checkIfHasIncomplete (to: Route, from: Route, next: Next) {
  const incompleto = LocalStorage.getItem('incompleto')
  if (!incompleto) return
  if (incompleto === to.fullPath) return
  errorNotify('Favor terminar a inserção antes de continuar')
  return next(String(incompleto))
}

export function checkRoles (to: Meta, next: Next) {
  const roles = to?.meta?.roles || []

  const userRoles = LocalStorage.getItem('roles') as unknown as string[]
  if (!userRoles.length) notAuthorized(next)

  roles.forEach((role) => {
    console.log(role, userRoles.includes(role))
    if (userRoles.includes(role)) {
      next()
    }
  })

  notAuthorized(next)
}

export function checkPermissions (to: Meta, next: Next) {
  const permissions = to?.meta?.roles || []

  const userPermissions = LocalStorage.getItem('permissions') as unknown as string[]
  if (!userPermissions.length) notAuthorized(next)

  permissions.forEach((permission) => {
    console.log(permission, userPermissions.includes(permission))
    if (userPermissions.includes(permission)) {
      next()
    }
  })

  notAuthorized(next)
}

export function notAuthorized (next: Next) {
  next('/')
  errorNotify('Acesso não autorizado!')
}
