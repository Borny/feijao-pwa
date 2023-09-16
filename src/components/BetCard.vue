<template>
  <q-card v-if="bet && user" class="bet row items-center q-my-sm"
    :class="user.id === bet.user_id ? 'bg-dark' : 'bg-secondary'">
    <q-card-section class="col q-py-sm">
      <p :class="user.id === bet.user_id ? 'text-secondary' : 'text-dark'">
        <small>
          {{ user.id === bet.user_id ? 'You' : bet.name }}
        </small>
      </p>
      <p class="q-ml-md text-center" :class="user.id === bet.user_id ? 'text-primary' : 'text-accent'">
        <span class="text-capitalize">{{ bet.gender }}</span> - {{ bet.height }} - {{ bet.weight }}
        <br>
        {{ bet.extra }}
      </p>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-btn v-if="user.id === bet.user_id" @click="onUpdateBet" flat round color="primary" icon="edit" />
    </q-card-section>
  </q-card>
</template>

<script>
import { onMounted, ref, defineComponent, computed } from 'vue'
import { useAuthStore } from "../stores/auth/auth";

export default defineComponent({
  name: 'BetCardComponent',

  props: {
    bet: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  emits: ['udpateBet'],

  setup(props, { emit }) {
    const authStore = useAuthStore();

    function init() {
      // user.value = authStore.user
    }

    function onUpdateBet() {
      console.log('udpate bet', props.bet)
      emit("udpateBet", { mode: 'update', bet: props.bet });
    }

    onMounted(async () => init());

    return {
      onUpdateBet,
    }
  },
})
</script>
<style lang="scss" scoped>
.bet {
  width: 100%;
  max-width: 100%;
  // width: 320px;
  border-radius: 16px;
  max-width: 500px;

  @media (min-width: $screen-xs) {}
}
</style>
