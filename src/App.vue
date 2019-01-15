<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <span>SocketIO</span>
          <span class="font-weight-light">Game Lobby</span>
        </router-link>
      </v-toolbar-title>

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

