import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
