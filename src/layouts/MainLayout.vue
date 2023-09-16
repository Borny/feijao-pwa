<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round :class="showArrowBack ? '' : 'arrow-cursor'" :icon="showArrowBack ? 'arrow_back' : ''"
          color="info" aria-label="Back" @click="onNavigateBack" :style="!showArrowBack ? 'opacity: 0': ''" />

        <q-toolbar-title class="text-h4 text-center text-info font-keep-on-truckin">
          Feijão Mágico
        </q-toolbar-title>

        <q-btn flat  dense :label="user.nickname ? user.nickname : user.name" color="info">
          <q-icon right name="person" />
          <q-menu anchor="bottom end" self="top right" class="bg-secondary">
            <q-item class="text-accent text-right q-pr-md">
              <q-item-section class="q-pr-md">
                {{ user.name }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-btn icon="power_settings_new" flat text-color="dark" @click="logout" label="logout" />
              </q-item-section>
            </q-item>
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
        <q-route-tab icon="assignment" to="/gift" exact />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
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
      console.log('init');
      showLoading();

      try {
        user.value = authStore.getUserInfo;

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
      console.log('onUpdated',  router.currentRoute.value.path.includes('/picture'));
    });

    function onNavigateBack() {
      router.push('/home');
    }

    function logout() {
      authStore.logout();
      router.replace("/login");
    }

    return {
      authStore,
      leftDrawerOpen,
      isMainLayoutLoaded,
      onNavigateBack,
      user,
      logout,
      showArrowBack,
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
