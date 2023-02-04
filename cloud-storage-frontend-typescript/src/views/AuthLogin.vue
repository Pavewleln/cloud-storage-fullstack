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
            type="submit"
        >
          Войти
        </v-btn>
      </v-form>
      <v-banner-text class="mt-5">Еще нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </v-banner-text>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// тип нужных параметров
export type Login = {
  email: string,
  password: string
}
export default defineComponent({
  data: () => ({
    // валидно или нет
    valid: true,
    // скрытие пароля
    show1: false,
    // пароль
    password: '',
    // валидация пароля
    passwordRules: {
      required: (value: string) => !!value || 'Пароль невалиден',
      min: (v: string) => v.length >= 8 || 'Минимум 8 символов',
    },
    // почта
    email: '',
    // валидация почты
    emailRules: [
      (v: string) => !!v || 'Почта не валидна',
      (v: string) => /.+@.+\..+/.test(v) || 'Почта не валидна',
    ]
  }),

  methods: {
    // Вход в систему
    async validate() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) alert('Форма не валидна')
      const payload: Login = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('auth/login', payload)
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