<template>
  <!--  Загрузка файлов-->
  <AppButtonImport :currentDir="currentDir"/>
  <!--  Вид файлов-->
  <div class="d-flex justify-end mt-2">
    <v-btn v-if="table === 'grid'" @click="updateTable('spreadsheet')" class="ma-3"><img :src="grid"></v-btn>
    <v-btn v-if="table === 'spreadsheet'" @click="updateTable('grid')" class="ma-3"><img :src="spreadsheet"></v-btn>
  </div>
  <!--  Файлы-->
  <AppDisk :current-dir="currentDir" :loading="loading" :table="table"/>
</template>

<script>

import {mapState} from 'vuex'
import AppButtonImport from "@/components/AppButtonImport";
import AppDisk from "@/components/AppDisk";
import grid from "@/assets/Grid.svg"
import spreadsheet from "@/assets/Spreadsheet.svg"

export default {
  components: {AppDisk, AppButtonImport},
  data() {
    return {
      dirname: '',
      loading: false,
      table: window.localStorage.getItem('table') ?? 'grid'
    }
  },
  async mounted() {
    try {
      const payload = {
        dirId: null,
        sort: null
      }
      this.loading = true
      await this.$store.dispatch('files/get', payload)
      this.loading = false
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    updateTable(variable) {
      this.table = variable
      window.localStorage.setItem('table', variable)
    }
  },
  computed: {
    ...mapState('files', ["currentDir"])
  },
  watch: {
    async currentDir(value) {
      try {
        const payload = {
          dirId: value,
          sort: null
        }
        this.loading = true
        await this.$store.dispatch('files/get', payload)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  setup(){
    return {
      grid,
      spreadsheet
    }
  }
}
</script>

<style scoped lang="scss">
.import {
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: orange;
  padding: 15px;
  z-index: 1000;
}
</style>