<template>
  <div
    class="w-full items-start justify-start flex my-20 mx-4 gap-y-10 flex-col pb-10"
  >
    <div class="w-full">
      <h3 class="Grotesque-Regular text-md text-[#010109]">
        Grades and Attendance Upload
      </h3>
      <p class="Grotesque-Regular text-[14px] text-[#737373]">
        Decide your prefered method of Uploading Grades
      </p>
    </div>
    <div
      class="w-full lg:w-[60%] flex justify-between items-center flex-wrap md:flex-nowrap gap-y-5"
    >
      <div class="flex gap-x-2 justify-center items-center">
        <input
          name="security"
          type="radio"
          id="individual"
          value="individual"
          v-model="selectedTab"
          class="custom-radio"
        />
        <p class="Grotesque-Regular text-[14px] text-[#737373]">
          Upload individual Student
        </p>
      </div>

      <div class="flex gap-x-2 justify-center items-center">
        <input
          name="security"
          type="radio"
          id="bulk"
          value="bulk"
          v-model="selectedTab"
          class="custom-radio"
        />
        <p class="Grotesque-Regular text-[14px] text-[#737373]">
          Bulk Upload with Excel file
        </p>
      </div>
    </div>

    <!-- upload individually -->
    <div
      v-if="selectedTab === 'individual'"
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
    >
      <div class="w-full mt-8 mb-4 flex justify-between gap-x-2 items-center">
        <div>
          <h3 class="Grotesque-Regular text-md text-[#010109]">
            Upload new Grades
          </h3>
          <p class="Grotesque-Regular text-[14px] text-[#737373]">
            This Grade will be recorded for the current term
          </p>
        </div>

        <!-- ✅ Updated: Call uploadStudentData on click -->
        <!-- <button
          @click="uploadStudentData"
          :disabled="isLoading"
          class="bg-[#0050A8] text-white whitespace-nowrap text-xs px-3 md:px-8 rounded-lg py-3 md:text-md"
        >
          <span v-if="!isLoading">Save and Publish</span>
          <span v-else>Saving...</span>
        </button> -->
      </div>

      <div>
        <h1 class="Grotesque-Regular text-md text-[#737373]">
          List Subjects Assigned To You
        </h1>

        <div
          class="w-full flex justify-center items-start gap-8 flex-wrap lg:flex-nowrap"
        >
          <form class="w-full lg:w-[45%] flex flex-col gap-y-4">
            <div class="w-full flex flex-wrap gap-x-5">
              <div
                v-for="subject in [
                  'Math',
                  'English',
                  'Physics',
                  'History',
                  'Biology',
                ]"
                :key="subject"
                class="lg:w-auto w-[46%]"
              >
                <label class="Grotesque-Regular text-md text-[#010109]">{{
                  subject
                }}</label>
                <input
                  v-model="studentScores[subject]"
                  type="text"
                  class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
                  placeholder="Grade/100"
                />
              </div>
            </div>

            <div
              class="w-full flex justify-between items-center sm:gap-x-0 gap-x-5"
            >
              <div>
                <label class="Grotesque-Regular text-md text-[#010109]"
                  >Student ID</label
                >
                <input
                  v-model="selectedStudentId"
                  type="text"
                  class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
                />
              </div>
              <div>
                <label class="Grotesque-Regular text-md text-[#010109]"
                  >Remark</label
                >
                <input
                  v-model="remark"
                  type="text"
                  class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
                />
              </div>
            </div>
          </form>

          <!-- Attendance Section -->
          <div class="w-full lg:w-[45%] text-left">
            <h3 class="Grotesque-Regular text-md text-[#010109] mb-4">
              Attendance
            </h3>
            <div class="bg-[#F9F9FA] rounded-lg p-5 text-left">
              <h4 class="Grotesque-Regular text-[14px] text-[#737373] mb-5">
                List of weeks in a Term
              </h4>
              <div
                class="w-full flex flex-col items-start justify-start gap-y-6"
              >
                <div class="flex flex-col gap-y-2 justify-center items-start">
                  <span
                    v-for="week in termWeeks"
                    :key="week"
                    class="flex gap-x-2 justify-center items-center"
                  >
                    <input
                      type="checkbox"
                      class="custom-checkbox"
                      v-model="selectedWeeks"
                      :value="week"
                    />
                    <h4 class="Grotesque-Regular text-[14px] text-[#737373]">
                      Week {{ week }}
                    </h4>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button @click="createStudent" :disabled="isLoading">
          {{ isLoading ? "Saving..." : "Save Scores" }}
        </button>
      </div>
    </div>
    <!-- upload in bulk -->

    <div v-if="selectedTab === 'bulk'">
      <div
        v-if="selectedTab === 'bulk'"
        `
        class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center mt-10 gap-y-5 pb-10"
      >
        <div class="w-full mt-8 mb-4 flex justify-between gap-x-2 items-center">
          <div>
            <h3 class="Grotesque-Regular text-md text-[#010109]">
              Upload new Grades
            </h3>
            <p class="Grotesque-Regular text-[14px] text-[#737373]">
              This Grade will be recorded for the current term
            </p>
          </div>
        </div>
      </div>

      <!-- file drop upload  -->

      <div
        class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 py-5 flex flex-col items-center justify-center my-10 gap-y-5"
        @dragover.prevent
        @dragenter.prevent
        @drop="handleDrop"
      >
        <div
          class="w-full flex flex-col items-center justify-center gap-y-3 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
          @click="triggerFileInput"
        >
          <p class="Grotesque-Regular text-[14px] text-[#737373]">
            Drag & Drop your file here or
            <span class="text-[#0050A8] font-bold">click to upload</span>
            (Your file must be in excell format)
          </p>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileSelect"
            multiple
          />
        </div>

        <!-- Display Selected Files -->
        <div v-if="selectedFiles.length > 0" class="w-full mt-4">
          <h3 class="Grotesque-Regular text-md text-[#010109] mb-2">
            Selected Files:
          </h3>
          <ul class="list-disc pl-5">
            <li
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="text-[#737373] text-[14px]"
            >
              {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
            </li>
          </ul>
        </div>

        <!-- Upload Button -->
        <button
          v-if="selectedFiles.length > 0"
          @click="uploadFiles"
          class="bg-[#0050A8] text-white px-5 py-2 rounded-lg text-sm mt-4"
        >
          Upload Files
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStudentStore } from "~/stores/student";
import { useToast } from "vue-toastification";

const selectedTab = ref("individual");
const termWeeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const selectedStudentId = ref("");
const studentScores = ref({});
const remark = ref("");
const selectedWeeks = ref([]);
const isLoading = ref(false);

definePageMeta({
  layout: "teacher",
});

// drag and drop implementation

const selectedFiles = ref([]);
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  selectedFiles.value = [...event.target.files];
};

const handleDrop = (event) => {
  event.preventDefault();
  selectedFiles.value = [...event.dataTransfer.files];
};

const uploadFiles = () => {
  if (selectedFiles.value.length === 0) return alert("No files selected!");

  // Simulate file upload
  console.log("Uploading files:", selectedFiles.value);
  alert(`${selectedFiles.value.length} file(s) uploaded successfully!`);

  // Clear selected files after upload
  selectedFiles.value = [];
};

const toast = useToast();
const studentStore = useStudentStore();

// ✅ Function to upload student data
const uploadStudentData = async () => {
  if (!selectedStudentId.value) {
    toast.error("Please enter a valid Student ID.");
    return;
  }

  if (Object.keys(studentScores.value).length === 0) {
    toast.error("Please enter at least one subject score.");
    return;
  }

  isLoading.value = true;

  // ✅ Format student scores for term_3_scores
  const formattedScores = {};
  for (const subject in studentScores.value) {
    formattedScores[subject] = {
      term_3_scores: [parseFloat(studentScores.value[subject]) || 0], // Convert to number
    };
  }

  // ✅ Include attendance (/12)
  formattedScores["attendance"] = {
    term_3_scores: [`${selectedWeeks.value.length}/12`],
  };

  // ✅ Call the function in the store
  try {
    await studentStore.createStudentScore(
      selectedStudentId.value,
      formattedScores
    );
    toast.success("Scores updated successfully!");
  } catch (error) {
    toast.error("Error updating scores.");
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const createStudent = async () => {
  try {
    isLoading.value = true;

    const newStudent = {
      student_details: {
        studentId: selectedStudentId.value,
      },
      subjects: {},
      attendance: {
        term_3: selectedWeeks.value.length,
      },
      teacher_remark: {
        term_3: remark.value,
      },
      created_at: new Date().toISOString(),
    };

    // Assign subject scores
    for (const subject of [
      "Math",
      "English",
      "Physics",
      "History",
      "Biology",
    ]) {
      newStudent.subjects[subject] = {
        term_3_scores: [parseFloat(studentScores.value[subject]) || 0],
      };
    }

    await studentStore.createStudentScore(newStudent, selectedStudentId.value);
    toast.success("Student scores saved successfully!");
  } catch (error) {
    toast.error("Error saving scores.");
    console.error("Error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.custom-checkbox {
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: white;
  border: 1px solid #666666;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #47b86e;
  border-color: #47b86e;
}

.custom-checkbox:checked::after {
  content: "✔";
  color: white;
  font-size: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
