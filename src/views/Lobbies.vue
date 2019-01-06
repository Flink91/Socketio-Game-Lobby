<template>
  <v-layout>
    <v-flex xs12 sm8 md10 my-3 mx-3>
      <app-lobby-list/>
    </v-flex>

    <v-flex my-3 mx-3>
      <div class="new-users-card py-3 px-3">
        <div class="new-users-card-body">
          <div class="new-users-card-title">
            <h3>People joining:</h3>
          </div>
          <div class="card-body">
            <div class="users" v-for="(msg, index) in lastUsers" :key="index">
              <p v-bind:style="{ color: msg.color }" class="new-user">
                <span
                  class="font-weight-bold"
                  v-bind:style="{ color: msg.color }"
                >{{ msg.username }} connected</span>
                ({{ msg.color }})
              </p>
            </div>
          </div>
        </div>
        <div class="card-footer"></div>

        <app-join-modal @newUser="newUser"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import JoinModal from "@/components/JoinModal.vue";
import LobbyList from "@/components/LobbyList.vue";

export default {
  data() {
    return {
      username: "",
      color: "",
      users: []
    };
  },
  computed: {
    lastUsers() {
      if (this.users.length <= 5) {
        return this.users;
      } else {
        return this.users.slice(-5);
      }
    }
  },
  sockets: {
    connect: function() {
      alert("socket connected");
    },
    ON_NEW_USER: function(data) {
      this.users = [...this.users, data];
    }
  },
  methods: {
    newUser(name, color) {
      this.username = name;
      this.color = color;
      this.sendNewUser();
    },
    sendNewUser() {
      this.$socket.emit("SEND_NEW_USER", {
        username: this.username,
        color: this.color
      });
      // this.color = ''
    }
  },
  mounted() {
    this.$socket.on("ON_NEW_USER", data => {
      this.users = [...this.users, data];
      // you can also do this.messages.push(data)
    });
  },
  components: {
    "app-join-modal": JoinModal,
    "app-lobby-list": LobbyList
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
