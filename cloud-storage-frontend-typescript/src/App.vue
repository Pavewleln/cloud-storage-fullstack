<template>
  <v-app>
    <v-main>
<!--      Изменение фона в зависимости от страницы-->
      <component :is="layout + '-layout'"></component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useRoute} from "vue-router";
import MainLayout from "@/layouts/main-layout.vue";
import MainHome from "@/layouts/auth-layout.vue";

export default defineComponent({
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  },
  components: {
    MainHome,
    MainLayout
  }
})
</script>
