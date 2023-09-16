<template>
  <div class="row flex-center container bg-primary">
    <transition>
      <form v-if="displayForm" class="column items-center form" @submit.prevent="submit">
        <div class="text-h3 q-ma-xl text-center text-info font-keep-on-truckin">Feijão Mágico</div>
        <q-input clearable :disable="isLoading" type="text" color="info" label-color="info" v-model="name" :label="$t('NAME')"
          :placeholder="$t('NAME')" class="q-mb-sm control" :rules="[(val) => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon color="info" name="account_circle" />
          </template>
        </q-input>
        <q-input clearable :disable="isLoading" type="password" color="info" label-color="info" :placeholder="$t('PASSWORD')"
          :label="$t('PASSWORD')" v-model="birthday" class="q-mb-sm control" :rules="[(val) => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon color="info" name="key" />
          </template>
        </q-input>
        <q-btn rounded color="info" text-color="primary" :label="$t('SIGN_IN')" :loading=" isLoading "
          :disabled=" !name || !isBirthdayValid || isLoading " class="q-mt-lg" type="submit" />
      </form>
    </transition>
  </div>
</template>

<script>

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../stores/auth/auth";
import { useAppStore } from "../stores/app/app";

export default {
  name: 'AdminLogin',

  setup() {
    const $q = useQuasar();
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const isAuth = computed(() => authStore.isAuth);
    const isBirthdayValid = computed(() => birthday.value && birthday.value.length >= 4);
    const birthdayTooShort = computed(() => birthday.value && birthday.value.length < 6);

    const loginSuccess = ref("");
    const name = ref("");
    const birthday = ref(null);
    const isLoading = ref(false);
    const displayForm = ref(false);

    function init() {
      appStore.$patch({ appTitle: "Login" });
      displayForm.value = true;
    }

    onMounted(async () => {
      init();
    });

    async function submit() {
      isLoading.value = true;

      try {
        const response = await authStore.login(name.value, birthday.value);

        if (!response) {
          $q.notify({
            message: "Please check your name or birthday",
            color: "negative",
          });
        }
        router.replace('/home');
      } catch (error) {
        $q.notify({
          message: "Please check your name or birthday",
          color: "negative",
        });
      } finally {
        isLoading.value = false;
      }
    }

    return {
      authStore,
      loginSuccess,
      isAuth,
      submit,
      displayForm,
      name,
      birthday,
      isBirthdayValid,
      birthdayTooShort,
      isLoading,
    };
  },
}
</script>
<style lang="scss" scoped>
.v-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-from {
  opacity: 1;
}

.v-leave-active {
  transition: all 5s ease-out;
}

.v-leave-to {
  opacity: 0;
}


.container {
  background: $grey-lighter;
  height: 100vh;
}

.form-container {
  height: 100%;
  width: 100%;

  @media (min-width: $breakpoint-sm-min) {
    max-width: 500px;
    max-height: 500px;
  }
}

.q-field--labeled .q-field__native {
  color: $white;
}

.logo {
  width: 160px;
}

.control {
  width: 100%;
  max-width: 320px;
}

.label {
  position: absolute;
  top: 15px;
  left: 0;
}
</style>
