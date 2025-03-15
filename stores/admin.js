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

    async deleteTeacher(teacherId) {
      try {
        const { $supabase } = useNuxtApp();
        const { error } = await $supabase
          .from("teachers")
          .delete()
          .match({ id: teacherId });

        if (error) {
          console.error("Error deleting teacher:", error);
        } else {
          // Remove the teacher from local state
          this.teachers = this.teachers.filter(
            (teacher) => teacher.id !== teacherId
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },

    async editTeacher(updatedTeacher) {
      try {
        const { $supabase } = useNuxtApp();
        const { error } = await $supabase
          .from("teachers")
          .update(updatedTeacher)
          .match({ id: updatedTeacher.id });

        if (error) {
          console.error("Error updating teacher:", error);
        } else {
          // Update the local state
          this.teachers = this.teachers.map((teacher) =>
            teacher.id === updatedTeacher.id
              ? { ...teacher, ...updatedTeacher }
              : teacher
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  },
});
