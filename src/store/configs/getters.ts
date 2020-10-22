import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ConfigStateInterface } from './state'

const getters: GetterTree<ConfigStateInterface, StateInterface> = {
  getDense (/* context */) {
    // your code
  }
}

export default getters
