<template>
  <q-card v-if="comment && user" class="comment row items-center q-my-sm"
    :class="user.id === comment.user_id ? 'bg-dark' : 'bg-secondary'">
    <q-card-section class="col q-py-sm">
      <p :class="user.id === comment.user_id ? 'text-secondary' : 'text-primary'" class="text-capitalize">
        <small>
          {{ user.id === comment.user_id ? $t('YOU') : comment.name }}
        </small>
      </p>
      <p class="q-ml-md" :class="user.id === comment.user_id ? 'text-primary' : 'text-accent'">
        {{ comment.comment }}
      </p>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-btn v-if="user.id === comment.user_id" @click="openDeleteCommentDialog = true" flat round color="primary" icon="delete" />
    </q-card-section>

    <q-dialog v-model="openDeleteCommentDialog" class="dialog--comment">
      <q-card>
        <q-card-section class="row items-center">
          <p class="q-ml-sm text-info">{{ $t('CONFIRM_DELETE_COMMENT') }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('NO')" color="info" v-close-popup />
          <q-btn flat :label="$t('YES')" color="info" @click="onDeleteComment" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { onMounted, ref, defineComponent, computed } from 'vue'
import { useAuthStore } from "../stores/auth/auth";

export default defineComponent({
  name: 'CommentCardComponent',

  props: {
    comment: {
      type: Object,
      required: true
    },
  },

  emits: ['deleteComment'],

  setup(props, { emit }) {
    const authStore = useAuthStore();
    const user = ref(null)
    const formatDate = computed(() => props.comment.updated_at ?
      `${new Date(props.comment.updated_at).getDate()}-${new Date(props.comment.updated_at).getMonth()}-${new Date(props.comment.updated_at).getYear()}`
      : null);

    function init() {
      user.value = authStore.user
    }

    function onDeleteComment() {
      emit("deleteComment", props.comment.id);
    }

    onMounted(async () => init());

    return {
      onDeleteComment,
      openDeleteCommentDialog: ref(false),
      user,
      formatDate
    }
  },
})
</script>
<style lang="scss" scoped>
.comment {
  width: 100%;
  max-width: 100%;
  // width: 320px;
  border-radius: 16px;
  max-width: 500px;

  @media (min-width: $screen-xs) {}
}
</style>
