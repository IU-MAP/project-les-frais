import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { LANGS } from '../utils/constants';

export interface User {
  pk: number,
}

interface State {
  language: LANGS,
  token: string|null,
  user: User|null,
}

// eslint-disable-next-line symbol-description
export const injectionKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state () {
    return {
      language: (localStorage?.getItem('les-frais-language') as LANGS|undefined) || LANGS.ENG,
      token: (localStorage?.getItem('les-frais-token') as string|undefined) || null,
      user: null,
    };
  },
  mutations: {
    setLang (state, value: LANGS) {
      state.language = value;
      localStorage.setItem('les-frais-language', value);
    },
    setToken (state, value: string) {
      state.token = value;
      localStorage.setItem('les-frais-token', value);
    },
  },
  actions: {
    changeLang (context, value: LANGS) {
      context.commit('setLang', value);
    },
    changeToken (context, value: string) {
      context.commit('setToken', value);
    },
  },
});

const useStore = () => baseUseStore(injectionKey);
export default useStore;
