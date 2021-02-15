import { MutationTree } from 'vuex'
import { ConfigStateInterface } from './state'

const mutation: MutationTree<ConfigStateInterface> = {
  toogleDense (state: ConfigStateInterface) {
    state.dense = !state.dense
  },
  toogleFab (state: ConfigStateInterface) {
    state.fab = !state.fab
  },
  toogleMenu (state: ConfigStateInterface) {
    state.menu = !state.menu
  }
}

export default mutation
