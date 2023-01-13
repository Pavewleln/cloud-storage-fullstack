<template>
  <v-btn class="ma-2" @click="backClickHandler">Назад</v-btn>
  <v-btn class="ma-2" @click="createDir">Создать папку</v-btn>
  <input placeholder="Название" v-model="dirname"/>
  <v-container>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Название
        </th>
        <th class="text-left">
          Размер
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in desserts"
          :key="item._id"
          class="file"
          @click="item.type === 'dir' ? openDirHandler(item._id) : ''"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.size }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      dirname: '',
      desserts: [],
      currentDir: null
    }
  },
  async mounted() {
    this.desserts = await this.$store.dispatch('files/get')
  },
  computed() {
    this.desserts = this.$store.getters["files/files"]
  },
  watch: {
    async currentDir(value) {
      this.desserts = await this.$store.dispatch('files/get', value)
    }
  },
  methods: {
    createDir() {
      const payload = {
        name: this.dirname,
        dirId: this.currentDir
      }
      this.$store.dispatch("files/createDir", payload)
    },
    openDirHandler(dirId) {
      this.$store.commit("files/setCurrentDir", dirId)
      this.$store.commit("files/folderNext", dirId)
      this.currentDir = dirId

    },
    backClickHandler() {
      this.currentDir = this.$store.commit("files/folderPrev")
    }
  }
}
</script>

<style scoped lang="scss">
.file {
  cursor: pointer;
  &:hover {
    background: #fcf6e0;
  }
}
</style>