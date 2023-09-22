import { api } from "boot/axios";

export default {
  async getPictures() {

    const response = await api.get('/pictures')

    if (!response) {
      return 'No pictures found'
    }

    if ((response.status === 200)) {
      return response.data.pictures;
    }
  },

  async getPictureById(id) {

    const response = await api.get(`/picture/${id}`)

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async getPictureWithComments(id) {

    const response = await api.get(`/picture-comment/${id}`)

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 200)) {
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
