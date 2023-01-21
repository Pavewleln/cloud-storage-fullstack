<template>
  <div class="ma-5 createNewFolder size" v-if="table === 'grid'">
    <v-icon class="mt-5" size="75" color="#CFD8DC" @click="$emit('createDirHandler')">
      mdi-plus-circle
    </v-icon>
    <v-card-text>Создать папку</v-card-text>
  </div>
  <div v-if="table === 'spreadsheet'" class="d-flex align-center createNewFolder" @click="$emit('createDirHandler')">
    <v-icon class="ma-1" color="#CFD8DC">
      mdi-plus-circle
    </v-icon>
    <span>Создать папку</span>
  </div>
</template>

<script>
export default {
  emits: ['createDirHandler'],
  props: ['table']
}
</script>

<style scoped>

</style>