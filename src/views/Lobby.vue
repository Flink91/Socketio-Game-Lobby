<template>
  <v-layout>
    <v-flex xs12 sm8 md10 my-3 mx-3>
      <v-card>
        <v-card-title>Lobby Name</v-card-title>

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
          <v-text-field v-model="chatMessage" label="Chat here..." class="px-3"></v-text-field>
          <v-btn>Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex my-3 mx-3>
      <div class="new-users-card py-3 px-3">
        <div class="new-users-card-body">
          <div class="new-users-card-title">
            <h3>People in Lobby:</h3>
          </div>
          <div class="card-body">
            <div class="users" v-for="(msg, index) in lastUsers" :key="index">
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
            <div class="users" v-for="(msg, index) in lastUsers" :key="index">
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
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      chatMessage: "",
      username: "",
      color: "",
      users: [],
      socket: io("localhost:3001")
    };
  },
  computed: {
    lastUsers() {
      if (this.users.length <= 5) {
        return this.users;
      } else {
        return this.users.slice(-5);
      }
    }
  },
  methods: {
    newUser(name, color) {
      this.username = name;
      this.color = color;
      this.sendNewUser();
    },
    sendNewUser() {
      this.socket.emit("SEND_NEW_USER", {
        username: this.username,
        color: this.color
      });
      // this.color = ''
    }
  },
  mounted() {
    this.socket.on("ON_NEW_USER", data => {
      this.users = [...this.users, data];
      // you can also do this.messages.push(data)
    });
  }
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
</style>
