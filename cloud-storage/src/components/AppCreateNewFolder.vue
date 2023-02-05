<template>
  <!--  создать папку-->
  <div class="ma-5 createNewFolder size" v-if="table === 'grid'">
    <v-icon class="mt-5" size="75" color="#CFD8DC" @click="$emit('createDirHandler')">
      mdi-plus-circle
    </v-icon>
    <v-card-text>Создать папку</v-card-text>
  </div>
  <!--  создать папку-->
  <div v-if="table === 'spreadsheet'" class="d-flex align-center createNewFolder" @click="$emit('createDirHandler')">
    <v-icon class="ma-1" color="#CFD8DC">
      mdi-plus-circle
    </v-icon>
    <span>Создать папку</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  // создать папку
  emits: ['createDirHandler'],
  // вид таблицы
  props: ['table']
})
</script>

<style scoped>

</style>