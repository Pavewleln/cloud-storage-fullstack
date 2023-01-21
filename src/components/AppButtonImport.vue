<template>
  <div class="import d-flex flex-column">
    <div>
      <label for="import">
        <p class="text-white">Загрузить файл</p>
      </label>
      <input class="d-none" id="import" multiple @change="(e) => fileUploadHandler(e)" type="file"/>
    </div>
      <v-progress-linear
          class="mt-2"
          v-if="progressFileUpload > 0"
          v-model="progressFileUpload"
          color="black"
          height="4"
      ></v-progress-linear>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  props: ['currentDir'],
  data () {
    return {
      value: 78
    }
  },
  methods: {
    fileUploadHandler(event) {
      const files = [...event.target.files]
      files.forEach(file => {
        const payload = {
          file,
          dirId: this.currentDir
        }
        this.$store.dispatch("files/uploadFile", payload)
      })
    }
  },
  computed: {
    ...mapState("files", ["progressFileUpload"])
  },
  watch: {
    progressFileUpload(value) {
      if (value === 100) {
        setTimeout(() => {
          this.$store.commit("files/removeChangeUploadFile")
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>

</style>