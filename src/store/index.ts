// @ts-nocheck
// import { createStore, createLogger } from 'vuex'
// import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex';
import chats from './chats'
import brands from './brands'

/* const vuexPersist = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: (state) => ({
    bots: state.bots,
    notify: state.notify
  })
})
var plugins = [vuexPersist.plugin]
if (debug){
  var plugins = [createLogger(), vuexPersist.plugin]
} */
const store = createStore({
  modules: {
    chats,
    brands,
  },
});

export default store;