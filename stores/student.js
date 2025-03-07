import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  // Data
  state: () => ({
    students: [],
  }),
  actions: {
    async getStudents() {
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase.from("scores").select("*");

        if (error) {
          console.error("supabase error", error);
        } else {
          this.students = data || [];
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  },
});
