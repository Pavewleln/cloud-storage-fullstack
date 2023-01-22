<template>
  <v-card>
    <v-layout>
      <v-app-bar
          color="orange"
          prominent
      >
        <!--        Navbar-->
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!--        Поиск-->
        <v-text-field variant="underlined" v-model="fileName" class="searchInput" placeholder="Поиск"/>
        <v-spacer></v-spacer>
        <!--        Профиль-->
        <p class="mr-5">{{ auth?.firstname }}</p>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar size="40" color="surface-variant" class="mr-5 avatar" v-bind="props"></v-avatar>
          </template>
          <!--          Меню профиля-->
          <v-list>
            <v-list-item
                v-for="(item, i) in avatarLinks"
                :key="i"
            >
              <router-link class="mt-5 text-decoration-none text text-subtitle-1 text-black" :to="item.to">
                {{ item.title }}
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary
      >
        <v-list class="d-flex flex-column align-center">
          <router-link class="mt-5 text-decoration-none text text-subtitle-1 text-black" v-for="item in links"
                       :to="item.to" :key="item.to">{{ item.title }}
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <slot></slot>
    </v-layout>
  </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  data: () => ({
    drawer: false,
    links: [
      {
        title: 'Главная',
        to: '/',
      }
    ],
    avatarLinks: [
      {
        title: 'Выйти',
        to: '/logout',
      }
    ],
    fileName: undefined
  }),
  async mounted() {
    try {
      await this.$store.dispatch("auth/auth")
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapState('auth', ['auth'])
  },
  watch: {
    fileName(value) {
      try {
        this.$store.dispatch("files/searchFile", value)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.avatar {
  cursor: pointer;
}

.searchInput {
  max-width: 200px;
}
</style>