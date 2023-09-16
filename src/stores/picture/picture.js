import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const usePictureStore = defineStore('picture', {
  state: () => ({
    pictures: null
  }),
  getters,
  actions
});
