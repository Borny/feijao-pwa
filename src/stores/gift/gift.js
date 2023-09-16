import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useGiftStore = defineStore('gift', {
  state: () => ({
    info: null
  }),
  getters,
  actions
});
