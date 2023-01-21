<template>
  <div>
    <v-icon v-if="item.type === 'dir'" size="100" color="#CFD8DC" @click="$emit('openDirHandler', item)">
      {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
    </v-icon>
    <v-icon v-else class="file" size="100" color="#CFD8DC">
      {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
    </v-icon>
    <v-card-text class="d-flex align-center justify-center">{{ maxLengthName }}
      <FileMenu :item="item" @updateDirHandler="updateDirHandler"/>
    </v-card-text>
    <PopupCreateDir v-if="dialog" :popup="'update'" @close="dialog = false" :id="item._id"/>
    <v-tooltip
        activator="parent"
        location="top"
    >
      <div>"{{item.name}}"</div>
      <div>Дата: {{item.date.slice(0, 10)}}</div>
      <div>Размер: {{sizeFormat(item.size)}}</div>
    </v-tooltip>
  </div>
</template>

<script>
import PopupCreateDir from "@/components/popups/PopupCreateDir";
import FileMenu from "@/components/files/FileMenu";
import {sizeFormat} from "@/utils/sizeFormat";

export default {
  components: {FileMenu, PopupCreateDir},
  emits: ['openDirHandler'],
  props: ['item'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    updateDirHandler() {
      this.dialog = true
    }
  },
  computed: {
    maxLengthName() {
      const maxLengthName = 7
      const name = this.item.name
      if (this.item.name) {
        return name.length > maxLengthName ? name.slice(0, maxLengthName) + '...' : name
      } else {
        return 'error'
      }
    }
  },
  setup(){
    return {
      sizeFormat
    }
  }
}
</script>

<style lang="scss">
</style>