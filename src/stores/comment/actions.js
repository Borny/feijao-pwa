import { api } from "boot/axios";

export default {
  async getCommentsByPictureId(pictureId) {
    // console.log('get comments', pictureId);

    const response = await api.get(`/comment/${pictureId}`)

    // console.log('get comments', {response});

    if (!response) {
      return 'No comments found'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async getCommentId(id) {

    const response = await api.get(`/picture/${id}`)

    // console.log({response});

    if (!response) {
      return 'No picture found'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async createComment(data) {
    console.log('this.createComment', data)
    const response = await api.post('/comment', data)

    if (!response) {
      return 'Comment creation failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async deleteComment(commentId) {
    console.log('this.delete comment ', commentId)
    const response = await api.delete(`/comment/${commentId}`)

    if (!response) {
      return 'Comment delete failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },
}
