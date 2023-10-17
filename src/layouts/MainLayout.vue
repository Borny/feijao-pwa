<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round :class="showArrowBack ? '' : 'arrow-cursor'" :icon="showArrowBack ? 'arrow_back' : ''"
          color="info" aria-label="Back" @click="onNavigateBack" :style="!showArrowBack ? 'opacity: 0' : ''" />

        <q-toolbar-title class="text-h4 text-center text-info font-keep-on-truckin">Feijão Mágico</q-toolbar-title>

        <q-btn flat dense color="info">
          <q-icon name="person" />
          <q-menu anchor="bottom end" self="top right" class="bg-secondary" v-model="showMenu">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label
                    class="text-right text-capitalize text-primary">{{ user.name }}{{ getName }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-expansion-item dense expand-separator icon="language" :label="$t('LANGUAGE')" header-class="text-accent"
                expand-icon-class="text-accent">
                <q-list>
                  <q-item class="justify-end q-py-none" style="min-height: 30px;">
                    <q-btn size="sm" flat dense color="accent" @click="onChangeLanguage('en-US')"
                      :label="$t('ENGLISH')" />
                  </q-item>
                  <q-item class="justify-end q-py-none" style="min-height: 30px;">
                    <q-btn size="sm" flat dense color="accent" @click="onChangeLanguage('fr-FR')" :label="$t('FRENCH')" />
                  </q-item>
                  <q-item class="justify-end q-py-none" style="min-height: 30px;">
                    <q-btn size="sm" flat dense color="accent" @click="onChangeLanguage('pt-PT')"
                      :label="$t('PORTUGUESE')" />
                  </q-item>
                </q-list>
              </q-expansion-item>
              <q-item>
                <q-item-section>
                  <q-btn size="sm" icon="settings" flat text-color="accent" @click="onOpenSettings"
                    :label="$t('SETTINGS')" />
                </q-item-section>
              </q-item>
              <q-item v-if="displayInstallApp">
                <q-item-section>
                  <q-btn size="sm" icon="install_mobile" flat text-color="accent" @click="onInstallApp"
                    :label="$t('INSTALL_APP')" />
                </q-item-section>
              </q-item>
              <q-item v-if="displayNotificationPermission && displayTristan">
                <q-item-section>
                  <q-btn size="sm" icon="notifications" flat text-color="accent" @click="onRequestNotificationPermission"
                    :label="$t('ENABLE_NOTIFICATION')" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn size="sm" icon="power_settings_new" flat text-color="dark" @click="logout"
                    :label="$t('LOG_OUT')" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn v-if="displayNotificationPermission && displayTristan" size="sm" icon="notifications" flat
          text-color="accent" @click="onRequestNotificationPermission" :label="$t('ENABLE_NOTIFICATION')" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <q-footer v-if="true" elevated>
      <q-tabs align="justify" class="tab-router bg-primary text-info">
        <q-route-tab icon="photo_camera" to="/home" exact />
        <q-route-tab icon="star" to="/bet" exact />
        <!-- <q-route-tab icon="assignment" to="/gift" exact /> -->
      </q-tabs>
    </q-footer>

    <q-dialog v-model="displaySettings" class="dialog--settings">
      <q-card class="bg-secondary">
        <q-card-section class="row justify-center">
          <p class="q-ml-sm text-accent">{{ $t('SETTINGS') }}</p>
        </q-card-section>
        <q-card-section class="row items-center">
          <form @submit.prevent="onUpdateSettings">
            <p class="text-body text-center text-primary">{{ $t('UPDATE_NICKNAME') }}</p>
            <q-input v-model="nickname" type="text" standout bg-color="accent" :placeholder="$t('NICKNAME')"
              class="input__settings q-my-sm">
            </q-input>

            <p class="text-body text-center text-primary q-mt-lg">{{ $t('UPDATE_PASSWORD') }}</p>
            <q-input v-model="newPassword" type="password" standout bg-color="accent" :placeholder="$t('NEW_PASSWORD')"
              class="input__settings q-my-sm">
            </q-input>
            <q-input v-model="confirmedPassword" type="password" standout bg-color="accent"
              :placeholder="$t('CONFIRMED_PASSWORD')" class="input__settings q-my-sm">
            </q-input>
          </form>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn :label="$t('CANCEL')" color="info" v-close-popup />
          <q-btn :label="$t('UPDATE')" color="accent" @click="onUpdateSettings" :disabled="!isUpdateValidated"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onUpdated, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from 'vue-i18n'
import { useAuthStore } from "../stores/auth/auth";
import useHomeStore from "../stores/home/home";
import { configure } from 'quasar/wrappers';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const quasar = useQuasar();
    const router = useRouter();
    const i18n = useI18n()
    const authStore = useAuthStore();
    const homeStore = useHomeStore();
    const leftDrawerOpen = false
    const displayInstallApp = ref(homeStore.displayInstallApp)
    const displayNotificationPermission = ref(homeStore.displayEnableNotification)
    const isMainLayoutLoaded = ref(false);
    const user = ref({});
    const showArrowBack = ref(false);
    const showMenu = ref(false);
    const displaySettings = ref(false);
    const nickname = ref('');
    const newPassword = ref('');
    const confirmedPassword = ref('');
    const isUpdateValidated = computed(() => {
      return (newPassword.value.length && newPassword.value.length >= 4)
        && newPassword.value === confirmedPassword.value
        || (!newPassword.value.length && !confirmedPassword.value.length)
    });

    // TODO: delete
    const displayTristan = computed(() => user.value.name === 'tristan')

    const { locale } = useI18n({ useScope: 'global' })

    const getName = computed(() => user.value.nickname ? ` - ${user.value.nickname}` : '')

    function showLoading() {
      quasar.loading.show({
        spinnerColor: "primary",
      });
    }

    function hideLoading() {
      quasar.loading.hide();
      isMainLayoutLoaded.value = true
    }

    async function init() {
      showLoading();

      try {
        user.value = authStore.getUserInfo;
        nickname.value = user.value.nickname || '';

        if (!user.value) {
          quasar.notify({
            type: "warning",
            timeout: 2000,
            message: `No user found`,
            color: "warning",
          });
        }
      } catch (error) {
        logout();

      } finally {
        hideLoading();
      }
    }

    onMounted(() => {
      showArrowBack.value = router.currentRoute.value.path.includes('/picture')
      init();
    });

    onUpdated(() => {
      showArrowBack.value = router.currentRoute.value.path.includes('/picture')
    });

    function onNavigateBack() {
      router.push('/home');
    }

    function onChangeLanguage(language) {
      showMenu.value = false
      locale.value = language
    }

    function logout() {
      showMenu.value = false
      authStore.logout();
      router.replace("/login");
    }

    function onOpenSettings() {
      showMenu.value = false
      displaySettings.value = true
    }

    async function onUpdateSettings() {
      showLoading();

      if (newPassword.value !== confirmedPassword.value) {
        quasar.notify({
          type: "warning",
          timeout: 2000,
          message: `Passwords don't match`,
          color: "warning",
        });
        return
      }

      try {
        const response = await authStore.updateUser(nickname.value, newPassword.value, user.value.id)

        quasar.notify({
          type: "positive",
          timeout: 2000,
          message: `${i18n.t('UPDATE_SUCCESSFUL')}`,
          color: "positive",
        });

      } catch (error) {
        quasar.notify({
          type: "warning",
          timeout: 2000,
          message: `${i18n.t('UPDATE_FAILED')}`,
          color: "warning",
        });
      } finally {
        hideLoading();
      }
    }

    function onInstallApp() {
      homeStore.deferredPrompt.prompt()
    }

    async function displayConfirmationNotification() {
      if ('serviceWorker' in navigator) {
        const swRegistration = await navigator.serviceWorker.ready
        swRegistration.showNotification('Successfully subscribed!', {
          body: 'You successfully subscribed to our Notification Service',
          icon: './icons/icon-192x192.png',
          // image: './kalalau-beach.2009ff86.jpg',
          dir: 'ltr',
          lang: 'en-US',
          vibrate: [100, 50, 200], // vibration / pause / vibration / pause / .....
          badge: './icons/icon-192x192.png',
          tag: 'confirm-notification', // if set will stack the notifications, they won't show
          renotify: true,
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            { action: 'confirm', title: 'Okay', icon: '/icon-192x192.png' },
            { action: 'cancel', title: 'Cancel', icon: '/icon-192x192.png' }
          ]
        })
      }
    }

    function urlBase64ToUint8Array(base64String) {
      var padding = '='.repeat((4 - base64String.length % 4) % 4);
      var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    async function configurePushSub() {
      if (!('serviceWorker' in navigator)) {
        return
      }

      const swRegistration = await navigator.serviceWorker.ready
      const pushSubscription = await swRegistration.pushManager.getSubscription()
      let newSubscription
      console.log({ pushSubscription })
      if (!pushSubscription) {
        console.log('creating a new sub')
        // create a subscription
        // const vapidPublicKey = 'BPxo9CzMW4jUhjJYY0y742s0vQxdFBlEw6Td-Ro2CpXlLKCx87BCl9tBXSAtNDCDG6MTA5Y0eHutmbc9FbJpXjA';
        const vapidPublicKey = 'BEAJ_rG_ULITC2ONy_sanBMIfCtQAwcFL68aX9ein0EKUBBAVqnaRmDvq3GCX88ZBJxmsBHjbvnRSUoxQLqMiA8';
        const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
        newSubscription = await swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        })
      } else {
        // we have a subscription
      }

      if (newSubscription) {
        try {
          const subscriptionResponse = await homeStore.storeSubscription(newSubscription)
          if (subscriptionResponse) {
            displayConfirmationNotification()
          }
        } catch (error) {
        }
      }
    }

    async function onRequestNotificationPermission() {
      const permissionRequest = await Notification.requestPermission()
      if (permissionRequest === 'granted') {
        // homeStore.setNotificationPermissionDisplay(false)
        // displayConfirmationNotification()
        configurePushSub()
      } else {
        console.log('Unable to get permission to notify.');
      }
    }

    homeStore.$subscribe((mutation, state) => {
      displayInstallApp.value = state.displayInstallApp
      displayNotificationPermission.value = state.displayEnableNotification
    })

    return {
      authStore,
      leftDrawerOpen,
      isMainLayoutLoaded,
      onNavigateBack,
      onChangeLanguage,
      onOpenSettings,
      onUpdateSettings,
      onInstallApp,
      onRequestNotificationPermission,
      logout,

      displayTristan,

      getName,

      user,
      nickname,
      newPassword,
      confirmedPassword,
      showArrowBack,
      showMenu,
      displaySettings,
      isUpdateValidated,
      displayInstallApp,
      displayNotificationPermission,
    };
  }
})
</script>
<style lang="scss" scoped>
.q-router-link--exact-active {
  color: $primary;
  background: $info;
}

.arrow-cursor {
  pointer-events: none;
}
</style>
