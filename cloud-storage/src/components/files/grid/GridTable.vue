<template>
  <div>
    <!--    Иконки элемента(Файл или папка)-->
    <v-icon v-if="item.type === 'dir'" size="100" color="#CFD8DC" @click="$emit('openDirHandler', item)">
      {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
    </v-icon>
    <v-icon v-else class="file" size="100" color="#CFD8DC">
      {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
    </v-icon>
<!--    Действия над элементом-->
    <v-card-text class="d-flex align-center justify-center">{{ maxLengthName }}
      <FileMenu :item="item" @updateDirHandler="updateDirHandler"/>
    </v-card-text>
    <!--    Создать папку-->
    <PopupCreateDir v-if="dialog" :popup="'update'" @close="dialog = false" :id="item._id" :fileName="item.name"/>
    <!--    Тоолтип показывающий данные о папке-->
    <v-tooltip
        activator="parent"
        location="top"
    >
      <div>"{{ item.name }}"</div>
      <div>Дата: {{ item.date.slice(0, 10) }}</div>
      <div>Размер: {{ sizeFormat(item.size) }}</div>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import PopupCreateDir from "@/components/popups/PopupCreateDir.vue";
import FileMenu from "@/components/files/FileMenu.vue";
import {sizeFormat} from "@/utils/sizeFormat";
import {defineComponent} from "vue";

export default defineComponent({
  components: {FileMenu, PopupCreateDir},
  emits: ['openDirHandler'],
  props: ['item'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    updateDirHandler(): void {
      this.dialog = true
    }
  },
  computed: {
    maxLengthName(): string {
      const maxLengthName = 7
      const name = this.item.name
      if (this.item.name) {
        return name.length > maxLengthName ? name.slice(0, maxLengthName) + '...' : name
      } else {
        return 'error'
      }
    }
  },
  setup() {
    return {
      sizeFormat
    }
  }
})
</script>

<style lang="scss">
</style>