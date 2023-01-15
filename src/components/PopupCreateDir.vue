<template>
  <v-card class="pa-2 text-center">
      <v-icon @click="close">mdi-close</v-icon>
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
</template>

<script>
export default {
  props: ['currentDir'],
  emits: ['close'],
  data(){
    return {
      valid: true,
      dirname: '',
      dirnameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async createDir() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) alert('Form is not valid')
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
    }
  }
}
</script>

<style scoped>

</style>