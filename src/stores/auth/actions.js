import { api } from "boot/axios";

export default {
  async login(name, password) {
    if (!name || !password) {
      throw new Error('Name or password required')
    }
    const response = await api.post('/login', {
      name, password
    })

    if (!response) {
      return 'No user found'
    }
    if ((response.status === 200)) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userName', response.data.data.name);
      localStorage.setItem('userId', response.data.data.id);

      if (response.data.data.nickname) { localStorage.setItem('nickname', response.data.data.nickname) }

      this.$patch({ token: response.data.data.token });
      this.$patch({
        user: {
          name: response.data.data.name,
          nickname: response.data.data.nickname,
          id: response.data.data.id,
        },
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`

      return response.data;
    }
  },

  async updateUser(nickname, newPassword, userId) {
    if (!userId) {
      throw new Error('User id required')
    }

    const response = await api.patch(`/user/${userId}`, {
      nickname, newPassword
    })

    if ((response.status === 200)) {
      if (nickname) { localStorage.setItem('nickname', nickname) }
      this.$patch({
        user: {
          nickname,
        },
      });
      return response.data;
    }
  },

  async getUser() {
    const userName = localStorage.getItem('userName')
    const userId = localStorage.getItem('userId')

    if (!userName) {
      this.logout()
    }

    try {
      const response = await api.get(`/user/${userId}`)
      this.$patch({ user: response.data })

      return response.data
    } catch (error) {
      throw new Error('No user found')
    }
  },

  autoLogin() {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      this.$patch({ token });
      this.$patch({
        user: {
          name: localStorage.getItem('userName'),
          nickname: localStorage.getItem('nickname'),
          id: +localStorage.getItem('userId')
        },
      });
    } else {
      this.logout()
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('nickname');
    localStorage.removeItem('userId');

    this.$patch({
      token: null,
      user: null,
    });
  },
}
