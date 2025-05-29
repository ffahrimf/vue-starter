import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { useDecrypt } from "./composable/use-helper";
import { State } from "./interface/store.interface";

export const mainStore = defineStore("main", {
  state: (): State => ({
    mode: import.meta.env.MODE,
    token: useDecrypt(Cookies.get("hAS-aTH")),
    role: useDecrypt(Cookies.get("as-starter")),
    guid: useDecrypt(Cookies.get("glbl-unq-hr")),
    manager: useDecrypt(Cookies.get("aprvl-ln")),
    id_table: null,
    profile: null,
    permissions: [],
    placement: null,
    expand: true,
    isErr: false,
    dataErr: null,
    isOffline: true,
    isTimeout: false,
    ua: null,
    ip: null,
    device: "",
    splash: true,
    isMobile: false
  }),
  getters: {
    isAuthenticated: (state: State): boolean =>
      state.token !== null && state.token !== undefined
  }
});
