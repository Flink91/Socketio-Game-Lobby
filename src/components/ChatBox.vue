<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{room.readableName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <app-leave-button/>
      </v-toolbar>

      <div>
        <ul class="messages" v-chat-scroll="{always: false, smooth: true}">
          <li class="message" v-for="(m, index) in messages" :key="index">
            <span
              v-if="m.type!='server'"
              class="font-weight-bold"
              v-bind:style="{ color: m.color }"
            >{{ m.name }}:</span>
            {{m.message}}
          </li>
        </ul>
      </div>
      <v-form class="chatMessage-form">
        <v-text-field
          id="chatInput"
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
  </v-layout>
</template>

<script>
import LeaveButton from "@/components/shared/LeaveButton.vue";
export default {
  data() {
    return {
      chatMessage: ""
    };
  },
  computed: {
    username() {
      return this.$store.getters.name;
    },
    messages() {
      return this.$store.getters.messages;
    },
    room() {
      return this.$store.getters.room;
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      // TODO client could change own name here
      this.$socket.emit("SEND_MESSAGE", {
        name: this.username,
        message: this.chatMessage
      });
      this.chatMessage = "";
    }
  },
  components: {
    "app-leave-button": LeaveButton
  }
};
</script>

<style scoped>
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
.chatMessage-form .v-messages {
  display: none;
}
</style>


