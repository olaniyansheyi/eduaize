<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="w-full my-5 flex justify-between items-center">
      <div>
        <h3
          class="Grotesque-Regular text-sm sm:text-lg lg:text-2xl text-[#010109]"
        >
          AI-Generated Performance Reports
        </h3>
      </div>
      <button
        @click="exportData"
        class="bg-[#0050A8] text-white whitespace-nowrap text-xs px-2 md:px-8 rounded-lg py-3 sm:text-sm lg:text-lg"
      >
        Export Report
      </button>
    </div>

    <div class="w-full mt-3 mb-4 flex justify-between items-center">
      <div>
        <h3 class="Grotesque-Regular text-md text-red-500">Student At Risk</h3>
      </div>

      <!-- filter -->
      <div
        class="rounded-lg w-fit h-fit inline-flex items-center justify-center px-3 py-2 border border-grey-200 bg-[#F9F9F9] outline-none hover:bg-green3 relative"
        @click="toggleDropdown"
      >
        <div
          class="flex items-center justify-center cursor-pointer text-white gap-2"
        >
          <img src="~/assets/img/filter.svg" class="w-6" />
          <span class="text-sm capitalize truncate text-black poppinsMedium">
            Filter By
          </span>
        </div>
        <svg
          class="cursor-pointer w-6 md:w-7 dark:fill-white dark:stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
          />
        </svg>

        <ul
          v-if="isOpen"
          class="absolute left-0 top-[100%] w-full bg-white border-[1px] border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
        >
          <li
            v-for="option in options"
            :key="option"
            class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
            @click="selectOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Table -->
    <div
      class="flex flex-col w-full overflow-x-auto overflow-y-auto max-w-full h-[331px]"
    >
      <!-- Header -->
      <div
        class="flex justify-between bg-[#F9F9F9] items-center w-[1000px] px-5 h-[68px]"
      >
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Student Name</h3>
        </div>
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Term</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Risk Level</h3>
        </div>
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">AI Insights</h3>
        </div>
        <div class="w-[5%] text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Action</h3>
        </div>
      </div>

      <!-- Data Rows -->
      <div
        v-for="(report, index) in reports"
        :key="index"
        class="flex justify-between border-b items-center border-b-[#E9E5E5] w-[1000px] h-[68px] px-5 relative"
      >
        <div class="flex-1 text-left">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ report.student_name }}
          </p>
        </div>
        <div class="flex-1 text-left">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ report.term }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <span
            :class="{
              'text-green-600 font-bold': report.risk_level === 'Low',
              'text-yellow-600 font-bold': report.risk_level === 'Medium',
              'text-red-600 font-bold': report.risk_level === 'High',
            }"
          >
            {{ report.risk_level }}
          </span>
        </div>
        <div class="flex-1 text-left">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ report.ai_insights }}
          </p>
        </div>
        <div class="w-[5%] text-center cursor-pointer relative">
          <button
            class="bg-[#0050AB] rounded-lg px-4 py-1 cursor-pointer text-white text-xs"
          >
            View
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination  -->
    <div class="w-full justify-between flex flex-wrap items-center gap-y-5">
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
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer"
        >
          First
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer"
        >
          Previous
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer"
        >
          1
        </button>
        <button
          class="bg-[#0050AB] rounded-lg px-4 py-1 cursor-pointer text-white"
        >
          2
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer"
        >
          ....
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer"
        >
          Next
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer"
        >
          Last
        </button>
        <p class="text-[#737373] Grotesque-Regular text-[14px] lg:ms-2">
          1-10 of 346 Results
        </p>
      </div>

      <!-- Export Button -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const reports = ref([
  {
    id: 1,
    student_name: "John Doe",
    term: "Term 1",
    risk_level: "High",
    ai_insights: "Low math performance detected.",
  },
  {
    id: 2,
    student_name: "Alice Johnson",
    term: "Term 1",
    risk_level: "Medium",
    ai_insights: "Average engagement.",
  },
  {
    id: 3,
    student_name: "Michael Smith",
    term: "Term 1",
    risk_level: "Low",
    ai_insights: "Excellent performance!",
  },
]);

// CSV Export Function

const exportData = () => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Student Name,Term,Risk Level,AI Insights\n" +
    reports.value
      .map(
        (r) =>
          `${r.student_name},${r.term},${r.risk_level},${r.ai_insights.replace(
            /,/g,
            " "
          )}`
      )
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "ai_performance_reports.csv");
  document.body.appendChild(link);
  link.click();
};

const selectedOption = ref("all");
const options = ref(["pass", "fail", "Top student", "all"]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};

const dropdownVisible = ref(null);
const isOpen = ref(false);
definePageMeta({
  layout: "admin",
});
</script>
