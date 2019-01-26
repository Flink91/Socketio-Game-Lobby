<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Chat Rooms&nbsp;</span>
        <span class="font-weight-light">with SocketIO &amp; Vue</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat to="/about">About</v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>

      <v-layout row v-if="info">
        <v-flex xs12>
          <app-toast :text="info.message" :type="info.type" :time="info.time"></app-toast>
        </v-flex>
      </v-layout>
    </v-content>
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


