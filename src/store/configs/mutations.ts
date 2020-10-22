import { MutationTree } from 'vuex'
import { ConfigStateInterface } from './state'

const mutation: MutationTree<ConfigStateInterface> = {
  toogleDense (state: ConfigStateInterface) {
    state.dense = !state.dense
  },
  toogleFab (state: ConfigStateInterface) {
    state.fab = !state.fab
  }
}

export default mutation
