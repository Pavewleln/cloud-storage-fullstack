<template>
  <!--  Сортировка-->
  <HomeSorting :currentDir="currentDir"/>
  <!--  Сеточный вид-->
  <v-row class="text-center d-flex align-center justify-center" v-if="table === 'grid'">
    <AppCreateNewFolder :table="table" @createDirHandler="createDirHandler"/>
    <div v-for="item in desserts" :key="item._id" class="ma-2 file size">
      <GridFile :item="item" @openDirHandler="openDirHandler"/>
    </div>
  </v-row>
  <!--  Табличный вид-->
  <SpreadsheetTable
      v-if="table === 'spreadsheet'"
      :desserts="desserts"
      @openDirHandler="openDirHandler"
      @createDirHandler="createDirHandler"
      :table="table"
  />
  <!--  popup-->
  <PopupCreateDir v-if="dialog" :popup="'create'" @close="dialog = false" :currentDir="currentDir"/>
</template>
<script lang="ts">
import AppCreateNewFolder from "@/components/AppCreateNewFolder.vue";
import GridFile from "@/components/files/grid/GridTable.vue";
import PopupCreateDir from "@/components/popups/PopupCreateDir.vue";
import SpreadsheetTable from "@/components/files/spreadsheet/SpreadsheetTable.vue";
import HomeSorting from "@/components/home/HomeSorting.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {HomeSorting, SpreadsheetTable, PopupCreateDir, GridFile, AppCreateNewFolder},
  props: ['desserts', 'table', 'currentDir'],
  data() {
    return {
      // состоние попапа
      dialog: false
    }
  },
  methods: {
    // открыть попап создания папки
    createDirHandler(): void {
      this.dialog = true
    },
    // перейти в папку
    openDirHandler(file: any): void {
      if (file.type === 'dir') {
        this.$store.commit("files/setCurrentDir", file._id)
        this.$store.commit("files/folderNext", file._id)
        this.$store.commit("files/pushArrayNamesDir", file.name)
      }
    }
  }
})
</script>

<style lang="scss">
.size {
  width: 130px;
  height: auto;
}
</style>