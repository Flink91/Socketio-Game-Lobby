<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SocketIO</span>
        <span class="font-weight-light">Game Lobby</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/Flink91/Socketio-Game-Lobby" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <app-lobbies-view/>
    </v-content>
  </v-app>
</template>

<script>
import Lobby from "./components/views/LobbiesView";

export default {
  name: "App",
  components: {
    "app-lobbies-view": LobbiesView
  },
  data() {
    return {
      //
    };
  }
};
</script>
