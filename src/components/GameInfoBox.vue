<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="game-card">
        <v-toolbar color="white">
          <v-toolbar-title class="game-card-title">Game Info</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          Game: {{room.game}}
          <br>Some Option
          <br>Some other option
          <br>Last option
        </v-card-text>
        <v-card-actions>
          <div style="width:100%;" v-if="isHost">
            <v-btn @click="startGame()" block color="success">Start Game
              <v-spacer/>
              <v-icon>done</v-icon>
            </v-btn>
          </div>
          <div style="width:100%;" v-else>
            <v-btn v-if="!ready" @click="isReady(true)" block color="info">Ready?
              <v-spacer/>
              <v-icon>help_outline</v-icon>
            </v-btn>
            <v-btn v-else @click="isReady(false)" flat block color="success">Ready!
              <v-spacer/>
              <v-icon>done</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateRoomModal from "@/components/CreateRoomModal.vue";
export default {
  data() {
    return {
      users: [],
      ready: false,
      options: null
    };
  },
  methods: {
    isReady(isReady) {
      this.ready = isReady;
    },
    startGame() {
      this.$socket.emit("START_GAME", this.options);
    }
  },
  computed: {
    room() {
      return this.$store.getters.room;
    },
    isHost() {
      return this.$store.getters.isHost;
    }
  }
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

