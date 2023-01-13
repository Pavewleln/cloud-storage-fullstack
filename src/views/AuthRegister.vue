<template>
  <v-container>
    <v-col
        class="ma-auto text-center"
        cols="12"
        md="4"
    >
      <v-form
          @submit.prevent="validate"
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="First name"
            clearable
            required
        ></v-text-field>
        <v-text-field
            v-model="lastname"
            :counter="10"
            :rules="nameRules"
            label="Last name"
            clearable
            required
        ></v-text-field>

        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            clearable
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
          Зарегистрироваться
        </v-btn>
      </v-form>
      <v-banner-text class="mt-5">Уже есть аккаунт? <router-link to="/login">Войти</router-link></v-banner-text>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    firstname: '',
    lastname: '',
    show1: false,
    show2: true,
    password: '',
    passwordRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
  }),

  methods: {
    async validate() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) alert('Form is not valid')
      const payload = {
        firstname:this.firstname,
        lastname:this.lastname,
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('auth/registration', payload)
        this.$router.push("/")
      } catch (err) {
        console.log(err)
      }

      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>