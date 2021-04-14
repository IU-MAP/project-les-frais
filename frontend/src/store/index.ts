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

/**
 * A key that is needed to access the store in a form of useStore() hook in the
 * setup() function of every component.
 */
// eslint-disable-next-line symbol-description
export const injectionKey: InjectionKey<Store<State>> = Symbol();

/**
 * Global store with the state that is commonly used throughout many
 * components in the project.
 */
export const store = createStore<State>({
  /**
   * Store state. Has persistent data about user-chosen language, token,
   * currency and additional information that could be shared between components.
   */
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
