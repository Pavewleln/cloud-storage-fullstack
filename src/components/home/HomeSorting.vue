<template>
  <v-col :cols=cols>
    <v-row>
      <v-select
          variant="underlined"
          v-model="item"
          :items="items"
          item-title="name"
          item-value="type"
          persistent-hint
          return-object
          single-line
      ></v-select>
      <v-progress-circular
          class="ma-3"
          v-if="loading"
          indeterminate
          color="amber"
      ></v-progress-circular>
    </v-row>
  </v-col>
</template>

<script>
import {useDisplay} from "vuetify";
import {computed} from "vue";

export default {
  data(){
    return {
      loading: false,
      item: 'Сортировка',
      items: [
        {name: 'По имени', type: 'name'},
        {name: 'По типу', type: 'type'},
        {name: 'По дате', type: 'date'}
      ]
    }
  },
  watch: {
    async item(value) {
      try {
        const payload = {
          dirId: this.currentDir,
          sort: value.type
        }
        this.loading = true
        await this.$store.dispatch('files/get', payload)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  setup() {
    const {name} = useDisplay()
    const cols = computed(() => {
      switch (name.value) {
        case 'xs':
          return 12
        case 'sm':
          return 6
        case 'md':
          return 3
        case 'lg':
          return 3
        case 'xl':
          return 3
        case 'xxl':
          return 3
      }

      return undefined
    })
    return {cols}
  }
}
</script>

<style scoped>

</style>