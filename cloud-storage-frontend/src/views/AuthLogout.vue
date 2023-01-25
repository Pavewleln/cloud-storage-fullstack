<template>
  <v-container>
    Выход из системы...
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("auth/logout")
    this.$router.push("/login")
  }
}
</script>

<style scoped>

</style>