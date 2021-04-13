import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { LANGS } from '../utils/constants';

export interface User {
  pk: number,
  email: string,
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
      if (value) {
        localStorage.setItem('les-frais-language', value);
      } else {
        localStorage.removeItem('les-frais-language');
      }
    },
    setToken (state, value: string) {
      state.token = value;
      if (value) {
        localStorage.setItem('les-frais-token', value);
      } else {
        localStorage.removeItem('les-frais-token');
      }
    },
    setUser (state, value: User) {
      state.user = value;
    },
  },
  actions: {
    changeLang (context, value: LANGS) {
      context.commit('setLang', value);
    },
    changeToken (context, value: string) {
      context.commit('setToken', value);
    },
    changeUser (context, value: User) {
      context.commit('setUser', value);
    },
  },
});

const useStore = () => baseUseStore(injectionKey);
export default useStore;