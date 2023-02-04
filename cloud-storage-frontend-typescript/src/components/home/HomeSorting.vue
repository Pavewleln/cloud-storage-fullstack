<template>
  <!--    сортировка-->
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

<script lang="ts">
import {useDisplay} from "vuetify";
import {computed} from "vue";
import {defineComponent} from "vue";
// тип данных отправляемых на сервер для сортировки
export type Get = {
  dirId: string,
  sort: string | null
}
export default defineComponent({
  // директория папки
  props: ['currentDir'],
  data(){
    return {
      // лоадер
      loading: false,
      // название деволтное
      item: 'Сортировка',
      // options
      items: [
        {name: 'По имени', type: 'name'},
        {name: 'По типу', type: 'type'},
        {name: 'По дате', type: 'date'}
      ]
    }
  },
  watch: {
    // Изменение название приведет к запросу по новому запросу
    async item(value) {
      try {
        // отправляемый файл
        const payload: Get = {
          // директория
          dirId: this.currentDir,
          // тип сортировки
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
    // Для адаптивной верстки
    const {name} = useDisplay()
    // Изменяет ширину при маленьком экране
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
})
</script>

<style scoped>

</style>