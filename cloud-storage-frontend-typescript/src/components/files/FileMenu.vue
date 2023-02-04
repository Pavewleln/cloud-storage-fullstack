<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props">mdi-dots-vertical</v-icon>
    </template>
    <v-list>
<!--      Загрузить-->
      <div v-if="item.type !== 'dir'" @click="downloadFile(item)" class="ma-1 file">
        <v-icon class="ma-1">mdi-cloud-upload</v-icon>
        <span class="ma-1">Загрузить</span>
      </div>
<!--      Удалить-->
      <div @click="deleteFile(item)" class="ma-1 file">
        <v-icon class="ma-1">mdi-delete</v-icon>
        <span class="ma-1">Удалить</span>
      </div>
<!--      Изменить-->
      <button @click="$emit('updateDirHandler', item)" class="ma-1 file">
        <v-icon class="ma-1">mdi-pencil</v-icon>
        <span class="ma-1">Изменить</span>
      </button>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  // изменить название файла
  emits: ['updateDirHandler'],
  // идентификатор элемента
  props: ['item'],
  methods: {
    // загрузить файл
    async downloadFile(file: any) {
      await this.$store.dispatch("files/downloadFile", file)
    },
    // удалить файл
    async deleteFile(file: any) {
      await this.$store.dispatch("files/deleteFile", file._id)
    }
  }
})
</script>

<style scoped>

</style>