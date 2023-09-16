import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    info: null
  }),
  getters,
  actions
});
