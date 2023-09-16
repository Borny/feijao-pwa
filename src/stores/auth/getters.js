export default {
  isAuthenticated: (state) => {
    return !!state.token;
  },
  getToken: (state) => {
    return state.token;
  },
  getUserInfo: (state) => {
    return state.user;
  },
}
