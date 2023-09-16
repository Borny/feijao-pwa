<template>
  <q-card class="my-card">
    <q-img :src="`./src/assets/pictures/${picture.url}`">
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ picture.title }}
      </div>
    </q-img>
  </q-card>
</template>

<script>
import { onMounted, ref, defineComponent } from 'vue'
import { useHomeStore } from "../stores/home/home";
import { useAppStore } from "../stores/app/app";

export default defineComponent({
  name: 'PictureDetailComponent',

  props: {
    picture: {
      type: Object,
      required: true
    },
  },

  setup() {
    const appStore = useAppStore();
    const homeStore = useHomeStore();

    function init() {
      appStore.$patch({ appTitle: "Picture detail" });
    }

    onMounted(async () => {
      init();
    });

    return {
    }
  },
})
</script>
