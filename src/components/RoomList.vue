<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>Rooms</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>-->
          <v-btn icon>
            <v-icon @click="showCreateRoomModal = true">add</v-icon>
          </v-btn>
        </v-toolbar>
        <app-create-room-modal :show="showCreateRoomModal"/>

        <div v-if="!rooms || rooms.length<=0" class="placeholder">
          <p>No rooms yet</p>
          <v-btn @click="showCreateRoomModal = true">Create the first one!</v-btn>
        </div>

        <div v-else>
          <v-list two-line>
            <template v-for="(room, index) in rooms">
              <v-subheader v-if="room.header" :key="room.header">{{ room.header }}</v-subheader>

              <v-divider :key="index"></v-divider>

              <v-list-tile :key="room.readableName" avatar>
                <v-list-tile-avatar>
                  <img src="@/assets/1.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{room.readableName}} (Host: {{room.clients[0].name}})</v-list-tile-title>
                  <v-list-tile-sub-title>{{room.clients.length}}/{{room.size}}</v-list-tile-sub-title>
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
      showCreateRoomModal: false
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

