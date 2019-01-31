<template>
  <v-container grid-list-sm class="py-0 px-0">
    <v-flex xs12>
      <p>{{currentPlayer}} 's turn</p>
    </v-flex>

    <v-flex xs12>
      <table class="board">
        <tbody>
          <tr v-for="n in 6" :key="n">
            <td v-for="m in 7" :key="m">
              <button type="button" @click="clicked(n,m)"></button>
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
    return {};
  },
  computed: {
    room() {
      return this.$store.getters.room;
    }
  },
  methods: {
    clicked(n, m) {
      alert(n, m);
    }
  },
  components: {}
};
</script>

<style scoped>
.board {
  padding: 12px;
  background-color: rgb(26, 35, 126);
  border-radius: 3px;
}
.board button {
  padding: 2px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  background: #bebebe;
}
</style>
