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
    async createStudentScore(studentId, updatedScores) {
      try {
        const { $supabase } = useNuxtApp();

        // ✅ Fetch student using primary key (id)
        const { data: student, error: fetchError } = await $supabase
          .from("scores")
          .select("*")
          .match({ id: studentId }) // Match by primary key
          .single();

        if (fetchError) {
          console.error("Error fetching student:", fetchError);
          return;
        }

        if (!student) {
          console.error("Student not found");
          return;
        }

        // ✅ Create an updated object
        const updatedStudentData = {};

        for (const subject of Object.keys(updatedScores)) {
          // Ensure subject exists
          if (!student[subject]) {
            student[subject] = {}; // Initialize subject if it doesn't exist
          }

          // ✅ Add term_3_scores to each subject dynamically
          updatedStudentData[subject] = {
            ...student[subject], // Preserve existing data
            term_3_scores: updatedScores[subject].term_3_scores || [], // Add new scores
          };
        }

        // ✅ Update student scores in the database
        const { error: updateError } = await $supabase
          .from("scores")
          .update(updatedStudentData)
          .match({ id: studentId }); // Use primary key

        if (updateError) {
          console.error("Error updating student scores:", updateError);
          return;
        }

        console.log("Student scores updated successfully!");
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },

    async editStudent(updatedStudent) {
      try {
        const { $supabase } = useNuxtApp();

        // Update student
        const { error } = await $supabase
          .from("scores")
          .update(updatedStudent)
          .match({ id: updatedStudent.id });

        if (error) {
          console.error("Error updating student:", error);
          return;
        }

        // Fetch the updated student to get the latest data
        const { data, error: fetchError } = await $supabase
          .from("scores")
          .select("*")
          .match({ id: updatedStudent.id })
          .single(); // Get single object instead of array

        if (fetchError) {
          console.error("Error fetching updated student:", fetchError);
          return;
        }

        // Find and update student in store
        const index = this.students.findIndex(
          (s) => s.id === updatedStudent.id
        );
        if (index !== -1) {
          this.students[index] = data; // Directly assign object (not data[0])
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },

    async createStudent(newStudent) {
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase
          .from("scores")
          .insert(newStudent)
          .select();

        if (error) {
          console.error("Error creating student", error);
        } else {
          this.students.push(data[0]);
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
