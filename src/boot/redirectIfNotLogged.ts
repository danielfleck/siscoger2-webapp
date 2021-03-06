/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LocalStorage } from 'quasar'
import { errorNotify } from 'src/services/alert/notify'
import { Route } from 'vue-router'

interface Meta { meta: { auth: boolean | undefined, roles: string[] | undefined, permissions: string[] | undefined} }
type Next = (arg0?: string | undefined) => void

export default ({ router, store, Vue }: any) => {
  router.beforeEach((to: Meta, from: Route, next: Next):void => {
    if (to?.meta?.auth) {
      const logged = LocalStorage.getItem('token')
      if (!logged) {
        next('/login')
        errorNotify('Não autenticado')
      }
    }
    next()
  })
}
