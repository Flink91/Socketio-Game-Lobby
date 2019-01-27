<template>
  <div>
    <app-join-modal/>

    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs12 sm8 lg9>
          <app-room-list/>
        </v-flex>

        <v-flex xs12 sm4 lg3>
          <app-joining-list/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import JoinModal from "@/components/JoinModal.vue";
import RoomList from "@/components/RoomList.vue";
import JoiningList from "@/components/JoiningList.vue";

export default {
  data() {
    return {};
  },
  sockets: {
    // This place is only useful when not using Vuex
    connect: function() {}
  },
  components: {
    "app-join-modal": JoinModal,
    "app-room-list": RoomList,
    "app-joining-list": JoiningList
  }
};
</script>
