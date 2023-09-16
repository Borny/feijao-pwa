<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth/auth';
import { api } from "boot/axios";
import router from './router';

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore()

    api.interceptors.response.use((response) => response, (error) => {
      console.log(error)
      if (error.response && error.response.data.statusCode === 401 && error.response.data.message === 'invalidToken') {
        authStore.logout();
        window.location.reload()
      }

      return Promise.reject(error)
    })

    router.beforeEach((to, from, next) => {
      if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    });

    authStore.autoLogin();
  }
})
</script>
