<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs4 text-xs-center>
        <v-btn @click="prevColor" fab small>
          <v-icon>arrow_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <div class="square" :style="{'background-color':colors[color]}">
          <span class="colorNumber">{{color}}</span>
        </div>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <v-btn @click="nextColor" fab small>
          <v-icon>arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "#FF0000",
        "#C13F3F",
        "#EEB70C",
        "#2FF900",
        "#2CFC60",
        "#110754",
        "#8A0499",
        "#300242",
        "#0000FF",
        "#3F6022"
      ],
      color: Math.floor(Math.random() * 10)
    };
  },
  methods: {
    nextColor() {
      if (this.color >= this.colors.length - 1) {
        this.color = 0;
      } else {
        this.color++;
      }
      this.submit();
    },
    prevColor() {
      if (this.color == 0) {
        this.color = this.colors.length - 1;
      } else {
        this.color--;
      }
      this.submit();
    },
    submit() {
      this.$emit("color", this.colors[this.color]);
    }
  },
  created() {
    this.submit();
  }
};
</script>

<style scoped>
.square {
  display: inline-block;
  height: 100%;
  width: 100%;
  max-width: 100px;
}

.square .colorNumber {
  margin-top: 20px;
  color: white;
}
</style>
