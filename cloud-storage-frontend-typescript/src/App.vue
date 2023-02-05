<template>
  <v-app>
    <v-main>
      <component :is="layout + '-layout'"></component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import MainLayout from "@/layouts/main-layout.vue";
import AuthLayout from "@/layouts/auth-layout.vue";
import {useRoute} from "vue-router";
import {computed, defineComponent} from 'vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  },
  components: {
    AuthLayout,
    MainLayout
  }
})
</script>
