<template>
  <div class="import">
    <label for="import">
      <p class="text-white">Загрузить файл</p>
    </label>
    <input class="d-none" id="import" multiple @change="(e) => fileUploadHandler(e)" type="file"/>
  </div>
  <v-container class="ma-auto pa-10 overflow-x-auto">
    <v-icon class="mb-5" @click="backClickHandler" v-if="currentDir" dark left>mdi-arrow-left</v-icon>
    <AppLoader v-if="loading"/>
    <h2 class="text-center" v-else-if="!files">У вас нет папок</h2>
    <HomeTable @createDirHandler="createDirHandler" v-else :desserts="files" @openDirHandler="openDirHandler"/>
  </v-container>
  <v-row>
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
import AppLoader from "@/components/AppLoader";
import {mapState} from 'vuex'

export default {
  components: {AppLoader, PopupCreateDir, HomeTable},
  data() {
    return {
      dirname: '',
      dialog: false,
      loading: false
    }
  },
  async mounted() {
    try {
      this.loading = true
      await this.$store.dispatch('files/get')
      this.loading = false
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapState('files', ["files"]),
    ...mapState('files', ["currentDir"]),
  },
  watch: {
    async currentDir(value) {
      try {
        this.loading = true
        await this.$store.dispatch('files/get', value)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    openDirHandler(file) {
      if (file.type === 'dir') {
        this.$store.commit("files/setCurrentDir", file._id)
        this.$store.commit("files/folderNext", file._id)
      }
    },
    backClickHandler() {
      this.$store.commit("files/folderPrev")
    },
    fileUploadHandler(event) {
      const files = [...event.target.files]
      files.forEach(file => {
        const payload = {
          file,
          dirId: this.currentDir
        }
        this.$store.dispatch("files/uploadFile", payload)
      })
    },
    createDirHandler() {
      this.dialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.import {
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: orange;
  padding: 10px;
}
</style>