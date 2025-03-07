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
    async editStudent(updatedStudent) {
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase
          .from("scores")
          .update(updatedStudent)
          .match({ id: updatedStudent.id });
        if (error) {
          console.error("Error updating student", error);
        } else {
          const index = this.students.findIndex(
            (s) => s.id === updatedStudent.id
          );
          if (index !== -1) {
            this.students[index] = data[0];
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },

    async deleteStudent(studentId) {
      try {
        const { $supabase } = useNuxtApp();
        const { error } = await $supabase
          .from("scores")
          .delete()
          .match({ id: studentId });
        if (error) {
          console.error("Error deleting student", error);
        } else {
          this.students = this.students.filter(
            (student) => student.id !== studentId
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  },
});
