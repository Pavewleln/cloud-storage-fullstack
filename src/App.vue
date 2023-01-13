<template>
  <v-app>
    <v-main>
      <component :is="layout + '-layout'"></component>
    </v-main>
  </v-app>
</template>
<script>

import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import {useRoute} from "vue-router/dist/vue-router";
import {computed} from "vue";

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  },
  components: {
    MainLayout,
    AuthLayout
  }
}
</script>
