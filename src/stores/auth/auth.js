import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  getters,
  actions
});
