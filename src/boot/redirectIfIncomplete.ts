/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LocalStorage } from 'quasar'
import { errorNotify } from 'src/services/alert/notify'
import { Route } from 'vue-router'
type Next = (arg0?: string | undefined) => void

export default ({ router, store, Vue }: any) => {
  router.beforeEach((to: Route, from: Route, next: Next):void => {
    const incompleto = LocalStorage.getItem('incompleto')
    if (incompleto && incompleto !== to.fullPath) {
      next(String(incompleto))
      errorNotify('Favor terminar a inserção antes de continuar')
    }
    next()
  })
}
