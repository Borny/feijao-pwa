import { api } from "boot/axios";

export default {
  async getBetById(pictureId) {
    const response = await api.get(`/bet/${pictureId}`)

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
    if ((response.status === 200)) {
      return response.data;
    }
  },

  async createBet(data) {
    const response = await api.post('/bet', data)

    if (!response) {
      return 'Bet creation failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async updateBet(data) {
    const response = await api.patch(`/bet/${data.id}`, data)

    if (!response) {
      return 'Bet update failed'
    }
    if ((response.status === 200)) {
      return response.data;
    }
  },

  async deleteBet(betId) {
    const response = await api.delete(`/bet/${betId}`)

    if (!response) {
      return 'Bet delete failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },
}
