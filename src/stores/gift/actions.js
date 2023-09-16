import { api } from "boot/axios";

export default {
  async getGiftById(pictureId) {
    const response = await api.get(`/gift/${pictureId}`)

    if (!response) {
      return 'No gifts found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async getGifts() {
    const response = await api.get(`/gift`)

    if (!response) {
      return 'No gift found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async createGift(data) {
    const response = await api.post('/gift', data)

    if (!response) {
      return 'Gift creation failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async updateGift(giftData, userId) {
    const response = await api.patch(`/gift/${giftData.id}`, { ...giftData, userId })

    if (!response) {
      return 'Gift update failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async deleteGift(giftId) {
    const response = await api.delete(`/gift/${giftId}`)

    if (!response) {
      return 'Gift delete failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },
}
