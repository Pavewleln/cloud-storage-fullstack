<template>
  <v-btn class="ma-2" @click="backClickHandler" v-if="currentDir">Назад</v-btn>
  <v-btn class="ma-2" @click="dialog = true">Создать папку</v-btn>
  <HomeTable :desserts="desserts" @openDirHandler="openDirHandler"/>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <PopupCreateDir @close="dialog = false" :currentDir="currentDir"/>
    </v-dialog>
  </v-row>
</template>

<script>

import HomeTable from "@/components/home/HomeTable";
import PopupCreateDir from "@/components/PopupCreateDir";

export default {
  components: {PopupCreateDir, HomeTable},
  data() {
    return {
      dirname: '',
      desserts: [],
      currentDir: null,
      dialog: false
    }
  },
  async mounted() {
    this.desserts = await this.$store.dispatch('files/get')
  },
  computed() {
    this.desserts = this.$store.getters["files/files"]
    this.currentDir = this.$store.getters["files/currentDir"]
  },
  watch: {
    async currentDir(value) {
      this.desserts = await this.$store.dispatch('files/get', value)
    }
  },
  methods: {
    openDirHandler(dirId) {
      this.$store.commit("files/setCurrentDir", dirId)
      this.$store.commit("files/folderNext", dirId)
      this.currentDir = dirId
    },
    backClickHandler() {
      this.$store.commit("files/folderPrev")
      this.currentDir = this.$store.getters["files/currentDir"]
    }
  }
}
</script>

<style scoped lang="scss">
</style>