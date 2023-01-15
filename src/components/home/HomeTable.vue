<template>
  <v-row class="text-center">
    <AppCreateNewFolder @createDirHandler="$emit('createDirHandler')"/>
    <div v-for="item in desserts" :key="item._id" class="ma-2 file">
      <AppFile :item="item" @openDirHandler="$emit('openDirHandler', item)"/>
    </div>
  </v-row>
</template>

<script>
import AppCreateNewFolder from "@/components/files/AppCreateNewFolder";
import AppFile from "@/components/files/AppFile";
export default {
  components: {AppFile, AppCreateNewFolder},
  props: ['desserts'],
  emits: ['openDirHandler', 'createDirHandler']
}
</script>

<style scoped lang="scss">
.file, .createNewFolder {
  transition: all 0.2s ease;
  width: 100px;

  &:hover {
    opacity: 0.6;
  }
}
</style>