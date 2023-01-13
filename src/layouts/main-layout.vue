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
        <p class="mr-5">{{name}}</p>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar size="40" color="surface-variant" class="mr-5" v-bind="props"></v-avatar>
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

      <v-main style="height: 100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>

</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
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
    name: ""
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
  async mounted() {
    try{
      await this.$store.dispatch("auth/auth")
      this.name = await this.$store.getters["auth/auth"].firstname
    } catch(err) {
      console.log(err)
    }

  }
}
</script>

<style scoped>

</style>