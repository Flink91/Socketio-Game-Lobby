<template>
  <v-layout row justify-center>
    <v-dialog :value="dialog" persistent max-width="600px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-slide-y-transition>
          <v-layout row v-if="error">
            <v-flex xs12>
              <app-alert :text="error.message" :type="'error'"></app-alert>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>

        <v-card-title>
          <span class="headline">Pick a Name and a color!</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list xs-12>
            <v-layout wrap>
              <v-form ref="form" v-model="valid" lazy-validation class="join-form">
                <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Name" required></v-text-field>
                <v-text-field v-model="color" :rules="colorRules" label="Color" required></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree to the terms?"
                  required
                ></v-checkbox>

                <v-btn :disabled="!valid" @click="submit">join</v-btn>
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
  data() {
    return {
      dialog: false,
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      color: "",
      colorRules: [v => !!v || "Color is required"],
      checkbox: false
    };
  },
  computed: {
    username() {
      return this.$store.getters.name;
    },
    error() {
      window.scrollTo(0, 0);
      return this.$store.getters.error;
    }
  },
  created() {
    this.dialog = this.$store.getters.name == null ? true : false;
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$socket.emit("NEW_USER", {
          username: this.name,
          color: this.color
        });
        this.clear();
        this.dialog = false;
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.join-form {
  width: 100%;
}
</style>
