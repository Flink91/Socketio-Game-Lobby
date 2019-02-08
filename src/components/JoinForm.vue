<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-card>
        <v-card-title>
          <h2 class="login-title">Pick a name and a color!</h2>
        </v-card-title>
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
                    required
                  ></v-text-field>
                  <app-avatar-picker @color="getColor"></app-avatar-picker>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree to the terms and conditions?"
                    required
                  ></v-checkbox>

                  <v-btn :disabled="!valid" :loading="loading" @click="submit" block large>Join</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AvatarPicker from "@/components/shared/AvatarPicker.vue";
export default {
  data() {
    return {
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
      checkbox: false
    };
  },
  computed: {
    username() {
      return this.$store.getters.name;
    },
    loading() {
      return this.$store.getters.loading;
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
        this.$store.commit("setLoading", true);
        this.$socket.emit("NEW_USER", {
          username: this.name,
          color: this.color
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  watch: {
    // as soon as the server gives us a name, we push to the main page
    username(val) {
      if (val) {
        this.$store.commit("setLoading", false);
        this.$router.push("/");
        this.clear();
      }
    }
  },
  components: {
    "app-avatar-picker": AvatarPicker
  }
};
</script>

<style scoped>
.login-title {
  text-align: center;
}
.join-form {
  width: 100%;
}
</style>
