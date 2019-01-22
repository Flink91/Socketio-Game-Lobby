<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs4 text-xs-center>
        <v-btn @click="prevColor">Left</v-btn>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <div class="square" :style="{'background-color':colors[color]}"></div>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <v-btn @click="nextColor">Right</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colors: ["#FF0000", "#00FF00", "0000FF"],
      color: 0
    };
  },
  methods: {
    nextColor() {
      this.color++;
    },
    prevColor() {
      this.color--;
    },
    submit() {
      this.$emit("color", this.color);
    }
  }
};
</script>

<style scoped>
.square {
  height: 40px;
  widows: 40px;
}
</style>
