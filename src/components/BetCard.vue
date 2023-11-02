<template>
  <q-card v-if="bet && user" class="bet row items-center q-my-sm"
    :class="user.id === bet.user_id ? 'bg-dark' : 'bg-secondary'">
    <q-card-section class="col q-py-sm">
      <p :class="user.id === bet.user_id ? 'text-secondary' : 'text-primary'" class="text-capitalize">
        <small>
          {{ user.id === bet.user_id ? $t('YOU') : bet.name }}
        </small>
      </p>
      <p class="q-ml-md text-center" :class="user.id === bet.user_id ? 'text-primary' : 'text-accent'">
        <span class="text-capitalize">
          <q-icon :name="getIcon" size="2em" :color="getIconColor" />
        </span>
        <br>
        <q-icon name="height" color="primary" size="1.5rem" class="q-mr-sm" />{{ bet.height }}
        <q-icon name="fitness_center" color="primary" size="1.5rem" class="q-mr-sm q-ml-md" />{{ bet.weight }}
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
import { computed, defineComponent } from 'vue'

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
    const getIcon = computed(() => {
      // write a switch case to return the correct icon
      switch (props.bet.gender) {
        case 'male':
          return 'male'
          break;
        case 'female':
          return 'female'
          break;
        case 'other':
          return 'transgender'
          break;
        default:
          return ''
      }
    })
    const getIconColor = computed(() => {
      // write a switch case to return the correct icon
      switch (props.bet.gender) {
        case 'male':
          return 'info'
          break;
        case 'female':
          return 'primary'
          break;
        case 'other':
          return 'warning'
          break;
        default:
          return ''
      }
    })

    function onUpdateBet() {
      emit("udpateBet", { mode: 'update', bet: props.bet });
    }

    return {
      onUpdateBet,
      getIcon,
      getIconColor,
    }
  },
})
</script>
<style lang="scss" scoped>
.bet {
  width: 100%;
  max-width: 100%;
  border-radius: 16px;
  max-width: 500px;
}
</style>
