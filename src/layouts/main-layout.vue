<template>
  <AppHeader>
    <v-main style="height: 100vh" class="overflow-auto">
      <router-view></router-view>
    </v-main>
  </AppHeader>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {AppHeader}
}
</script>