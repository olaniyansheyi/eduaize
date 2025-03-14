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
    async getStudent(studentId) {
      try {
        const { $supabase } = useNuxtApp();

        // Fetch the student by ID
        const { data, error } = await $supabase
          .from("scores")
          .select("*")
          .match({ id: studentId })
          .single();

        if (error) {
          console.error("Error fetching student:", error);
          return null;
        }

        return data;
      } catch (error) {
        console.error("Unexpected error:", error);
        return null;
      }
    },
    async createStudentScore(studentId, updatedScores) {
      try {
        const { $supabase } = useNuxtApp();

        // ✅ Fetch student using primary key (id)
        const { data: student, error: fetchError } = await $supabase
          .from("scores")
          .select("subjects")
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

        // ✅ Update the subjects object safely
        const updatedSubjects = { ...student.subjects };

        for (const subject of Object.keys(updatedScores)) {
          // Ensure the subject exists
          if (!updatedSubjects[subject]) {
            updatedSubjects[subject] = {
              attendance: { term_1: 0, term_2: 0, term_3: 0 }, // Ensure structure
              term_1_scores: [],
              term_2_scores: [],
              term_3_scores: [],
              average_term_1: 0,
              average_term_2: 0,
              average_term_3: 0,
              teacher_remark: { term_1: "", term_2: "", term_3: "" },
            };
          }

          // ✅ Add term_3_scores dynamically if provided
          if (updatedScores[subject].term_3_scores) {
            updatedSubjects[subject].term_3_scores =
              updatedScores[subject].term_3_scores;
          }

          // ✅ Handle attendance update
          if (updatedScores[subject].attendance) {
            updatedSubjects[subject].attendance.term_3 =
              updatedScores[subject].attendance;
          }

          // ✅ Handle teacher remark update
          if (updatedScores[subject].teacher_remark) {
            updatedSubjects[subject].teacher_remark.term_3 =
              updatedScores[subject].teacher_remark;
          }

          // ✅ Calculate and update average for term 3 if scores exist
          if (updatedSubjects[subject].term_3_scores.length > 0) {
            const total = updatedSubjects[subject].term_3_scores.reduce(
              (acc, score) => acc + score,
              0
            );
            updatedSubjects[subject].average_term_3 =
              total / updatedSubjects[subject].term_3_scores.length;
          }
        }

        // ✅ Update the subjects field in the database
        const { error: updateError } = await $supabase
          .from("scores")
          .update({ subjects: updatedSubjects }) // Update the entire subjects object
          .match({ id: studentId });

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

    async createStudentScore(updatedStudent, id) {
      try {
        const { $supabase } = useNuxtApp();

        // Update only the subjects column
        const { error } = await $supabase
          .from("scores")
          .update({ subjects: updatedStudent.subjects })
          .match({ id: id });

        if (error) {
          console.error("Error updating student:", error);
          return;
        }

        // Fetch the latest student data
        const { data, error: fetchError } = await $supabase
          .from("scores")
          .select("*")
          .match({ id: id })
          .single();

        if (fetchError) {
          console.error("Error fetching updated student:", fetchError);
          return;
        }

        // Find and update student in store
        const index = this.students.findIndex(
          (s) => s.id === updatedStudent.id
        );
        if (index !== -1) {
          this.students[index] = data; // Update with latest student data
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
