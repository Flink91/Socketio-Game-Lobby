<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="in-room-card">
        <v-toolbar dense color="white">
          <v-toolbar-title>People in Room: ({{room.clients.length}}/{{room.size}})</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="in-room-card-text">
          <div class="users" v-for="(client, index) in room.clients" :key="index">
            <p v-bind:style="{ color: client.color }" class="new-user">
              <span
                class="font-weight-bold"
                v-bind:style="{ color: client.color }"
              >{{ client.name }}&nbsp;</span>
              <v-icon
                v-if="isHost && !client.isHost"
                small
                color="red darken-2"
                class="in-room-icon"
                @click="kick(client.id)"
              >block</v-icon>
              <v-icon
                v-if="client.isHost"
                small
                color="orange darken-1"
                class="in-room-icon"
              >gamepad</v-icon>
              <v-icon v-if="client.ready" small color="success" class="ready-icon">done</v-icon>
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateRoomModal from "@/components/CreateRoomModal.vue";
export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    room() {
      return this.$store.getters.room;
    },
    last5Users() {
      return this.$store.getters.last5Users;
    },
    isHost() {
      return this.$store.getters.isHost;
    }
  },
  methods: {
    kick(clientID) {
      console.log("kick");
      console.log(clientID);
      this.$socket.emit("KICK", clientID, callback => {
        // hmm
      });
    }
  },
  mounted() {
    this.$socket.on("NEW_USER", data => {
      this.users = [...this.users, data];
      // could also do this.messages.push(data)
    });
  }
};
</script>

<style scoped>
.in-room-card {
  min-height: 200px;
  opacity: 0.8;
  transition: 0.5s all;
}
.in-room-card-title {
  font-size: 18px;
  font-weight: bold;
}

.new-user {
  margin-bottom: 4px;
}

.in-room-icon,
.ready-icon {
  margin-bottom: 2px;
}

.ready-icon {
  float: right;
}
</style>

