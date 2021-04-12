/* eslint-disable no-param-reassign */
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { LANGS } from '../utils/constants';

interface State {
  language: LANGS,
}

// eslint-disable-next-line symbol-description
export const injectionKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state () {
    return {
      language: LANGS.ENG,
    };
  },
  mutations: {
    setLang (state, value: LANGS) {
      state.language = value;
    },
  },
  actions: {
    changeLang (context, value: LANGS) {
      context.commit('setLang', value);
    },
  },
});

const useStore = () => baseUseStore(injectionKey);
export default useStore;
