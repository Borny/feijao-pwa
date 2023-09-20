<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round :class="showArrowBack ? '' : 'arrow-cursor'" :icon="showArrowBack ? 'arrow_back' : ''"
          color="info" aria-label="Back" @click="onNavigateBack" :style="!showArrowBack ? 'opacity: 0' : ''" />

        <q-toolbar-title class="text-h4 text-center text-info font-keep-on-truckin">Feijão Mágico</q-toolbar-title>

        <q-btn flat dense :label="getName" color="info">
          <q-icon right name="person" />
          <q-menu anchor="bottom end" self="top right" class="bg-secondary" v-model="showMenu">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-btn size="sm" flat dense color="accent" @click="onChangeLanguage('en-US')" :label="$t('ENGLISH')" />
                  <q-btn size="sm" flat dense color="accent" @click="onChangeLanguage('fr-FR')" :label="$t('FRENCH')" />
                  <q-btn size="sm" flat dense color="accent" @click="onChangeLanguage('pt-PT')"
                    :label="$t('PORTUGUESE')" />
                </q-item-section>
              </q-item>
              <!-- <q-item>
                <q-item-section>
                  <q-btn icon="settings" flat text-color="dark" @click="onOpenSettings" :label="$t('SETTINGS')" />
                </q-item-section>
              </q-item> -->
              <q-item>
                <q-item-section>
                  <q-btn icon="power_settings_new" flat text-color="dark" @click="logout" :label="$t('LOG_OUT')" />
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

    <!-- <q-dialog v-model="displaySettings" class="dialog--settings">
      <q-card class="bg-secondary">
        <q-card-section class="row justify-center">
          <p class="q-ml-sm text-accent">{{ $t('SETTINGS') }}</p>
        </q-card-section>
        <q-card-section class="row items-center">
          <form @submit.prevent="onUpdateSettings">
            <p class="text-body">{{ $t('UPDATE_NICKNAME') }}</p>
            <q-input v-model="nickname" type="text" rounded standout bg-color="accent" :placeholder="$t('NICKNAME')"
              class="input__settings q-my-sm">
            </q-input>

            <p class="text-body">{{ $t('UPDATE_PASSWORD') }}</p>
            <q-input v-model="newPassword" type="password" rounded standout bg-color="accent" :placeholder="$t('NEW_PASSWORD')"
              class="input__settings q-my-sm">
            </q-input>
            <q-input v-model="confirmedPassword" rounded standout bg-color="accent" :placeholder="$t('CONFIRMED_PASSWORD')"
              class="input__settings q-my-sm">
            </q-input>
          </form>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn :label="$t('CANCEL')" color="accent" v-close-popup />
          <q-btn :label="$t('UPDATE')" color="accent" @click="onUpdateSettings" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onUpdated, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from 'vue-i18n'
import { useAuthStore } from "../stores/auth/auth";

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const quasar = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
    const leftDrawerOpen = false
    const isMainLayoutLoaded = ref(false);
    const user = ref({});
    const showArrowBack = ref(false);
    const showMenu = ref(false);
    const displaySettings = ref(false);
    const nickname = ref('');
    const newPassword = ref('');
    const confirmedPassword = ref('');

    const { locale } = useI18n({ useScope: 'global' })

    const getName = computed(() => user.value.nickname && user.value.nickname !== 'null'  ? user.value.nickname : user.value.name)

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
        nickname.value = user.value.nickname;

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

    function onUpdateSettings() {
      showLoading();

      try {

      } catch (error) {

      } finally {
        hideLoading();
      }
    }

    return {
      authStore,
      leftDrawerOpen,
      isMainLayoutLoaded,
      onNavigateBack,
      onChangeLanguage,
      onOpenSettings,
      onUpdateSettings,
      logout,

      getName,

      user,
      nickname,
      newPassword,
      confirmedPassword,
      showArrowBack,
      showMenu,
      displaySettings,
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
