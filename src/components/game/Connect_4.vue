<template>
  <v-container grid-list-sm class="py-0 px-0" align-content-center>
    <v-flex xs12>
      <table class="board">
        <tbody>
          <tr v-for="(y,y_index) in board" :key="y_index">
            <td v-for="(x,x_index) in y" :key="x_index">
              <transition name="slide">
                <div
                  v-if="isLastPiece(x_index,y_index)"
                  class="piece fallingPiece"
                  :style="{backgroundColor: getColor(y_index,x_index, true)}"
                ></div>
              </transition>
              <div
                class="piece"
                @click="clicked(x_index,y_index)"
                :class="{ hide: isLastPiece(x_index,y_index, false) }"
                :style="{backgroundColor: getColor(y_index,x_index)}"
              >
                <!-- <small>{{x_index}}|{{y_index}}</small> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </v-flex>
    <v-flex xs12 align-content-center>
      <transition name="jump" mode="out-in">
        <h2 :key="currentPlayer">{{currentPlayer.name || false}}'s turn</h2>
      </transition>
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
    currentTurn() {
      return this.$store.getters.currentTurn;
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
    },
    getColor(y, x, isFallingPiece) {
      if (this.currentTurn[0] == x) {
        if (this.currentTurn[1] == y) {
          if (!isFallingPiece) {
            return "#BEBEBE";
          }
        }
      }
      return this.pieceColors[this.board[y][x]];
    },
    isLastPiece(x, y) {
      if (this.currentTurn) {
        if (x == this.currentTurn[0]) {
          if (y == this.currentTurn[1]) {
            console.log(
              "islastpiece: " + this.currentTurn[0] + " " + this.currentTurn[1]
            );
            return true;
          }
        }
      }
      return false;
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
    transition: all 0.2s ease;
  }

  .board .fallingPiece {
    position: absolute;
  }

  .hide{
    display:none;
  }

  .active {
    height: 10px;
    width: 10px;
  }

  .slide-enter {
    transform: translateY(-400px);
  }
  .slide-enter-active {
    animation: slide-in 0.7s ease-in forwards;
  }
  @keyframes slide-in {
    from {
      transform: translateY(-400px);
    }
    to {
      transform: translateY(0);
    }
  }
}
</style>
