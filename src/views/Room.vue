<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 md10>
        <v-layout justify-space-between class="mb-3">
          <v-flex>
            <h3 class="title my-3 mx-0">Room: {{room.readableName}}</h3>
          </v-flex>
          <v-flex text-xs-right>
            <v-btn color="error" @click="leave" fab small>
              <v-icon>exit_to_app</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <div>
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
              <h3>People in Room: ({{room.clients.length}}/{{room.size}})</h3>
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
              <p class="new-user">// Hook up game here</p>
            </div>
          </div>
          <div class="card-footer"></div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      chatMessage: "",
      valid: true,
      color: "",
      users: []
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
    },
    leave() {
      this.$socket.emit("LEAVE_ROOM");
      this.$router.push("/");
    }
  },
  mounted() {}
};
</script>

<style scoped>
.new-users-card {
  min-width: 200px;
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
