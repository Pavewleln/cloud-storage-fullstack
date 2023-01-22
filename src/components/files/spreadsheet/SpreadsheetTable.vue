<template>
  <div class="ml-3">
    <AppCreateNewFolder :table="table" @createDirHandler="$emit('createDirHandler')"/>
  </div>
  <v-table class="table-media">
    <thead>
    <tr>
      <th class="text-left">
        Название
      </th>
      <th class="text-left">
        Размер
      </th>
      <th class="text-left">
        Дата
      </th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in desserts"
        :key="item._id"
    >
      <td class="file d-flex align-center justify-start" @click="$emit('openDirHandler', item)">
        <v-icon v-if="item.type === 'dir'" color="#CFD8DC" class="ma-1" @click="$emit('openDirHandler', item)">
          {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
        </v-icon>
        <v-icon v-else class="ma-1" color="#CFD8DC">
          {{ item.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
        </v-icon>
        {{ item.name }}
      </td>
      <td>{{ sizeFormat(item.size) }}</td>
      <td>{{ item.date.slice(0, 10) }}</td>
      <td>
        <FileMenu :item="item" @updateDirHandler="updateDirHandler"/>
      </td>
    </tr>
    </tbody>
  </v-table>
  <PopupCreateDir v-if="dialog" :popup="'update'" @close="dialog = false" :id="itemId" :fileName="itemName"/>
</template>

<script>
import AppCreateNewFolder from "@/components/AppCreateNewFolder";
import PopupCreateDir from "@/components/popups/PopupCreateDir";
import FileMenu from "@/components/files/FileMenu";
import {sizeFormat} from "@/utils/sizeFormat";

export default {
  components: {FileMenu, PopupCreateDir, AppCreateNewFolder},
  props: ['desserts', 'table'],
  emits: ['openDirHandler', 'createDirHandler'],
  data() {
    return {
      dialog: false,
      itemId: '',
      itemName: ''
    }
  },
  methods: {
    updateDirHandler(item) {
      this.itemId = item._id
      this.dialog = true
      this.itemName = item.name
    }
  },
  setup(){
    return {
      sizeFormat
    }
  }
}
</script>

<style scoped lang="scss">
.table-media {
  @media(max-width: 469px) {
    font-size: 12px;
  }
  @media(max-width: 390px) {
    font-size: 10px;
  }

}
</style>