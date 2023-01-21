<template>
  <v-row>
    <v-dialog
        persistent
        model-value
        max-width="290"
    >
      <v-card v-if="popup === 'create'" class="pa-2 text-center">
        <v-icon @click="$emit('close')">mdi-close</v-icon>
        <v-card-title class="text-h5">
          Название папки
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
      <v-card v-if="popup === 'update'" class="pa-2 text-center">
        <v-icon @click="$emit('close')">mdi-close</v-icon>
        <v-card-title class="text-h5">
          Название папки
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

<script>
export default {
  props: ['currentDir', 'popup', 'id'],
  emits: ['close'],
  data() {
    return {
      valid: true,
      dirname: '',
      filename: '',
      dirnameRules: [
        v => !!v || 'Название некорректно',
        v => (v && v.length <= 15) || 'Название не должно содержать больше 15 символов',
      ]
    }
  },
  methods: {
    async createDir() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) alert('Форма не валидна')
      const payload = {
        name: this.dirname,
        dirId: this.currentDir
      }
      try {
        this.$store.dispatch("files/createDir", payload)
        this.$refs.form.reset()
        this.$emit('close')
      } catch (err) {
        console.log(err)
      }
    },
    async updateNameFile() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) alert('Форма не валидна')
      const payload = {
        id: this.id,
        name: this.filename
      }
      try {
        this.$store.dispatch("files/updateNameFile", payload)
        this.$refs.form.reset()
        this.$emit('close')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>