<template>
  <v-container>
    <v-layout align-center justify-center row fill-height>
      <v-flex text-xs-right>
        <v-btn @click="prevColor" fab small>
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex text-xs-center>
        <div class="square" :style="{'background-color':colors[color]}">
          <!-- <span class="colorNumber">{{color+1}}</span> -->
        </div>
      </v-flex>
      <v-flex text-xs-left>
        <v-btn @click="nextColor" fab small>
          <v-icon>keyboard_arrow_right</v-icon>
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
        "#7F6900",
        "#2CFC60",
        "#110754",
        "#8A0499",
        "#300242",
        "#0000FF",
        "#3F6022",
        "#4f02ff",
        "#9B0BB5",
        "#0B0003"
      ],
      color: Math.floor(Math.random() * 13)
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
  height: 40px;
  width: 40px;
  max-width: 100px;
  margin-top: 8px;
  border-radius: 5px;
  border: 2px solid grey;
  box-shadow: 0 0 4px 0px grey;
}

.square .colorNumber {
  color: #efefef;
  font-size: 30px;
}
</style>
