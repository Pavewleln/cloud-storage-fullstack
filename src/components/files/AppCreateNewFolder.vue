<template>
  <div class="ma-2 createNewFolder">
    <v-icon class="mt-5" size="75" color="#CFD8DC" @click="$emit('createDirHandler')">
      mdi-plus-circle
    </v-icon>
    <v-card-text>Создать папку</v-card-text>
  </div>
</template>

<script>
export default {
  emits: ['createDirHandler']
}
</script>

<style scoped>

</style>