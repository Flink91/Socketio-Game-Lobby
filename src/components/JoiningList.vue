<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="joining-card">
        <v-toolbar dense color="white">
          <v-toolbar-title>People joining</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="joining-card-text">
          <div class="users" v-for="(msg, index) in last10BroadcastMessages" :key="index">
            <p
              :style="[ msg.disconnected ? {color: 'grey',fontStyle:'italic'} : {color:msg.color }]"
              class="new-user"
            >
              <span class="font-weight-bold">
                {{ msg.name }}
                <span v-if="msg.disconnected">dis</span>connected
              </span>
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
    last10BroadcastMessages() {
      return this.$store.getters.last10BroadcastMessages;
    }
  },
  methods: {},
  mounted() {
    this.$socket.on("NEW_USER", data => {
      this.users = [...this.users, data];
      // could also do this.messages.push(data)
    });
  }
};
</script>

<style scoped>
.joining-card {
  min-height: 300px;
  opacity: 0.8;
  transition: 0.5s all;
}
.joining-card-title {
  font-size: 18px;
  font-weight: bold;
}

.new-user {
  margin-bottom: 4px;
}
</style>

