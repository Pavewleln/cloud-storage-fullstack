<template>
  <v-container>
    <v-row class="d-flex align-center mb-5">
      <!--    Кнопка выхода на один уровень ниже-->
      <v-icon @click="backClickHandler" v-if="currentDir" dark left>mdi-arrow-left</v-icon>
      <!--    Breadcrumbs-->
      <v-breadcrumbs :items="arrayNamesDir"></v-breadcrumbs>
    </v-row>
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

<script lang="ts">
import AppLoader from "@/components/AppLoader.vue";
import HomeTable from "@/components/home/HomeTable.vue";
import {mapState} from "vuex";
import {defineComponent} from "vue";

export default defineComponent({
  components: {HomeTable, AppLoader},
  // loading- состояние лоадера, table - вид таблицы, currentDir - ссылка на папку
  props: ['loading', 'table', 'currentDir'],
  computed: {
    // файлы
    ...mapState('files', ["files"]),
    // путь к файлам
    ...mapState("files", ["arrayNamesDir"])
  },
  methods: {
    // выйти из папки на уровень ниже
    backClickHandler(): void {
      this.$store.commit("files/folderPrev")
      this.$store.commit("files/prevArrayNamesDir")
    },
  }
})
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