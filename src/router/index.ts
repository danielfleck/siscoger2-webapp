/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { route } from 'quasar/wrappers'
// import VueRouter from 'vue-router'
import VueRouter, { Route } from 'vue-router'
import { Store } from 'vuex'
import { StateInterface } from '../store'
import { checkIfHasIncomplete, checkIfHasTerms, checkIfIsLogged, checkPermissions, checkRoles, Meta, Next } from './redirect'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to: Route, from: Route, next: Next):void => {
    if (to?.meta?.auth) {
      checkIfIsLogged(next)
    }

    if (to?.meta?.roles?.length) {
      checkRoles(to as Meta, next)
    }

    if (to?.meta?.permissions?.length) {
      checkPermissions(to as Meta, next)
    }

    if (
      from.path !== '/login' &&
        to.path !== '/login' &&
        to.path !== '/termos'
    ) {
      checkIfHasTerms(next)
    }

    checkIfHasIncomplete(to, from, next)

    next()
  })

  return Router
})
