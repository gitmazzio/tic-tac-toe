<template>
  <div id="play-grid">
    <div
      v-for="index in frames"
      :key="index"
      class="grid__item grid__item--border"
      :for="'checkbox-'+index"
    >
      <input
        type="checkbox"
        :id="'checkbox-'+index"
        class="sr-only"
        @click="setContent"
        :data-item="index"
      />
      <label :for="'checkbox-'+index" class="width-100 height-100 font4"></label>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: () => {
    return {
      frames: 9,
      gridArray: new Array(9),
      playerMove: 0,
      player: ["O", "X"],
      actualPlay: null,
      nextPlay: null,
      player: [
        { name: "Player1", score: 0, symbol: "O" },
        { name: "Player2", score: 0, symbol: "X" }
      ],
      gamePlayed: 0
    };
  },
  created() {
    this.nextTurn();
  },
  methods: {
    setContent(event) {
      event.target.disabled = true;
      const index = event.target.dataset.item;
      const inputNextElement = event.target.nextElementSibling;
      let valueString = null;
      valueString = this.gridArray[index - 1] = this.actualPlay;
      inputNextElement.innerHTML = this.actualPlay;

      this.checkWinner();
      this.nextTurn();
    },
    nextTurn() {
      if (this.playerMove === 0) {
        if (this.gamePlayed === 0 || this.gamePlayed % 2) {
          this.nextPlay = this.player[1].symbol;
          this.actualPlay = this.player[0].symbol;
        } else {
          this.nextPlay = this.player[0].symbol;
          this.actualPlay = this.player[1].symbol;
        }
      } else {
        if (this.nextPlay === this.player[1].symbol) {
          this.nextPlay = this.player[0].symbol;
          this.actualPlay = this.player[1].symbol;
        } else {
          this.nextPlay = this.player[1].symbol;
          this.actualPlay = this.player[0].symbol;
        }
      }
    },
    checkWinner() {
      console.log("check a winner...");

      //tutte le righe
      for (let row = 0; row < 9; row += 3) {
        if (
          this.gridArray[row] != undefined &&
          this.gridArray[row] === this.gridArray[row + 1] &&
          this.gridArray[row + 1] === this.gridArray[row + 2]
        ) {
          this.win();
          break;
        }
      }

      //tutte le colonne
      for (let row = 0; row < 3; row++) {
        if (
          this.gridArray[row] != undefined &&
          this.gridArray[row] === this.gridArray[row + 3] &&
          this.gridArray[row + 3] === this.gridArray[row + 6]
        ) {
          this.win();
          break;
        }
      }

      if (
        this.gridArray[0] != undefined &&
        this.gridArray[0] === this.gridArray[4] &&
        this.gridArray[4] === this.gridArray[8]
      ) {
        this.win();
        return;
      }

      if (
        this.gridArray[2] != undefined &&
        this.gridArray[2] === this.gridArray[4] &&
        this.gridArray[4] === this.gridArray[6]
      ) {
        this.win();
        return;
      }
      this.playerMove++;
    },
    win() {
      this.$store.commit("incrementGame");
      this.gamePlayed = this.$store.getters.getGameNumber;
      let winnerPlayer = this.player.filter(
        elem => elem.symbol === this.actualPlay
      )[0];
      winnerPlayer.score++;
      console.log(`${winnerPlayer.name} win a game!`);
      this.resetGrid();
    },
    resetGrid() {
      const allCheckbox = document.querySelectorAll("input[type=checkbox]");
      Array.from(allCheckbox).forEach(elem => {
        elem.checked = false;
        elem.disabled = false;
        elem.nextElementSibling.innerHTML = "";
      });
    }
  }
});
</script>

<style lang="scss">
$rowsColumns: 3;
$gridframes: repeat($rowsColumns, 1fr);

#play-grid {
  width: 90%;
  display: grid;
  grid-template-columns: $gridframes;
  grid-template-rows: $gridframes;
}

.grid__item {
  height: 100px;
}

.grid__item--border:nth-child(n) {
  border-right: 2px black solid;
  border-bottom: 2px black solid;
}

.grid__item--border:nth-child(3n) {
  border: none;
  border-bottom: 2px black solid;
}

.grid__item--border:nth-child(n + 7) {
  border-bottom: none;
}

.width-100 {
  width: 100%;
}

.height-100 {
  height: 100%;
}

.font4 {
  font-size: 4em;
}
</style>