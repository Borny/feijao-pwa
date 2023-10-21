<template>
  <q-page class="page  bg-primary">
    <div class="row justify-center" v-if="isLoading">
      <q-spinner-tail color="accent" size="2em" />
    </div>
    <transition>
      <div v-if="!isLoading && picture" class="container">
        <q-card class="card--picture">
          <q-img class="image" :src="`https://feijao-app.s3.eu-central-1.amazonaws.com/${picture.url}`">
            <div class="image__label">
              {{ picture.location }}
              <br>
              {{ formatDate }}
            </div>
          </q-img>
        </q-card>

        <!-- COMMENTS -->
        <div class="card--comment no-wrap column">

          <!-- LOADER -->
          <div v-if="loadingComments" class="no-comment">
            <q-spinner-tail color="accent" size="2em" />
          </div>

          <!-- No comment -->
          <div v-if="!comments.length && !loadingComments" class="no-comment">
            <p>{{ $t('NO_COMMENTS_YET') }}</p>
            <p>{{ $t('BE_THE_FIRST') }}</p>
          </div>

          <!-- Comments list -->
          <div v-if="comments.length && !loadingComments" class="comment__container scroll" id="chatScroll">
            <comment-card v-for="(comment, idx) in comments" :key="idx" :comment="comment" @deleteComment="deleteComment"
              class="comment-card"></comment-card>
          </div>

          <!-- SEND COMMENT -->
          <div class="input__container bg-primary row justify-center">
            <q-input @submit="createComment" rounded standout bg-color="accent" v-model.trim="commentToCreate"
              :placeholder="$t('WHICH_TITLE_WOULD_BE_BEST')" class="input__comment">
              <template v-slot:append>
                <q-btn @click="createComment" type="button" color="primary" :disabled="!commentToCreate || isLoading"
                  round dense flat icon="send" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { onMounted, onBeforeUnmount, onUpdated, ref, defineComponent, computed } from 'vue'
import { useRoute } from "vue-router";
import { useQuasar, scroll } from "quasar";
import { useI18n } from 'vue-i18n'
import { usePictureStore } from "../stores/picture/picture";
import { useAuthStore } from "../stores/auth/auth";
import { useCommentStore } from "../stores/comment/comment";
import { useAppStore } from "../stores/app/app";
import CommentCard from '../components/CommentCard.vue'
import { comment } from 'postcss';

export default defineComponent({
  name: 'PicturePage',

  components: {
    CommentCard
  },

  setup() {
    const quasar = useQuasar();
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const pictureStore = usePictureStore();
    const commentStore = useCommentStore();
    const i18n = useI18n()
    const picture = ref(null)
    const route = useRoute();
    const isLoading = ref(false);
    const loadingComments = ref(false);
    const commentToCreate = ref(null);
    const comments = ref([]);
    const displayPage = ref(false);
    const { getScrollTarget, setVerticalScrollPosition } = scroll

    const formatDate = computed(() => {
      const date = new Date(picture.value.created_at)
      return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric', })
    });

    function init() {
      isLoading.value = true;
      appStore.$patch({ appTitle: "Accueil" });
      getPicture()
    }

    onMounted(async () => {
      init();
    });

    onBeforeUnmount(async () => {
      displayPage.value = false;
    });

    async function getPicture() {
      const pictureId = route.params.id

      try {
        const response = await pictureStore.getPictureById(pictureId)
        picture.value = response.picture

        getComments()
      } catch (error) {
      } finally {
        isLoading.value = false;
      }
    }

    async function getComments() {
      loadingComments.value = true;
      try {
        const response = await commentStore.getCommentsByPictureId(picture.value.id)

        comments.value = response

        setTimeout(() => {

          const commentCards = document.querySelectorAll(".comment-card")
          const lastComment = commentCards[commentCards.length - 1]
          let offset = lastComment && lastComment.offsetTop + 200
          let target = getScrollTarget()

          if (!quasar.platform.is.mobile) {
            target = getScrollTarget(lastComment)
            offset -= 200
          }
          const duration = 100
          setVerticalScrollPosition(target, offset, duration)
        }, 500);

      } catch (error) {
        console.log('failed to get comments', error);
      } finally {
        loadingComments.value = false;
      }
    }

    async function createComment() {
      try {
        await commentStore.createComment({
          comment: commentToCreate.value,
          pictureId: picture.value.id,
          userId: authStore.user.id,
          userName: authStore.user.nickname || authStore.user.name,
        })
        commentToCreate.value = null

        getComments()

        quasar.notify({
          type: 'positive',
          message: `${i18n.t('COMMENT_ADDED')}`,
        })

      } catch (error) {
        quasar.notify({
          type: 'negative',
          message: `${i18n.t('FAILED_TO_ADD_COMMENT')}`,
        })
        console.log(error, 'failed to create comments');
      }
    }

    async function deleteComment(commentId) {
      loadingComments.value = true;
      try {
        const response = await commentStore.deleteComment(commentId)

        quasar.notify({
          type: 'positive',
          message: `${i18n.t('COMMENT_DELETED')}`,

        })

        getComments()

      } catch (error) {
        quasar.notify({
          type: 'negative',
          message: `${i18n.t('FAILED_TO_DELETE_COMMENT')}`,
        })
        console.log('failed to delete comment ');
      } finally {
        loadingComments.value = false;
      }
    }

    return {
      createComment,
      deleteComment,

      picture,
      isLoading,
      loadingComments,
      commentToCreate,
      comments,
      displayPage,
      formatDate,
    }
  }
})
</script>

<style lang="scss" scoped>
.v-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.v-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.v-leave-active {
  transition: all 5s ease-out;
}

.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.page {
  padding: 1rem;
}

.container {
  display: flex;
  flex-direction: column;

  @include screen-sm {
    flex-direction: row;
    justify-content: center;
  }
}

.card--picture {
  height: 80vh;
  position: relative;

  @include screen-sm {
    width: 50%;
    max-width: 500px;
  }

  .image {
    width: 100%;
    max-width: 100%;
    height: 100%;

    @media (min-width: $screen-xs) {
      width: 900px;
    }
  }

  // padding: 0.6rem 0.6rem 5rem;
  .image__label {
    background: $primary;
    transform: rotate(-12deg);
    position: absolute;
    bottom: 30px;
    right: 20px;
    text-align: center;
    font-family: $fontCaveat;
    color: $info;
    box-shadow: 8px 11px 10px rgba(0, 0, 0, 0.2);
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem;
  }
}

.card--comment {
  .no-comment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 500px;
    padding: 1rem 1rem 5rem;
    ;
    color: $info;
  }

  position: relative;

  @include screen-sm {
    height: 80vh;
    width: 50%;
    max-width: 500px;
    padding: 0 1rem;
  }

  .comment__container {
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

    &__comment {
      width: 100%;
    }
  }
}
</style>
