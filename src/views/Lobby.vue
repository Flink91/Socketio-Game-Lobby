<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 md10>
        <v-card>
          <v-card-title>{{room}}</v-card-title>

          <v-spacer></v-spacer>

          <v-timeline dense clipped class="timeline mt-3 mx-3">
            <v-timeline-item class="mb-3" color="grey" icon-color="grey lighten-2" small>
              <v-layout justify-space-between>
                <v-flex xs7>Welcome to this Lobby! You can chat here.</v-flex>
                <v-flex xs5 text-xs-right>15:26</v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>

          <v-card-actions>
            <v-form ref="form" lazy-validation class="chatMessage-form">
              <v-text-field v-model="chatMessage" label="type here" class="px-3" required></v-text-field>
              <v-btn :disabled="!valid" @click="submit">Send</v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm4 md2>
        <div class="new-users-card py-3 px-3">
          <div class="new-users-card-body">
            <div class="new-users-card-title">
              <h3>People in Lobby:</h3>
            </div>
            <div class="card-body">
              <div class="users" v-for="(msg, index) in last5Users" :key="index">
                <p v-bind:style="{ color: msg.color }" class="new-user">
                  <span
                    class="font-weight-bold"
                    v-bind:style="{ color: msg.color }"
                  >{{ msg.username }} connected</span>
                  ({{ msg.color }})
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer"></div>
        </div>

        <div class="new-users-card py-3 px-3">
          <div class="new-users-card-body">
            <div class="new-users-card-title">
              <h3>Game Info:</h3>
            </div>
            <div class="card-body">
              <div class="users" v-for="(msg, index) in last5Users" :key="index">
                <p v-bind:style="{ color: msg.color }" class="new-user">
                  <span
                    class="font-weight-bold"
                    v-bind:style="{ color: msg.color }"
                  >{{ msg.username }} connected</span>
                  ({{ msg.color }})
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer"></div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      chatMessage: "",
      valid: true,
      color: "",
      users: [],
      socket: io("localhost:3001")
    };
  },
  computed: {
    last5Users() {
      return this.$store.getters.last5Users;
    },
    username() {
      return this.$store.getters.name;
    },
    room() {
      return this.$store.getters.room;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      alert(this.chatMessage);

      this.$socket.in(this.room.id).emit("SEND_MESSAGE", {
        name: this.username,
        message: this.chatMessage
      });
      this.chatMessage = "";
    }
  },
  mounted() {}
};
</script>

<style scoped>
.new-users-card {
  min-width: 200px;
  min-height: 180px;
  opacity: 0.8;
  transition: 0.5s all;
}
.new-user {
  margin-bottom: 4px;
}
.timeline {
  min-height: 300px;
}
.chatMessage-form {
  width: 100%;
}
</style>
