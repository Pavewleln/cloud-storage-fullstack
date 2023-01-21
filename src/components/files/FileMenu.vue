<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props">mdi-dots-vertical</v-icon>
    </template>
    <v-list>
      <div v-if="item.type !== 'dir'" @click="downloadFile(item)" class="ma-1 file">
        <v-icon class="ma-1">mdi-cloud-upload</v-icon>
        <span class="ma-1">Загрузить</span>
      </div>
      <div @click="deleteFile(item)" class="ma-1 file">
        <v-icon class="ma-1">mdi-delete</v-icon>
        <span class="ma-1">Удалить</span>
      </div>
      <button @click="$emit('updateDirHandler', item)" class="ma-1 file">
        <v-icon class="ma-1">mdi-pencil</v-icon>
        <span class="ma-1">Обновить</span>
      </button>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  components: {},
  emits: ['updateDirHandler'],
  props: ['item'],
  methods: {
    async downloadFile(file) {
      await this.$store.dispatch("files/downloadFile", file)
    },
    async deleteFile(file) {
      await this.$store.dispatch("files/deleteFile", file._id)
    }
  },
}
</script>

<style scoped>

</style>