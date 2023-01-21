<template>
  <v-container>
    <!--    Breadcrumbs-->
    <div>
      <v-breadcrumbs :items="arrayNamesDir"></v-breadcrumbs>
    </div>
    <!--    Кнопка выхода на один уровень ниже-->
    <v-icon class="mb-5" @click="backClickHandler" v-if="currentDir" dark left>mdi-arrow-left</v-icon>
    <!--    loading-->
    <AppLoader v-if="loading"/>
    <!--    Файлы-->
    <HomeTable
        v-else
        :table="table"
        :desserts="files"
        :currentDir="currentDir"/>
  </v-container>
</template>

<script>
import AppLoader from "@/components/AppLoader";
import HomeTable from "@/components/home/HomeTable";
import {mapState} from "vuex";

export default {
  components: {HomeTable, AppLoader},
  props: ['loading', 'table', 'currentDir'],
  computed: {
    ...mapState('files', ["files"]),
    ...mapState("files", ["arrayNamesDir"])
  },
  methods: {
    backClickHandler() {
      this.$store.commit("files/folderPrev")
      this.$store.commit("files/prevArrayNamesDir")
    },
  }
}
</script>

<style lang="scss">
.file, .createNewFolder {
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.6;
  }
}
</style>