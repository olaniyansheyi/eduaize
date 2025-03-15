import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", {
  // Data
  state: () => ({
    teachers: [],
  }),
  actions: {
    async getTeachers() {
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase.from("teachers").select("*");

        if (error) {
          console.error("supabase error", error);
        } else {
          this.teachers = data || [];
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  },
});
