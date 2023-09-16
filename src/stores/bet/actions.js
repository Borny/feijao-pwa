import { api } from "boot/axios";

export default {
  async getBetById(pictureId) {
    // console.log('get bets', pictureId);

    const response = await api.get(`/bet/${pictureId}`)

    // console.log('get bets', {response});

    if (!response) {
      return 'No bets found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async getBets() {
    const response = await api.get(`/bet`)

    if (!response) {
      return 'No bet found'
    }

    console.log('get bets response', response.data)
    if ((response.status === 200)) {
      return response.data;
    }
  },

  async createBet(data) {
    console.log('this.createBet', data)
    const response = await api.post('/bet', data)

    if (!response) {
      return 'Bet creation failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async updateBet(data) {
    console.log('store update bet', data)
    const response = await api.patch(`/bet/${data.id}`, data)

    if (!response) {
      return 'Bet update failed'
    }

    console.log('store update bet response', response)

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async deleteBet(betId) {
    console.log('this.delete bet ', betId)
    const response = await api.delete(`/bet/${betId}`)

    if (!response) {
      return 'Bet delete failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },
}
