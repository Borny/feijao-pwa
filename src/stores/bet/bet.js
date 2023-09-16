import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useBetStore = defineStore('bet', {
  state: () => ({
    info: null
  }),
  getters,
  actions
});
