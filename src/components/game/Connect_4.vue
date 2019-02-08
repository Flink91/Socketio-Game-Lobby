<template>
  <v-container grid-list-sm class="py-0 px-0" align-content-center>
    <v-flex xs12>
      <table class="board">
        <tbody>
          <tr v-for="(y,y_index) in board" :key="y_index">
            <td v-for="(x,x_index) in y" :key="x_index">
              <div
                class="piece"
                @click="clicked(x_index,y_index)"
                :style="{backgroundColor: pieceColors[board[y_index][x_index]]}"
              >
                <!-- <small>{{x_index}}|{{y_index}}</small> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </v-flex>
    <v-flex xs12 align-content-center>
      <h2>{{currentPlayer.name || false}}'s turn</h2>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pieceColors: ["#BEBEBE", "#ad0505 ", "#FEB835"]
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
    },
    winner() {
      return this.$store.getters.winner;
    }
  },
  methods: {
    clicked(x, y) {
      if (this.winner === null) {
        this.$socket.emit("GAME_TURN", [x, y]);
      }
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
.board .piece {
  text-align: center;
  padding: 2px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: #bebebe;
}

@media only screen and (min-width: 600px) {
  .board {
    margin: 0 auto;
    padding: 12px;
    background-color: rgb(26, 35, 126);
    border-radius: 3px;
  }
  .board .piece {
    text-align: center;
    padding: 5px;
    width: 60px;
    height: 60px;
    margin: 3px;
    border-radius: 50%;
    border: 0;
    background: #bebebe;
  }
}
</style>
