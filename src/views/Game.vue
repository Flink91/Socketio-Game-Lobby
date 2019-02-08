<template>
  <v-container grid-list-sm class="py-1 px-1">
    <v-layout row wrap>
      <v-flex xs12 md8>
        <app-connect-4/>
      </v-flex>
      <v-flex xs12 md4>
        <app-chat-box/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PeopleInRoomList from "@/components/PeopleInRoomList.vue";
import GameInfoBox from "@/components/GameInfoBox.vue";
import Connect4 from "@/components/game/Connect_4.vue";
import ChatBox from "@/components/ChatBox.vue";
export default {
  data() {
    return {
      chatMessage: ""
    };
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
    username() {
      this.$store.getters.name;
    },
    room() {
      return this.$store.getters.room;
    }
  },
  components: {
    "app-chat-box": ChatBox,
    "app-people-in-room-list": PeopleInRoomList,
    "app-game-info-box": GameInfoBox,
    "app-connect-4": Connect4
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
