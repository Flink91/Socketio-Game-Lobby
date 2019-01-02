<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>Lobbies</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>-->
          <v-btn icon>
            <v-icon @click="showCreateLobbyModal = true">add</v-icon>
          </v-btn>
        </v-toolbar>
        <app-create-lobby-modal :show="showCreateLobbyModal"/>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

            <v-list-tile v-else :key="item.title" avatar>
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn to="lobby">Join</v-btn>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateLobbyModal from "@/components/CreateLobbyModal.vue";
export default {
  data() {
    return {
      showCreateLobbyModal: false,
      items: [
        // { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Normal Game 1/2",
          subtitle: "Extra info"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Normal Game 2/8",
          subtitle: "Extra info"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Private Game 1/4",
          subtitle: "Additional info"
        }
      ]
    };
  },
  components: {
    "app-create-lobby-modal": CreateLobbyModal
  }
};
</script>