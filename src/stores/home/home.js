import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

const useHomeStore = defineStore('home', {
  state: () => ({
    info: null,
    deferredPrompt: null,
    displayInstallApp: null,
    displayEnableNotification: null,
  }),
  getters,
  actions
});

export default useHomeStore
