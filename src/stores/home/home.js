import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useHomeStore = defineStore('home', {
  state: () => ({
    info: null
  }),
  getters,
  actions
});
