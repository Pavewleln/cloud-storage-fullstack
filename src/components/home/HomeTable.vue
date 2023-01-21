<template>
  <!--  Сортировка-->
  <v-col :cols=cols>
    <v-select
        v-model="item"
        :items="items"
        item-title="name"
        item-value="type"
        persistent-hint
        return-object
        single-line
    ></v-select>
  </v-col>
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
<script>
import AppCreateNewFolder from "@/components/files/AppCreateNewFolder";
import GridFile from "@/components/files/grid/GridTable";
import PopupCreateDir from "@/components/popups/PopupCreateDir";
import SpreadsheetTable from "@/components/files/spreadsheet/SpreadsheetTable";
import {useDisplay} from "vuetify";
import {computed} from "vue";

export default {
  components: {SpreadsheetTable, PopupCreateDir, GridFile, AppCreateNewFolder},
  props: ['desserts', 'table', 'currentDir'],
  data() {
    return {
      dialog: false,
      item: 'Сортировка',
      items: [
        {name: 'По имени', type: 'name'},
        {name: 'По типу', type: 'type'},
        {name: 'По дате', type: 'date'}
      ]
    }
  },
  methods: {
    createDirHandler() {
      this.dialog = true
    },
    openDirHandler(file) {
      if (file.type === 'dir') {
        this.$store.commit("files/setCurrentDir", file._id)
        this.$store.commit("files/folderNext", file._id)
        this.$store.commit("files/pushArrayNamesDir", file.name)
      }
    }
  },
  watch: {
    async item (value) {
      try {
        const payload = {
          dirId: this.currentDir,
          sort: value.type
        }
        await this.$store.dispatch('files/get', payload)
      } catch (err) {
        console.log(err)
      }
    }
  },
  setup () {
    const { name } = useDisplay()

    const cols = computed(() => {
      switch (name.value) {
        case 'xs': return 12
        case 'sm': return 6
        case 'md': return 3
        case 'lg': return 3
        case 'xl': return 3
        case 'xxl': return 3
      }

      return undefined
    })

    return { cols }
  }
}
</script>

<style lang="scss">
.size {
  width: 130px;
  height: auto;
}
</style>