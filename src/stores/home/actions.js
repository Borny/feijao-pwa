import { api } from "boot/axios";

export default {
  async getData() {

    const response = await api.get('/pictures')

    if (!response) {
      return 'No pictures found'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async getPicture(id) {

    const response = await api.get(`/picture/${id}`)

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async storeSubscription(newSubscription) {

    const response = await api.post(`/subscription`, { newSubscription })

    if (!response) {
      return 'Adding subscription failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  // PWA
  setDeferredPrompt(value) {
    this.$patch({ deferredPrompt: value })
  },

  setInstallAppDisplay(value) {
    this.$patch({ displayInstallApp: value })
  },

  setNotificationPermissionDisplay(value) {
    this.$patch({ displayEnableNotification: value })
  }
}
