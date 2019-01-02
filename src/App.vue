<template>
  <v-app>
    <v-toolbar app>
      <router-link to="/">
        <v-toolbar-title class="headline text-uppercase">
          <span>SocketIO</span>
          <span class="font-weight-light">Game Lobby</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/Flink91/Socketio-Game-Lobby" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>

      <v-btn flat to="about">About</v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
