import { defineStore } from "pinia";
// import { analyzeStudentRisk } from "~/services/aiServices";

export const useStudentStore = defineStore("student", {
  // Data
  state: () => ({
    students: [],
    studentsAtRisk: [],
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

    async createStudentScore(studentId, scores, remark) {
      try {
        const { $supabase } = useNuxtApp();

        // Fetch the current student data using student_details.studentId
        const { data, error } = await $supabase
          .from("scores")
          .select("subjects")
          .match({ "student_details->>studentId": studentId }) // Query using JSON field
          .single();

        if (error) {
          console.error("Error fetching student data:", error);
          return;
        }

        // Clone the subjects object
        let updatedSubjects = { ...data.subjects };

        // Update term_3_scores and teacher_remark in each subject
        for (const subject in scores) {
          if (updatedSubjects[subject]) {
            updatedSubjects[subject].term_3_scores = scores[subject]
              .split(",")
              .map(Number);

            // Store teacher remark inside each subject
            if (!updatedSubjects[subject].teacher_remark) {
              updatedSubjects[subject].teacher_remark = {};
            }
            updatedSubjects[subject].teacher_remark.term_3 = remark;
          }
        }

        // Update student record in Supabase
        const { error: updateError } = await $supabase
          .from("scores")
          .update({
            subjects: updatedSubjects,
          })
          .match({ "student_details->>studentId": studentId });

        if (updateError) {
          console.error("Error updating student:", updateError);
          return;
        }

        console.log("Student scores updated successfully!");
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  },

  getters: {
    studentsAtRiskComputed: (state) => {
      return state.students
        .map((student) => {
          let totalScore = 0;
          let subjectCount = 0;

          for (const subject in student.subjects) {
            const subjectData = student.subjects[subject];

            // Consider Term 1 and Term 2
            if (subjectData.term_1_scores) {
              totalScore += subjectData.term_1_scores.reduce(
                (a, b) => a + b,
                0
              );
              subjectCount += subjectData.term_1_scores.length;
            }

            if (subjectData.term_2_scores) {
              totalScore += subjectData.term_2_scores.reduce(
                (a, b) => a + b,
                0
              );
              subjectCount += subjectData.term_2_scores.length;
            }

            // Optional: Include Term 3 if available
            if (
              subjectData.term_3_scores &&
              subjectData.term_3_scores.length > 0
            ) {
              totalScore += subjectData.term_3_scores.reduce(
                (a, b) => a + b,
                0
              );
              subjectCount += subjectData.term_3_scores.length;
            }
          }

          const averageScore = subjectCount > 0 ? totalScore / subjectCount : 0;

          // Determine risk level
          let riskLevel = "Low";
          if (averageScore < 40) riskLevel = "High";
          else if (averageScore < 60) riskLevel = "Medium";

          return averageScore < 60
            ? {
                id: student.id, // Real student ID from the database
                student_name: student.student_details.name,
                term: "Term 1 & Term 2", // Indicates the terms used
                risk_level: riskLevel,
                ai_insights:
                  averageScore < 40
                    ? "Critical performance drop."
                    : "Needs improvement.",
              }
            : null;
        })
        .filter(Boolean);
    },
  },
});
