<template>
  <v-container>
    Выход из системы...
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'AuthLogout',
  // выход из системы
  mounted() {
    this.$store.commit("auth/logout")
    this.$router.push("/login")
  }
})
</script>

<style scoped>

</style>