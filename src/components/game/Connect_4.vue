<template>
  <v-container grid-list-sm class="py-0 px-0" align-content-center>
    <v-flex xs12>
      <h3>{{currentPlayer}}'s turn</h3>
      <p>Board: {{board}}</p>
    </v-flex>

    <v-flex xs12>
      <table class="board">
        <tbody>
          <tr v-for="(y,y_index) in board" :key="y_index">
            <td v-for="(x,x_index) in y" :key="x_index">
              <button
                type="button"
                @click="clicked(x_index,y_index)"
                :style="{backgroundColor: pieceColors[board[y_index][x_index]]}"
              >{{x_index}}|{{y_index}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pieceColors: ["#CECECE", "#ad0505 ", "#FEB835"]
    };
  },
  computed: {
    currentPlayer() {
      return this.$store.getters.currentPlayer;
    },
    board() {
      return this.$store.getters.board;
    },
    room() {
      return this.$store.getters.room;
    }
  },
  methods: {
    clicked(x, y) {
      this.$socket.emit("GAME_TURN", [x, y]);
    }
  },
  components: {}
};
</script>

<style scoped>
.board {
  margin: 0 auto;
  padding: 6px;
  background-color: rgb(26, 35, 126);
  border-radius: 3px;
}
.board button {
  padding: 2px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: #bebebe;
}
</style>
