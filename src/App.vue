<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth/auth';
import { api } from "boot/axios";
import router from './router';
import useHomeStore from './stores/home/home'

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore()
    const homeStore = useHomeStore()

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

    // PWA related
    window.addEventListener('appinstalled', () => {
      homeStore.setInstallAppDisplay(false)
      homeStore.setDeferredPrompt(null)
    })

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      homeStore.setInstallAppDisplay(true)
      // Stash the event so it can be triggered later.
      homeStore.setDeferredPrompt(e)
    })

    // Notification
    if('Notification' in window) {
      homeStore.setNotificationPermissionDisplay(true)
    }
  }
})
</script>
