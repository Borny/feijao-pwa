<template>
  <q-page class="page row justify-center items-center bg-secondary">
    <div class="row" v-if="isLoading">
      <q-spinner-tail color="accent" size="2em" />
    </div>
    <transition>
      <div v-if="!isLoading">
        <div class="row justify-center">
          <q-card v-for="(picture, idx) in pictures" :key="idx" :style="{ transform: `rotate(${picture.rotate}deg)` }"
            class="col-1-md q-ma-lg card bg-grey-lighter">
            <router-link :to="`/picture/${picture.id}`">
              <q-card-section
                :style="{ backgroundImage: `url('https://feijao-app.s3.eu-central-1.amazonaws.com/${picture.url}')` }"
                class="card__image">
              </q-card-section>
              <!-- <img :src="`./src/assets/pictures/${picture.url}`"> -->
              <q-card-section class="q-py-md bg-grey-lighter">
                <div class="text-h4 text-center font-caveat text-bold text-primary">
                  {{ picture.title }}
                </div>
              </q-card-section>
            </router-link>
          </q-card>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { onMounted, ref, defineComponent, computed } from 'vue'
import { usePictureStore } from "../stores/picture/picture";
import { useAppStore } from "../stores/app/app";
import { useQuasar } from 'quasar'

import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const quasar = useQuasar();
    const appStore = useAppStore();
    const pictureStore = usePictureStore();
    const pictures = ref([])
    const isLoading = ref(false);
    const url = ref('background: url(\'../assets/pictures/IMG_20230824_193519_Bokeh.jpg\')')

    function getRotation() {
      return rotate()
    }

    function init() {
      isLoading.value = true;
      appStore.$patch({ appTitle: "Accueil" });
      getData();
    }

    onMounted(async () => {
      init();
    });

    function getPicture(url) {
      return `background: url('../assets/pictures/${url}')`
    }

    function rotate() {
      const max = 20
      const min = -20

      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    async function getData() {

      try {
        const response = await pictureStore.getPictures()

        if (!response) {
          quasar.notify({
            message: 'Failed to get data',
            color: 'negative',
            icon: 'report_problem',
            position: 'top',
            timeout: 2500,
          })
        }
        pictures.value = response.data
        pictures.value.forEach(picture => {
          picture.rotate = rotate()
        });

      } catch (error) {
        console.log('failed to get data', error);
        quasar.notify({
          message: 'Failed to get data',
          color: 'negative',
          icon: 'report_problem',
          position: 'top',
          timeout: 2500,
        })
      } finally {
        isLoading.value = false;
      }
    }

    return {
      getRotation,
      getPicture,

      pictures,
      getData,
      isLoading,
      url,
    }
  }
})
</script>

<style lang="scss" scoped>
.v-enter-from {
  opacity: 0;
  // transform: translateX(100px);
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-to {
  opacity: 1;
  // transform: translateX(0);
}

.v-leave-from {
  // transform: translateX(0);
  opacity: 1;
}

.v-leave-active {
  transition: all 5s ease-out;
}

.v-leave-to {
  opacity: 0;
  // transform: translateX(100px);
}

.page {
  padding: 2rem;
}

.card {
  width: 320px;
  max-width: 320px;
  padding: 0.6rem;

  &__image {
    background-size: cover;
    background-position: center;
    object-fit: cover;
    height: 250px;
  }

  &__title {
    padding: 0.6rem 0.6rem 5rem;
  }
}
</style>
