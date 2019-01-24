<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SocketIO</span>
        <span class="font-weight-light">Game Lobby</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat to="/about">About</v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

