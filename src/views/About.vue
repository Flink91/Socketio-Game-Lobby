<template>
  <v-container>
    <v-layout column>
      <div class="about">
        <h4>This is an about page</h4>
        <p>Made by Felix Gellner
          <br>MIT Licence
        </p>

        <v-btn href="https://github.com/Flink91/Socketio-Game-Lobby" target="_blank">
          <span class="mr-2">Latest Release</span>
        </v-btn>

        <v-btn v-if="room" @click="$router.go(-1)" color="info">Back to your room</v-btn>
        <v-btn v-else @click="$router.go(-1)" color="info">Back</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    room() {
      return this.$store.getters.room;
    },
    messages() {
      return this.$store.getters.messages;
    }
  }
};
</script>
