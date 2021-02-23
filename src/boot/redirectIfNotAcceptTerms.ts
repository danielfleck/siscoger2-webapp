/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LocalStorage } from 'quasar'
import { User } from 'src/types'
import { Route } from 'vue-router'

interface Meta { meta: { auth: boolean | undefined, roles: string[] | undefined, permissions: string[] | undefined} }
type Next = (arg0?: string | undefined) => void

export default ({ router, store, Vue }: any) => {
  router.beforeEach((to: Route, from: Route, next: Next):void => {
    const conditions = from.path !== '/login' && to.path !== '/login' && to.path !== '/termos'
    if (conditions) {
      const user = LocalStorage.getItem('user') as unknown as User
      if (!user.terms) {
        return next('/termos')
      }
      next()
    }
    next()
  })
}
