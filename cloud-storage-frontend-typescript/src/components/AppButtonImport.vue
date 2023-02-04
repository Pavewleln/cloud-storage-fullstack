<template>
<!--  кнопка загрузки файла-->
  <div class="import d-flex flex-column">
    <div>
<!--      загрузить файл-->
      <label for="import">
        <p class="text-white">Загрузить файл</p>
      </label>
      <input class="d-none" id="import" multiple @change="(e) => fileUploadHandler(e)" type="file"/>
    </div>
<!--    прогресс загрузки-->
      <v-progress-linear
          class="mt-2"
          v-if="progressFileUpload > 0"
          v-model="progressFileUpload"
          color="black"
          height="4"
      ></v-progress-linear>
  </div>
</template>
<script lang="ts">
import {mapState} from "vuex";
import {defineComponent} from "vue";
// тип файла
export type FileImport = {
  file: any,
  dirId: string
}

export default defineComponent({
  // ссылка на папку
  props: ['currentDir'],
  data () {
    return {
      // прогресс загрузки файла
      value: 0
    }
  },
  methods: {
    // загрузить файл
    fileUploadHandler(event: any) {
      const files = [...event.target.files]
      files.forEach(file => {
        // данные файла
        const payload: FileImport = {
          file,
          dirId: this.currentDir
        }
        // отправка файла на сервер
        this.$store.dispatch("files/uploadFile", payload)
      })
    }
  },
  computed: {
    // прогресс загрузки
    ...mapState("files", ["progressFileUpload"])
  },
  watch: {
    // отображение прогресса при изменении процента
    progressFileUpload(value) {
      if (value === 100) {
        // очистка прогресса при окончании загрузки через 3 секунды после загрузки
        setTimeout(() => {
          this.$store.commit("files/removeChangeUploadFile")
        }, 3000)
      }
    }
  }
})
</script>

<style scoped>

</style>