import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teacher", {
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
