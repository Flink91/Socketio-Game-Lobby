<template>
  <v-alert class="myAlert" dismissible @input="onClose" :value="true" :type="type">{{text}}</v-alert>
</template>

<script>
export default {
  props: ["text", "type"],
  created() {
    var self = this;
    setTimeout(function() {
      self.onClose();
    }, 4000);
  },
  methods: {
    onClose() {
      this.$store.dispatch("clearError");
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

