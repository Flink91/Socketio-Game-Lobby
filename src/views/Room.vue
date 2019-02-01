<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm8 lg9>
        <app-chat-box/>
      </v-flex>

      <v-flex xs12 sm4 lg3>
        <app-game-info-box/>
        <app-people-in-room-list/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PeopleInRoomList from "@/components/PeopleInRoomList.vue";
import GameInfoBox from "@/components/GameInfoBox.vue";
import ChatBox from "@/components/ChatBox.vue";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    "app-chat-box": ChatBox,
    "app-people-in-room-list": PeopleInRoomList,
    "app-game-info-box": GameInfoBox
  }
};
</script>

<style scoped>
</style>
