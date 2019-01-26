<template>
  <v-alert class="myAlert" dismissible @input="onClose" :value="true" :type="type">{{text}}</v-alert>
</template>

<script>
export default {
  props: ["text", "type", "time"],
  created() {
    if (this.time) {
      var self = this;
      setTimeout(function() {
        self.onClose();
      }, this.time);
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
.myAlert {
  margin-top: 0px;
}
</style>

