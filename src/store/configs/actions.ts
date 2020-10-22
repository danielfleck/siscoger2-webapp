import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ConfigStateInterface } from './state'

const actions: ActionTree<ConfigStateInterface, StateInterface> = {
  toogleDense (context, state: ConfigStateInterface) {
    context.commit('toogleDense', state)
  },
  toogleFab (context, state: ConfigStateInterface) {
    context.commit('toogleFab', state)
  }
}

export default actions
