<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">New Room</span>
        </v-card-title>
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
                  :max="8"
                  :min="2"
                ></v-slider>
                <!-- <v-checkbox v-model="privateCheckbox" label="Make this Room private?" required></v-checkbox> -->
                <v-btn :disabled="!valid" @click="submit">Create and join</v-btn>
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
      dialog: this.show,

      valid: true,
      roomName: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      slider: 2,
      ticksLabels: ["2", "3", "4", "5", "6", "7", "8"],
      privateCheckbox: false
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
        this.privateCheckbox,
        function(roomID) {
          self.clear();
          self.dialog = false;
          self.$router.push({ name: "room", params: { roomID: roomID } });
        }
      );
      // this.color = ""
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  watch: {
    // watch is needed, so the props change is detected, because I want to open the modal from a button in the parent component
    show: function() {
      if (this.show == true) {
        this.dialog = true;
      } else {
        this.show == false;
        this.dialog = false;
      }
    }
  }
};
</script>

<style scoped>
.join-form {
  width: 100%;
}
</style>
