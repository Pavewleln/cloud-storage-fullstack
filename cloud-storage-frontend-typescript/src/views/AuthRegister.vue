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

<script lang="ts">
import { defineComponent } from 'vue';

export type Register = {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}
export default defineComponent({
  data: () => ({
    // валидна или нет
    valid: true,
    // Имя
    firstname: '',
    // Фамилия
    lastname: '',
    // скрытие пароля
    show1: false,
    // пароль
    password: '',
    // Валидация пароля
    passwordRules: {
      required: (value: string) => !!value || 'Пароль не валидно',
      min: (v: string) => v.length >= 8 || 'Минимум 8 символов',
    },
    // Валидация имени
    nameRules: [
      (v: string) => !!v || 'Название не валидно',
      (v: string) => (v && v.length <= 10) || 'Имя должно содержать не более 10 символов',
    ],
    // почта
    email: '',
    // валидация почты
    emailRules: [
      (v: string) => !!v || 'Почта не валидна',
      (v: string) => /.+@.+\..+/.test(v) || 'Почта не валидна',
    ]
  }),

  methods: {
    // регистрация
    async validate() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) alert('Форма не валидна')
      // Данные о человеке
      const payload: Register = {
        firstname:this.firstname,
        lastname:this.lastname,
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('auth/registration', payload)
        this.$refs.form.reset()
        this.$router.push("/")
      } catch (err) {
        console.log(err)
      }
    }
  }
})
</script>

<style scoped>

</style>