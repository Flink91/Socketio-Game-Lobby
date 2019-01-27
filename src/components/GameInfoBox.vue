<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="game-card">
        <v-toolbar color="white">
          <v-toolbar-title class="game-card-title">Game Info</v-toolbar-title>
        </v-toolbar>
        <v-card-text>// Game Info here</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateRoomModal from "@/components/CreateRoomModal.vue";
export default {
  data() {
    return {
      users: []
    };
  },
  computed: {}
};
</script>

<style scoped>
.game-card {
  min-height: 200px;
  opacity: 0.8;
  transition: 0.5s all;
}
.game-card-title {
  font-size: 18px;
  font-weight: bold;
}
</style>

