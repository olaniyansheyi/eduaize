<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="w-full mt-3 mb-4 flex justify-between items-center">
      <div>
        <h3 class="Grotesque-Regular text-md text-[#010109]">Database</h3>
      </div>

      <!-- filter -->

      <div
        class="rounded-lg w-fit h-fit inline-flex items-center justify-center px-3 py-2 border border-grey-200 bg-[#F9F9F9] outline-none hover:bg-green3 relative"
        @click="toggleDropdown"
      >
        <div
          class="flex items-center justify-center cursor-pointer text-white gap-2"
        >
          <img src="~/assets/img/filter.svg" class="w-3" />
          <span class="text-xs capitalize truncate text-black poppinsMedium">
            Filter By: {{ selectedOption }}
          </span>
        </div>
        <svg
          class="cursor-pointer w-6 md:w-7 dark:fill-white dark:stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
          />
        </svg>

        <ul
          v-if="isOpenFilter"
          class="absolute left-0 top-[100%] w-full bg-white border-[1px] border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
        >
          <li
            v-for="option in options"
            :key="option"
            class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
            @click.stop="selectOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>

    <!-- table element -->
    <div
      class="flex flex-col w-full overflow-x-auto overflow-y-auto max-w-full h-[331px] gap-y-4"
    >
      <!-- Header -->
      <div
        class="flex justify-between bg-[#F9F9F9] items-center w-[1000px] px-5 h-[68px] py-4"
      >
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Student Name</h3>
        </div>
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Score</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">classs</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Grade</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Pass / Fail</h3>
        </div>
        <div class="w-[5%] text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Action</h3>
        </div>
      </div>

      <!-- Row with dropdown -->
      <div
        v-for="(student, index) in filteredStudents"
        :key="index"
        class="flex justify-between border-b items-center border-b-[#E9E5E5] w-[1000px] px-5 relative py-2"
      >
        <div class="flex-1 my-3 text-left">
          <div class="flex w-full justify-start items-center gap-x-3">
            <img
              src="~/assets/img/person.png"
              class="w-[28px] rounded-full"
              lt=""
            />
            <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
              {{ student.name }}
            </p>
          </div>
        </div>
        <div class="flex-1 text-left">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ student.average }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ student.class }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ student.grade }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <button
            :class="[
              'py-1 px-8 rounded-lg text-[14px]',
              student.status === 'Fail' ? 'fail-btn' : 'pass-btn',
            ]"
          >
            {{ student.status }}
          </button>
        </div>
        <div class="w-[4%] text-center cursor-pointer relative">
          <img
            src="~/assets/img/icons/dotted-menu.png"
            alt="Menu"
            @click="toggleDropdownDelete(index)"
          />
          <!-- action modal -->
          <div
            v-if="dropdownVisible === index"
            class="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-[120px] py-2 z-10 Px-4"
          >
            <button
              class="block w-full text-left px-4 py-2 text-[#C9252D] hover:bg-gray-100 text-xs"
              @click="openDeleteRoleModal"
            >
              Delete Student
            </button>
            <button
              class="block w-full text-left px-4 py-2 text-[#0050A8] hover:bg-gray-100 text-xs"
              @click="openCreateStudentModal(teacher)"
            >
              Create Student
            </button>
            <button
              class="block w-full text-left px-4 py-2 text-[#0050A8] hover:bg-gray-100 text-xs"
              @click="openEditStudentModal(teacher)"
            >
              Edit Student
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- paginations buttons -->

    <div
      class="w-full justify-between flex flex-wrap items-center gap-y-5 mt-5"
    >
      <div class="flex justify-center items-center gap-x-4">
        <p class="text-[#737373] Grotesque-Regular text-[14px]">
          Rows per page
        </p>
        <select
          class="w-[64px] h-[32px] border-[1px] border-[#E9E5E5] rounded-lg outline-none px-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      <div class="flex justify-start items-center gap-x-1 flex-wrap gap-y-5">
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          First
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          Previuos
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          1
        </button>
        <button
          class="bg-[#0050AB] rounded-lg px-4 py-1 cursor-pointer text-white Grotesque-Regular text-[14px]"
        >
          2
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          ....
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          Next
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          Last
        </button>
        <p class="text-[#737373] Grotesque-Regular text-[14px] lg:ms-2">
          1-10 of 346 Results
        </p>
      </div>
    </div>

    <!-- modal for delete user -->

    <Modal v-model="isDeleteRoleModalOpen">
      <div class="flex flex-col gap-y-4 justify-center items-center w-full">
        <div class="flex flex-col gap-y-1 justify-center items-center">
          <img src="~/assets/img/unknown-user.png" alt="" />
          <h2 class="text-[#1A1A1A] Grotesque-Regular">Delete Student?</h2>
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            All data will be permanently lost
          </p>
        </div>
        <div class="flex flex-col gap-y-1 justify-center items-center w-full">
          <button
            @click="closeModal"
            class="bg-[#EF3333] py-2 w-full text-white rounded-lg Grotesque-Regular"
          >
            Yes, please
          </button>

          <button
            @click="closeModal"
            class="bg-none py-2 w-full text-[#4B4B4B] Grotesque-Regular"
          >
            No, dont
          </button>
        </div>
      </div>
    </Modal>

    <!-- Create/Edit Student Modal -->
    <Modal v-model="isStudentModalOpen">
      <div class="flex flex-col gap-y-4 justify-center items-center w-full">
        <h2 class="text-[#1A1A1A] Grotesque-Regular">
          {{ isEditMode ? "Edit Student" : "Create Student" }}
        </h2>
        <form class="w-full lg:w-[45%] flex flex-col gap-y-4">
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Student Name</label
            >
            <input
              type="text"
              v-model="editStudentData.name"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Score</label
            >
            <input
              type="text"
              v-model="editStudentData.score"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Submitted</label
            >
            <input
              type="text"
              v-model="editStudentData.submitted"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Grade</label
            >
            <input
              type="text"
              v-model="editStudentData.grade"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Upload Avatar</label
            >
            <input
              type="file"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <button
            @click="closeStudentModal"
            class="bg-[#0050A8] py-2 w-full text-white rounded-lg"
          >
            {{ isEditMode ? "Update Student" : "Create Student" }}
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { useStudentStore } from "~/stores/student";

