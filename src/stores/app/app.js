import { defineStore } from 'pinia'
// import getters from './getters'
import actions from './actions'

export const useAppStore = defineStore('app', {
  state: () => ({
    appTitle: null
  }),
  // getters,
  actions
});
