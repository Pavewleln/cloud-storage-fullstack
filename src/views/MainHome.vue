<template>
  <AppButtonImport :currentDir="currentDir"/>
  <div class="d-flex justify-end ma-5">
    <v-btn v-if="table === 'grid'" @click="updateTable('spreadsheet')" class="ma-3">табличный</v-btn>
    <v-btn v-if="table === 'spreadsheet'" @click="updateTable('grid')" class="ma-3">сетчатый</v-btn>
  </div>
  <AppDisk :current-dir="currentDir" :loading="loading" :table="table"/>
</template>

<script>

import {mapState} from 'vuex'
import AppButtonImport from "@/components/AppButtonImport";
import AppDisk from "@/components/files/AppDisk";

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