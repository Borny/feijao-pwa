import { api } from "boot/axios";

export default {
  async getGiftById(pictureId) {
    // console.log('get gifts', pictureId);

    const response = await api.get(`/gift/${pictureId}`)

    // console.log('get gifts', {response});

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

    console.log('get gifts response', response.data)
    if ((response.status === 200)) {
      return response.data;
    }
  },

  async createGift(data) {
    console.log('this.createGift', data)
    const response = await api.post('/gift', data)

    if (!response) {
      return 'Gift creation failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async updateGift(giftData, userId) {
    console.log('store update gift', giftData)

    const response = await api.patch(`/gift/${giftData.id}`, { ...giftData, userId })

    if (!response) {
      return 'Gift update failed'
    }

    console.log('store update gift response', response)

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async deleteGift(giftId) {
    console.log('this.delete gift ', giftId)
    const response = await api.delete(`/gift/${giftId}`)

    if (!response) {
      return 'Gift delete failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },
}
