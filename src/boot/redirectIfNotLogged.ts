/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { errorNotify } from 'src/services/alert/notify'

interface To { meta: { auth: boolean | undefined, roles: string[] | undefined, permissions: string[] | undefined} }
type From = any
type Next = (arg0?: string | undefined) => void

export default ({ router, store, Vue }: any) => {
  router.beforeEach((to: To, from: From, next: Next):void => {
    if (to?.meta?.auth) {
      const logged = window.localStorage.getItem('token')
      if (!logged) {
        next('/login')
        errorNotify('Não autenticado')
      }
    }
    next()
  })
}
