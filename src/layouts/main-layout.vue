<template>
  <v-card>
    <v-layout>
      <v-app-bar
          color="orange"
          prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Cloud storage</v-toolbar-title>

        <v-spacer></v-spacer>
        <p class="mr-5">{{auth?.firstname}}</p>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar size="40" color="surface-variant" class="mr-5 avatar" v-bind="props"></v-avatar>
          </template>

          <v-list>
            <v-list-item
                v-for="(item, i) in avatarLinks"
                :key="i"
            >
              <router-link class="mt-5 text-decoration-none text text-subtitle-1 text-black" :to="item.to">{{item.title}}</router-link>
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
          <router-link class="mt-5 text-decoration-none text text-subtitle-1 text-black" v-for="item in links" :to="item.to" :key="item.to">{{item.title}}</router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh" class="overflow-auto">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    drawer: false,
    links: [
      {
        title: 'Главная',
        to: '/',
      },
      {
        title: 'Новые файлы',
        to: '/news'
      }
    ],
    avatarLinks: [
      {
        title: 'Выйти',
        to: '/logout',
      }
    ]
  }),
  async mounted() {
    try{
      await this.$store.dispatch("auth/auth")
    } catch(err) {
      console.log(err)
    }
  },
  computed: {
    ...mapState('auth', ['auth'])
  }
}
</script>

<style scoped lang="scss">
.avatar{
  cursor: pointer;
}
</style>