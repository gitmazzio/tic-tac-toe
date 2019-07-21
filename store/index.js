import vuex from 'vuex'

const createStore = () => {
  return new vuex.Store({
    state: {
      gameNumber: 0
    },
    mutations: {
      incrementGame(state) {
        state.gameNumber++
      }
    },
    getters: {
      getGameNumber(state) {
        return state.gameNumber;
      }
    }
  });
}

export default createStore;
