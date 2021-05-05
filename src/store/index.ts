import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import type { Transaction } from '../utils/api/transactions';
import type { Category } from '../utils/api/categories';
import type { Currency } from '../utils/api/currency';
import { LANGS } from '../utils/constants';
import api from '../utils/api';

export interface User {
  pk: number,
  email: string,
}

interface State {
  language: LANGS,
  token: string|null,
  user: User|null,
  categories: Category[],
  currencies: Currency[],
  templates: Transaction[],
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
      categories: [],
      currencies: [],
      templates: [],
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
    setCategories (state, value: Category[]) {
      state.categories = value;
    },
    setCurrencies (state, value: Currency[]) {
      state.currencies = value;
    },
    setTemplates (state, value: Transaction[]) {
      state.templates = value;
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
    async changeTemplates (context) {
      const templates = await api.transactions.read({ isTemplate: true });
      context.commit('setTemplates', templates);
    },
    async changeCategories (context) {
      const categories = await api.category.read();
      context.commit('setCategories', categories);
    },
    async initStore (context) {
      const [categories, currencies, templates] = await Promise.all([
        api.category.read(),
        api.currencies.read(),
        api.transactions.read({ isTemplate: true }),
      ]);
      context.commit('setCurrencies', currencies);
      context.commit('setCategories', categories);
      context.commit('setTemplates', templates);
    },
  },
});

const useStore = () => baseUseStore(injectionKey);
export default useStore;
