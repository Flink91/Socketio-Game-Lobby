<template>
  <v-layout row justify-center>
    <v-dialog :value="dialog" persistent max-width="600px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-toolbar dense color="primary" dark>
          <v-toolbar-title>Pick a name and a color!</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list xs-12 class="py-0">
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="form" v-model="valid" lazy-validation class="join-form">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    label="Name"
                    single-line
                    solo
                    required
                  ></v-text-field>
                  <app-avatar-picker @color="getColor"></app-avatar-picker>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree to the terms and conditions?"
                    required
                  ></v-checkbox>

                  <v-btn :disabled="!valid" @click="submit" block large>Join</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-flex xs12>
          <v-expansion-panel class="terms">
            <v-expansion-panel-content>
              <div slot="header">Terms and conditions</div>
              <v-card>
                <v-card-text>
                  Put your terms and condititons here.
                  <ul>
                    <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                    <li>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import AvatarPicker from "@/components/shared/AvatarPicker.vue";
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      name: "",
      // this is not checked on the server, but it will suffice for this
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters",
        v =>
          (v && v.replace(/\s/g, "").length > 0) || "Name cannot be only spaces"
      ],
      color: "",
      checkbox: true
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
    getColor(color) {
      this.color = color;
    },
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
  },
  components: {
    "app-avatar-picker": AvatarPicker
  }
};
</script>

<style scoped>
.join-form {
  width: 100%;
}
.terms {
  background-color: #ececec !important;
}
</style>
