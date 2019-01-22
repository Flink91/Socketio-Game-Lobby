<template>
  <div>
    <v-slide-y-transition>
      <v-layout row v-if="error">
        <v-flex xs12>
          <app-alert :text="error.message" :type="'error'"></app-alert>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm8 md10>
          <app-room-list/>
        </v-flex>

        <v-flex xs12 sm4 md2>
          <div class="new-users-card py-3 px-3">
            <div class="new-users-card-body">
              <div class="new-users-card-title">
                <h3>People joining:</h3>
              </div>
              <div class="card-body">
                <div class="users" v-for="(msg, index) in last10BroadcastMessages" :key="index">
                  <p
                    :style="[ msg.disconnected ? {color: 'grey',fontStyle:'italic'} : {color:msg.color }]"
                    class="new-user"
                  >
                    <span class="font-weight-bold">
                      {{ msg.name }}
                      <span v-if="msg.disconnected">dis</span>connected
                    </span>
                    <span v-if="!msg.disconnected">({{ msg.color }})</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer"></div>

            <app-join-modal/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import JoinModal from "@/components/JoinModal.vue";
import RoomList from "@/components/RoomList.vue";

export default {
  data() {
    return {
      username: "",
      color: "",
      users: []
    };
  },
  computed: {
    error() {
      window.scrollTo(0, 0);
      return this.$store.getters.error;
    },
    last10BroadcastMessages() {
      return this.$store.getters.last10BroadcastMessages;
    }
  },
  sockets: {
    // This place is useful when not using Vuex
    connect: function() {}
  },
  methods: {},
  mounted() {
    this.$socket.on("NEW_USER", data => {
      // eslint-disable-next-line
      console.log("hi" + data);
      this.users = [...this.users, data];
      // you can also do this.messages.push(data)
    });
  },
  components: {
    "app-join-modal": JoinModal,
    "app-room-list": RoomList
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
</style>
