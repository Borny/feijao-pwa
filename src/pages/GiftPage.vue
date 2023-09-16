<template>
  <q-page class="page">
    <transition>
      <div class="column">

        <div class="column">
          <q-card flat v-for="(gift, idx) in gifts" :key="idx" class="col-1-md card bg-primary padding-none">
            <q-card-section class="q-pt-md q-pb-xl bg-white">
              <img :src="`./src/assets/pictures/${gift.picture_url}`">
              <div class="text-h4 text-center font-caveat text-bold text-primary">
                {{ gift.title }}
              </div>
            </q-card-section>
            <q-card-actions class="card__action" align="center">
              <q-btn :color="gift.state === 'free' ? 'accent' : 'info'" text-color="primary"
                :label="gift.state === 'free' ? 'Je m\'en occupe' : 'Déjà pris...'"
                :disable="gift.state === 'booked' && gift.user_id !== user.id" @click="onOpenGiftDialog(gift)">
                <q-icon v-if="gift.state === 'booked' && gift.user_id === user.id" right name="edit" />
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>

        <!-- DIALOG -->
        <q-dialog v-model="displayGiftDialog" class="dialog--gift">
          <q-card class="bg-secondary">
            <q-card-section v-if="selectedGift.state === 'free'" class="column items-center">
              <p class="q-mt-lg text-accent">Vous avez choisi</p>
              <p class="q-mt-lg text-accent font-caveat text-h3">{{ selectedGift.title }}</p>
            </q-card-section>
            <q-card-section v-else class="column items-center">
              <p class="q-mt-lg text-accent">Vous avez changé d'avis ?</p>
            </q-card-section>

            <!-- FORM -->
            <q-card-section class="row justify-center">
              <q-btn color="accent" :label="selectedGift.state === 'free' ? 'Je confirme' : 'Annuler ma réservation'"
                @click="submit" />
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat size="sm" label="Retour à la liste" color="accent" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- DIALOG 02 -->
        <q-dialog v-model="displayThanksDialog" class="dialog--thanks">
          <q-card class="bg-secondary">
            <q-card-section class="row justify-center">
              <p class="q-ml-sm text-accent">Muito obrigado !</p>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { onMounted, ref, defineComponent, computed } from 'vue'
import { useQuasar } from "quasar";
import { useGiftStore } from "../stores/gift/gift";
import { useAppStore } from "../stores/app/app";
import { useAuthStore } from "../stores/auth/auth";

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const quasar = useQuasar();
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const giftStore = useGiftStore();
    const gifts = ref([])
    const selectedGift = ref(null)
    const loadingGifts = ref(false);
    const displayGiftDialog = ref(false);
    const displayThanksDialog = ref(false);
    const user = ref(null);
    // const getDialogLabel = computed(() => {
    //   return displayCreateGiftBtn.value ? '' : 'Update'
    // });

    function init() {
      appStore.$patch({ appTitle: "Gift" });
      user.value = authStore.getUserInfo;

      getGifts();
    }

    onMounted(async () => {
      init();
    });

    async function getGifts() {
      loadingGifts.value = true;
      try {
        const response = await giftStore.getGifts()
        gifts.value = response

      } catch (error) {
        console.log('Failed to get data', error);
      } finally {
        loadingGifts.value = false;
      }
    }

    async function submit() {
      loadingGifts.value = true;
      displayGiftDialog.value = false;

      try {
        console.log(user.value.id);
        selectedGift.value.user_id = selectedGift.value.user_id ? null : user.value.id;
        selectedGift.value.state = selectedGift.value.state === 'free' ? 'booked' : 'free';
        const response = await giftStore.updateGift(selectedGift.value)

        if (response) {
          quasar.notify({
            type: 'positive',
            message: `${selectedGift.value.state !== 'free' ? 'Gift booked' : 'Gift unbooked'}`
          })

          if (selectedGift.value.state !== 'free') {
            displayThanksDialog.value = true;

            setTimeout(() => {
              displayThanksDialog.value = false;
            }, 3000);
          }
        }

      } catch (error) {
        quasar.notify({
          type: 'negative',
          message: 'Failed to book gift !'
        })
        console.log('failed to create gifts');
      } finally {
        selectedGift.value = null;
        getGifts()
        loadingGifts.value = true;
      }
    }

    async function onOpenGiftDialog(gift) {
      console.log('onOpenGiftDialog', gift);

      selectedGift.value = gift;

      displayGiftDialog.value = !displayGiftDialog.value;
    }

    return {
      onOpenGiftDialog,
      getGifts,
      submit,
      loadingGifts,
      displayGiftDialog,
      displayThanksDialog,
      // getDialogLabel,

      selectedGift,
      gifts,
      user,
    }
  }
})
</script>

<style lang="scss" scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-to {
  opacity: 1;
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

.page {
  background: $primary;
  padding: 2rem;

  display: flex;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 320px;
  padding: 0.6rem;

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    border: 0;
  }

  &__action {
    margin: -1.7rem 0 0;
  }
}

.dialog{
  &--gift{
    .q-card{
      width: 100%;
      max-width: 320px;
    }
  }
}


</style>
