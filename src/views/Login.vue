<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Connect 4</h1>
        <h4>with Vue, Vuetify, Express and Socket.io</h4>
        <br>
        <br>
        <app-join-form/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import JoinForm from "@/components/JoinForm.vue";
import JoiningList from "@/components/JoiningList.vue";

export default {
  data() {
    return {};
  },
  computed: {
    name() {
      return this.$store.getters.name;
    }
  },
  components: {
    "app-join-form": JoinForm,
    "app-joining-list": JoiningList
  }
};
</script>
