<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 md10>
        <h3 class="title my-3 mx-0">Room: {{room.readableName}}</h3>
        <div>
          <v-spacer></v-spacer>

          <ul class="messages" v-chat-scroll="{always: false, smooth: true}">
            <li class="message" v-for="(m, index) in messages" :key="index">
              <span class="font-weight-bold" v-bind:style="{ color: m.color }">{{ m.name }}</span>
              : {{m.message}}
            </li>
          </ul>
        </div>
        <v-form class="chatMessage-form">
          <v-text-field
            v-model="chatMessage"
            append-icon="send"
            box
            label="type here"
            type="text"
            @keydown.enter="submit"
            @click:append="submit"
            class="myInput mb-0"
          ></v-text-field>
        </v-form>
      </v-flex>

      <v-flex xs12 sm4 md2>
        <div class="new-users-card py-3 px-3">
          <div class="new-users-card-body">
            <div class="new-users-card-title">
              <h3>People in Lobby:</h3>
            </div>
            <div class="card-body">
              <div class="users" v-for="(client, index) in room.clients" :key="index">
                <p v-bind:style="{ color: client.color }" class="new-user">
                  <span
                    class="font-weight-bold"
                    v-bind:style="{ color: client.color }"
                  >{{ client.name }}</span>
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
                <p class="new-user">//Todo</p>
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
    },
    messages() {
      return this.$store.getters.messages;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      //Room ID not needed, the Server will look for the ID via socket.id of Sender
      this.$socket.emit("SEND_MESSAGE", {
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
.messages {
  height: 250px;
  list-style: none;
  padding: 12px;
  overflow: scroll;
  overflow-x: auto;
}

.message {
  padding: 2px 0px;
  text-decoration: none;
}
.chatMessage-form {
  width: 100%;
}
</style>