const studentStore = useStudentStore();
const isOpenFilter = ref(false);

const selectedOption = ref("all");
const options = ref(["pass", "fail", "Top student", "all"]);

const toggleDropdown = () => {
  isOpenFilter.value = !isOpenFilter.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpenFilter.value = !isOpenFilter.value;
};

const dropdownVisible = ref(null);

const isDeleteRoleModalOpen = ref(false);
const openDeleteRoleModal = () => {
  isDeleteRoleModalOpen.value = true;
  dropdownVisible.value = null;
};

const toggleDropdownDelete = (index) => {
  dropdownVisible.value = dropdownVisible.value === index ? null : index;
};

const isStudentModalOpen = ref(false);
const isEditMode = ref(false);
const editStudentData = ref({
  name: "",
  score: "",
  submitted: "",
  grade: "",
  image: null,
});

const openCreateStudentModal = () => {
  isEditMode.value = false;
  editStudentData.value = {
    name: "",
    score: "",
    submitted: "",
    grade: "",
    image: null,
  };
  isStudentModalOpen.value = true;
};

const openEditStudentModal = (student) => {
  isEditMode.value = true;
  editStudentData.value = { ...student };
  isStudentModalOpen.value = true;
};

const closeStudentModal = () => {
  isStudentModalOpen.value = false;
};

const closeModal = () => {
  isDeleteRoleModalOpen.value = false;
};

// Function to compute student details
const students = computed(() => {
  return studentStore.students.map((student) => {
    // Calculate average score
    const subjectAverages = Object.values(student.subjects).map(
      (subj) => (subj.average_term_1 + subj.average_term_2) / 2
    );
    const totalAverage =
      subjectAverages.reduce((acc, avg) => acc + avg, 0) /
      subjectAverages.length;

    return {
      name: student.student_details.name,
      class: student.student_details.class,
      average: totalAverage.toFixed(2),
      grade: getGrade(totalAverage),
      status: totalAverage >= 40 ? "Pass" : "Fail",
      image: student.image || "~/assets/img/person.png",
    };
  });
});

// Function to determine grade
const getGrade = (avg) => {
  if (avg >= 90) return "A+";
  if (avg >= 80) return "A";
  if (avg >= 70) return "B";
  if (avg >= 60) return "C";
  if (avg >= 50) return "D";
  return "F";
};

// Computed property to filter students
const filteredStudents = computed(() => {
  if (selectedOption.value.toLowerCase() === "pass") {
    return students.value.filter((s) => s.status.toLowerCase() === "pass");
  }
  if (selectedOption.value.toLowerCase() === "fail") {
    return students.value.filter((s) => s.status.toLowerCase() === "fail");
  }
  if (selectedOption.value.toLowerCase() === "top student") {
    return students.value.filter((s) => parseFloat(s.average) >= 80);
  }
  return students.value; // Show all
});
</script>
