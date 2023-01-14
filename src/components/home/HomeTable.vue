<template>
  <v-container>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Название
        </th>
        <th class="text-left">
          Размер
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in desserts"
          :key="item._id"
          class="file"
          @click="item.type === 'dir' ? $emit('openDirHandler', item._id) : ''"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.size }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  props: ['desserts'],
  emits: ['openDirHandler']
}
</script>

<style scoped lang="scss">
.file {
  cursor: pointer;

  &:hover {
    background: #fcf6e0;
  }

}
</style>