<template>
  <v-icon v-if="item.type === 'dir'" size="100" color="#CFD8DC" @click="$emit('openDirHandler', item)">
    {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
  </v-icon>
  <v-icon v-else class="file" size="100" color="#CFD8DC">
    {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
  </v-icon>
  <v-card-text class="d-flex align-center">{{ maxLengthName }}
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-icon v-if="item.type !== 'dir'" @click="downloadFile(item)" class="ma-1">mdi-cloud-upload</v-icon>
        <v-icon @click="deleteFile(item)" class="ma-1">mdi-delete</v-icon>
      </v-list>
    </v-menu>
  </v-card-text>
</template>

<script>
export default {
  emits: ['openDirHandler'],
  props: ['item'],
  data() {
    return {
      items: [
        {title: 'Click Me'},
        {title: 'Click Me'},
        {title: 'Click Me'},
        {title: 'Click Me 2'},
      ]
    }
  },
  methods: {
    async downloadFile(file) {
      await this.$store.dispatch("files/downloadFile", file)
    },
    async deleteFile(file) {
      await this.$store.dispatch("files/deleteFile", file._id)
    }
  },
  computed: {
    maxLengthName() {
      const maxLengthName = 5
      const name = this.item.name
      return name.length > maxLengthName ? name.slice(0, maxLengthName) + '...' : name
    }
  }
}
</script>

<style scoped>

</style>