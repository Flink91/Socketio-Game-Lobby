<template>
  <v-snackbar class="myAlert" @input="onClose" :value="true" :color="type" :timeout="timeout">
    {{text}}
    <v-btn flat @click="onClose" fab>
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ["text", "type", "time"],
  data() {
    return {
      timeout: 0
    };
  },
  created() {
    if (this.time) {
      this.timeout = this.time;
    }
  },
  methods: {
    onClose() {
      this.$store.dispatch("clearInfo");
      this.$emit("dismissed");
    }
  }
};
</script>

<style>
</style>

