/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { errorNotify } from 'src/services/alert/notify'

import { LocalStorage } from 'quasar'
import { errorNotify } from 'src/services/alert/notify'
import { Route } from 'vue-router'

interface Meta { meta: { auth: boolean | undefined, roles: string[] | undefined, permissions: string[] | undefined} }
type Next = (arg0?: string | undefined) => void

export default ({ router, store, Vue }: any) => {
  router.beforeEach((to: Meta, from: Route, next: Next):void => {
    if (to?.meta?.roles?.length) {
      checkRoles(to, next)
      return
    }

    if (to?.meta?.permissions?.length) {
      checkPermissions(to, next)
      return
    }

    next()
  })
}

function checkRoles (to: Meta, next: Next) {
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

function checkPermissions (to: Meta, next: Next) {
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

function notAuthorized (next: Next) {
  next('/')
  errorNotify('Acesso não autorizado!')
}
