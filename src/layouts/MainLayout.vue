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
                  <q-btn size="sm" icon="install_mobile" flat text-color="accent" @click="onInstallApp" :label="$t('INSTALL_APP')" />
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
import { defineComponent, ref, onMounted, onUpdated, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from 'vue-i18n'
import { useAuthStore } from "../stores/auth/auth";
import useHomeStore from "../stores/home/home";

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

    homeStore.$subscribe((mutation, state) => {
      displayInstallApp.value = state.displayInstallApp
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
      logout,

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
