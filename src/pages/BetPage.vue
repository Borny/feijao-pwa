<template>
  <q-page class="page">
    <transition>
      <div class="column">
        <div class="column items-center">
          <q-card class="col-1-md card bg-grey-lighter padding-none">
            <q-card-section class="bg-accent">
              <p class="text-center">
                Les paris sont ouverts !!!!
                <br>
                Vous pourrez les changer à tout moment.
                <br>
                Et nous, on prépare une petite surprise pour le/la gagnant/e.
              </p>
            </q-card-section>
          </q-card>
          <!-- BETS -->
          <div class="card--bet no-wrap column">
            <!-- LOADER -->
            <div v-if="loadingBets" class="no-bet">
              <q-spinner-tail color="accent" size="2em" />
            </div>
            <div v-if="!bets.length && !loadingBets" class="no-bet">
              <p>No bets yet...</p>
              <p>Be the first !</p>
            </div>
            <div v-if="bets.length && !loadingBets" class="bet__container">
              <bet-card v-for="(bet, idx) in bets" :key="idx" :bet="bet" :user="user"
                @udpateBet="onOpenBetDialog"></bet-card>
            </div>
          </div>
        </div>

        <!-- DIALOG -->
        <q-dialog v-model="displayBetDialog" class="dialog--bet">
          <q-card class="bg-secondary">
            <q-card-section class="row justify-center">
              <p class="q-ml-sm text-accent">{{ getDialogLabel }} your bet</p>
            </q-card-section>

            <!-- FORM -->
            <q-card-section class="">
              <form @submit.prevent="submit">
                <div class="q-gutter-sm">
                  <q-radio v-model="gender" color="accent" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                    val="male" label="Male" />
                  <q-radio v-model="gender" color="accent" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                    val="female" label="Female" />
                  <q-radio v-model="gender" color="accent" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                    val="other" label="Other" />
                </div>
                <q-input v-model="height" rounded standout bg-color="accent" placeholder="Height"
                  class="input__bet q-my-sm">
                </q-input>
                <q-input v-model="weight" rounded standout bg-color="accent" placeholder="Weight"
                  class="input__bet q-my-sm">
                </q-input>
                <q-input v-model="extra" rounded standout bg-color="accent" placeholder="Extra"
                  class="input__bet q-my-sm">
                </q-input>
              </form>
            </q-card-section>

            <q-card-actions align="between">
              <div>
                <q-btn v-if="!displayCreateBetBtn" label="Delete" color="info" @click="deleteBet" />
              </div>
              <div>
                <q-btn flat label="Nope" color="accent" v-close-popup />
                <q-btn label="Let's roll!" color="accent" @click="submit" :disable="!gender || !height || !weight"
                  v-close-popup />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- BUTTON STICKY -->
        <q-page-sticky v-if="displayCreateBetBtn" position="bottom-right" :offset="[20, 20]">
          <q-btn label="Place a bet" rounded color="accent" @click="onOpenBetDialog({ mode: 'create' })" />
        </q-page-sticky>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { onMounted, ref, defineComponent, computed } from 'vue'
import { useQuasar } from "quasar";
import { useBetStore } from "../stores/bet/bet";
import { useAppStore } from "../stores/app/app";
import { useAuthStore } from "../stores/auth/auth";
import BetCard from '../components/BetCard.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    BetCard
  },

  setup() {
    const quasar = useQuasar();
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const betStore = useBetStore();
    const bets = ref([])
    const loadingBets = ref(false);
    const displayBetDialog = ref(false);
    const displayCreateBetBtn = ref(false);
    const user = ref(null);
    const getDialogLabel = computed(() => {
      return displayCreateBetBtn.value ? 'Create' : 'Update'
    });

    const gender = ref(null)
    const height = ref(null)
    const weight = ref(null)
    const extra = ref(null)
    const betId = ref(null)

    function init() {
      appStore.$patch({ appTitle: "Bet" });
      user.value = authStore.getUserInfo;
      getBets();
    }

    onMounted(async () => {
      init();
    });

    async function getBets() {
      loadingBets.value = true;
      try {
        const response = await betStore.getBets()
        bets.value = response

        const betUserId = bets.value.map(bet => bet.user_id)
        displayCreateBetBtn.value = !betUserId.includes(authStore.user.id)
      } catch (error) {
        console.log('Failed to get data', error);
      } finally {
        loadingBets.value = false;
      }
    }

    async function deleteBet() {
      try {
        const response = await betStore.deleteBet(betId.value)

        if (response) {
          quasar.notify({
            type: 'positive',
            message: 'Bet deleted !'
          })
        }
      } catch (error) {
        if (response) {
          quasar.notify({
            type: 'negative',
            message: 'Failed to delete bet...'
          })
        }

      } finally {
        getBets()
        displayBetDialog.value = false;
      }

    }

    async function submit() {
      loadingBets.value = true;
      console.log('submit', gender.value, height.value, weight.value, extra.value, betId.value);
      const betData = {
        gender: gender.value,
        height: height.value,
        weight: weight.value,
        extra: extra.value,
        userId: authStore.user.id,
        id: betId.value,
      }

      try {
        let response;

        if (displayCreateBetBtn.value) {
          response = await betStore.createBet(betData)

          if (response) {
            quasar.notify({
              type: 'positive',
              message: 'Bet added !'
            })
          }
        } else {
          response = await betStore.updateBet(betData)

          if (response) {
            quasar.notify({
              type: 'positive',
              message: 'Bet updated !'
            })
          }
        }

        getBets()
      } catch (error) {
        quasar.notify({
          type: 'negative',
          message: 'Failed to add bet !'
        })
        console.log('failed to create bets');
      } finally {
      }
    }

    async function onOpenBetDialog(data) {
      console.log('onOpenBetDialog', data.bet, data.mode);

      gender.value = data.bet?.gender || null;
      height.value = data.bet?.height || null;
      weight.value = data.bet?.weight || null;
      extra.value = data.bet?.extra || null;
      betId.value = data.bet?.id || null;

      displayBetDialog.value = !displayBetDialog.value;
    }

    return {
      onOpenBetDialog,
      getBets,
      submit,
      bets,
      user,
      loadingBets,
      deleteBet,
      displayBetDialog,
      displayCreateBetBtn,
      getDialogLabel,
      gender,
      height,
      weight,
      extra,
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

.q-card {
  border-radius: 16px;
}

.card--bet {
  .no-bet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 500px;
    padding: 0 1rem;
    color: $info;
  }

  position: relative;
  width: 100%;

  @include screen-sm {
    max-width: 500px;
    padding: 0 1rem;
  }

  .bet__container {
    height: 100%;
    min-height: 100%;
    overflow-y: visible;
    padding: 0 0 5rem;

    @include screen-sm {
      overflow-y: auto;
    }
  }

  .input {
    &__container {
      position: fixed;
      bottom: 48px;
      left: 0;
      right: 0;
      padding: 0.5rem;
      width: 100%;

      @include screen-sm {
        position: absolute;
        bottom: 0;
        padding: 0.5rem 1rem 0;
      }

    }

    &__bet {
      width: 100%;
    }
  }
}
</style>
