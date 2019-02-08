<template>
  <v-app>
    <!-- <v-toolbar app v-if="!(['room', 'game'].indexOf($route.name) > -1)">
      <v-toolbar-title class="headline text-uppercase">
        <span>Chat Rooms&nbsp;</span>
        <span class="font-weight-light">with SocketIO &amp; Vue</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>-->
    <v-content>
      <router-view/>

      <v-layout row v-if="info">
        <v-flex xs12>
          <app-toast :text="info.message" :type="info.type" :time="info.time"></app-toast>
        </v-flex>
      </v-layout>
    </v-content>

    <v-footer class="pa-3">
      <router-link to="/about">
        <a>About</a>
      </router-link>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    info() {
      window.scrollTo(0, 0);
      return this.$store.getters.info;
    }
  }
};
</script>


