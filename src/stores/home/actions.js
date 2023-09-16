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
}
