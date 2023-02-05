<template>
  <v-row>
    <v-dialog
        persistent
        model-value
        max-width="290"
    >
<!--      Создать папку-->
      <v-card v-if="popup === 'create'" class="pa-2 text-center">
        <v-icon @click="$emit('close')">mdi-close</v-icon>
        <v-card-title class="text-h5">
          Создать
        </v-card-title>
        <v-card-text>
          <v-form
              @submit.prevent="createDir"
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="dirname"
                :rules="dirnameRules"
                label="Название"
                clearable
                required
            ></v-text-field>
            <v-btn
                :disabled="!valid"
                color="green darken-1"
                text
                type="submit"
            >
              Создать
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
<!--      Изменить название-->
      <v-card v-else class="pa-2 text-center">
        <v-icon @click="$emit('close')">mdi-close</v-icon>
        <v-card-title class="text-h5">
          Изменить
        </v-card-title>
        <v-card-text>
          <v-form
              @submit.prevent="updateNameFile"
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="filename"
                :rules="dirnameRules"
                label="Название"
                clearable
                required
            ></v-text-field>
            <v-btn
                :disabled="!valid"
                color="green darken-1"
                text
                type="submit"
            >
              Изменить
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {defineComponent} from "vue";
// тип папки
export type updateDir = {
  id: string,
  name: string
}
export type createDir = {
  name: string
  dirId: string
}

export default defineComponent({
  props: ['currentDir', 'popup', 'id', 'fileName'],
  emits: ['close'],
  data() {
    return {
      // валидно ил нет
      valid: true,
      // имя папки
      dirname: '',
      // расширение файла
      filenameExtension: this.fileName ? this.fileName.split('.').pop(0, -1) : '',
      // имя файла
      filename: this.filename ? this.fileName.split('.').slice(0, -1).join('.') : '',
      // корректность файла
      dirnameRules: [
        (v: string) => !!v || 'Название некорректно',
        (v: string) => (v && v.length <= 15) || 'Название не должно содержать больше 15 символов',
      ]
    }
  },
  methods: {
    // создать папку
    async createDir(): Promise<any> {
      const {valid} = await (this.$refs['form'] as any).validate()
      if (!valid) alert('Форма не валидна')
      const payload: createDir = {
        name: this.dirname,
        dirId: this.currentDir
      }
      try {
        await this.$store.dispatch("files/createDir", payload)
        await (this.$refs['form'] as any).reset()
        this.$emit('close')
      } catch (err) {
        console.log(err)
      }
    },
    // изменить название папки
    async updateNameFile(): Promise<any> {
      const {valid} = await (this.$refs['form'] as any).validate()
      if (!valid) alert('Форма не валидна')
      const payload: updateDir = {
        id: this.id,
        name: this.filename + "." + this.filenameExtension
      }
      try {
        await this.$store.dispatch("files/updateNameFile", payload)
        await (this.$refs['form'] as any).reset()
        this.$emit('close')
      } catch (err) {
        console.log(err)
      }
    }
  }
})
</script>

<style scoped>

</style>