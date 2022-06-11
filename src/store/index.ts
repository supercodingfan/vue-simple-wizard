import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseStore } from "vuex";

const INITIAL_STATE = {
  user: {
    name: "",
    age: 0,
    country: "",
    packageType: "",
  },
  countries: [
    {
      id: "hk",
      name: "Hong Kong",
    },
    {
      id: "us",
      name: "USA",
    },
    {
      id: "au",
      name: "Australia",
    },
  ],
  currencies: [
    {
      id: "hk",
      name: "HKD",
      rate: 1,
    },
    {
      id: "us",
      name: "USD",
      rate: 2,
    },
    {
      id: "au",
      name: "AUD",
      rate: 3,
    },
  ],
  packages: [
    {
      id: "standard",
      name: "Standard",
      rate: 0,
    },
    {
      id: "safe",
      name: "Safe",
      rate: 0.5,
    },
    {
      id: "super_safe",
      name: "Super Safe",
      rate: 0.75,
    },
  ],
};

export interface State {
  user: {
    name: string;
    age: number;
    country: string;
    packageType: string;
  };
  countries: { id: string; name: string }[];
  currencies: { id: string; name: string; rate: number }[];
  packages: { id: string; name: string; rate: number }[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return INITIAL_STATE;
  },
  getters: {},
  mutations: {
    addUserInfo: (state, user) => {
      state.user = user;
    },
    initUser: (state) => {
      state.user = INITIAL_STATE.user;
    },
  },
  actions: {
    addUserInfo: ({ commit }, payload) => {
      commit("addUserInfo", payload);
    },
  },
});

export const useStore = () => {
  return baseStore(key);
};
