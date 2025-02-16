import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  // Data
  state: () => ({
    openSearch: false,
  }),
  actions: {
    handleToggleSearch() {
      this.openSearch = !this.openSearch;
    },
  },
});
