<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>Rooms</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>-->
          <v-btn icon>
            <v-icon @click="showCreateRoomModal">add</v-icon>
          </v-btn>
        </v-toolbar>
        <app-create-room-modal :show="showRoomModal"/>

        <div v-if="!rooms || rooms.length<=0" class="placeholder">
          <p>No rooms yet</p>
          <v-btn @click="showCreateRoomModal">Create the first one!</v-btn>
        </div>

        <div v-else>
          <v-list two-line>
            <template v-for="(room, index) in rooms">
              <v-subheader v-if="room.header" :key="room.header">{{ room.header }}</v-subheader>

              <v-divider :key="index"></v-divider>

              <v-list-tile :key="room.readableName" avatar>
                <v-list-tile-avatar>
                  <img :src="images[room.game.replace(/\s/g, '')]">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{room.readableName}} (Host: {{room.clients[0].name}})</v-list-tile-title>
                  <v-list-tile-sub-title>{{room.game}} {{room.clients.length}}/{{room.size}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-btn @click="joinRoom(room.id)">Join</v-btn>
              </v-list-tile>
            </template>
          </v-list>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateRoomModal from "@/components/CreateRoomModal.vue";
export default {
  data() {
    return {
      showRoomModal: false,
      images: {
        JustChat: require("@/assets/games/JustChat.jpg"),
        Default: require("@/assets/games/Default.jpg"),
        ConnectWhat: require("@/assets/games/ConnectWhat.jpg")
      }
    };
  },
  computed: {
    rooms() {
      return this.$store.getters.rooms;
    }
  },
  methods: {
    joinRoom(roomID) {
      let self = this;
      if (roomID == null || roomID == undefined) {
        alert("something went wrong...");
      }
      this.$socket.emit("JOIN", roomID, function() {
        self.$router.push({ name: "room", params: { roomID: roomID } });
      });
    },
    showCreateRoomModal() {
      // cheeky workaround :) Needs to be set to false and then true again to update, otherwise it might need two clicks after closing the modal by clicking outside of it. An emit from child would solve this but seems like overkill. Let me know if you know a better solution
      this.showRoomModal = false;
      setTimeout(() => {
        this.showRoomModal = true;
      }, 0);
    }
  },
  components: {
    "app-create-room-modal": CreateRoomModal
  }
};
</script>

<style scoped>
.placeholder {
  padding: 20px;
  text-align: center;
}
</style>

