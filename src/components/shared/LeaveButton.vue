<template>
  <div>
    <v-btn color="error" @click="dialog = true" fab small>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Do you really want to leave?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">No</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="yes">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    yes() {
      this.$socket.emit("LEAVE_ROOM", () => {
        this.$store.commit("clearMessages");
        this.$store.commit("clearGame");
        this.dialog = false;
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
.headline {
  font-size: 16px;
}
</style>

