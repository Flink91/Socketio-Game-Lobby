<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="game-card">
        <v-toolbar dense color="white">
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
            <v-btn @click="startGame()" block color="success" :disabled="!isAllReady">Start Game
              <v-spacer/>
              <v-icon>done</v-icon>
            </v-btn>
          </div>
          <div style="width:100%;" v-else>
            <v-btn v-if="!ready" @click="setReady(true)" block color="info">Ready?
              <v-spacer/>
              <v-icon>help_outline</v-icon>
            </v-btn>
            <v-btn v-else @click="setReady(false)" flat block color="success">Ready!
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
      options: { board: [6, 7] },
      isClicked: false
    };
  },
  methods: {
    setReady(isReady) {
      if (this.isClicked) return;
      this.isClicked = true;
      this.$socket.emit("SET_READY", isReady, ready => {
        this.ready = ready;
      });
      // prevent spam clicking
      setTimeout(() => {
        this.isClicked = false;
      }, 3000);
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
    },
    isAllReady() {
      return this.$store.getters.isAllReady;
    }
  },
  created() {
    this.isAllReady = false;
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

