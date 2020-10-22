import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { ConfigStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const configs: Module<ConfigStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default configs
