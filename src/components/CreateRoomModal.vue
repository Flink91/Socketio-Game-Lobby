<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-toolbar dense color="primary" dark>
          <v-toolbar-title>New Room</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list xs-12>
            <v-layout wrap>
              <v-form ref="form" v-model="valid" lazy-validation class="join-form">
                <v-subheader class="pl-0">Room name</v-subheader>
                <v-text-field
                  v-model="roomName"
                  :rules="nameRules"
                  :counter="30"
                  label="Name"
                  required
                ></v-text-field>
                <v-subheader class="pl-0">Room size</v-subheader>
                <v-slider
                  always-dirty
                  ticks
                  tick-size="3"
                  :tick-labels="ticksLabels"
                  v-model="slider"
                  thumb-label="always"
                  step="2"
                  :min="2"
                  :max="8"
                ></v-slider>
                <v-select
                  :items="games"
                  label="Game"
                  solo
                  v-model="gameSelect"
                  :rules="gameSelectRules"
                ></v-select>
                <!-- <v-checkbox v-model="privateCheckbox" label="Make this Room private?" required></v-checkbox> -->
                <v-btn :disabled="!valid" @click="submit">Create and join</v-btn>
                {{gameSelect}}
              </v-form>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      dialog: false,
      valid: true,
      games: ["Connect 4", "Connect 4", "Connect 4"],
      gameSelect: "Connect 4",
      gameSelectRules: [v => !!v || "A Game must be selected"],
      roomName: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters",
        v =>
          (v && v.replace(/\s/g, "").length > 0) || "Name cannot be only spaces"
      ],
      slider: 2,
      ticksLabels: ["2", "4", "6", "8"]
      // privateCheckbox: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //this.$emit("newLobby", this.name, this.slider, this.privateCheckbox);
        this.sendHost();
      }
    },
    sendHost() {
      let self = this;
      this.$socket.emit(
        "HOST",
        this.roomName,
        this.slider,
        this.gameSelect,
        function(roomID) {
          self.clear();
          self.dialog = false;
          self.$router.push({ name: "room", params: { roomID: roomID } });
        }
      );
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  watch: {
    // watch is needed, so the props change is detected, because I want to open the modal from a button in the parent component
    show: function() {
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.join-form {
  width: 100%;
}
</style>
