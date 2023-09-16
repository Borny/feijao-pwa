import { api } from "boot/axios";

export default {
  async getPictures() {

    const response = await api.get('/pictures')

    // console.log({response});

    if (!response) {
      return 'No pictures found'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async getPictureById(id) {
    // console.log('getPictureById');

    const response = await api.get(`/picture/${id}`)

    // console.log({response});

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async getPictureWithComments(id) {

    const response = await api.get(`/picture-comment/${id}`)

    // console.log({response});

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async getPicture(id) {

    const response = await api.get(`/picture/${id}`)

    // console.log({response});

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },
}
