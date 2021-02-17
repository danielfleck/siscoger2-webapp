/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { errorNotify } from 'src/services/alert/notify'

import { errorNotify } from 'src/services/alert/notify'

interface To { meta: { auth: boolean | undefined, roles: string[] | undefined, permissions: string[] | undefined} }
type From = any
type Next = (arg0?: string | undefined) => void

export default ({ router, store, Vue }: any) => {
  router.beforeEach((to: To, from: From, next: Next):void => {
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

function checkRoles (to: To, next: Next) {
  const roles = to?.meta?.roles || []

  const userRoles = window.localStorage.getItem('roles') as unknown as string[]
  if (!userRoles.length) notAuthorized(next)

  roles.forEach((permission) => {
    console.log(permission, userRoles.includes(permission))
    if (userRoles.includes(permission)) {
      next()
    }
  })

  notAuthorized(next)
}

function checkPermissions (to: To, next: Next) {
  const permissions = to?.meta?.roles || []

  const userPermissions = window.localStorage.getItem('permissions') as unknown as string[]
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
