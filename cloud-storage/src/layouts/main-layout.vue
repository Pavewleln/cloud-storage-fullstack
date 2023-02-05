<template>
  <AppHeader>
    <v-main style="height: 100vh" class="overflow-auto">
      <router-view></router-view>
    </v-main>
  </AppHeader>
</template>

<script lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {AppHeader}
})
</script>