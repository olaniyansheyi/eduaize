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
            @click.stop="selectOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Table -->
    <div
      class="flex flex-col w-full overflow-x-auto overflow-y-auto max-w-full"
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
        v-for="(report, index) in filteredReports"
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
        <NuxtLink
          :to="`/student/${report.id}`"
          class="w-[5%] text-center cursor-pointer relative"
        >
          <button
            class="bg-[#0050AB] rounded-lg px-4 py-1 cursor-pointer text-white text-xs"
          >
            View
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStudentStore } from "~/stores/student";

const studentStore = useStudentStore();

const reports = computed(() => studentStore.studentsAtRiskComputed);

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

const options = ref(["low", "normal", "high", "all"]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const dropdownVisible = ref(null);
const isOpen = ref(false);
definePageMeta({
  layout: "admin",
});

const studentAtRisk = ref([]);

studentAtRisk.value = studentStore.studentsAtRiskComputed;

const selectedOption = ref("all");

const filteredReports = computed(() => {
  if (selectedOption.value === "all") {
    return reports.value;
  }
  return reports.value.filter(
    (report) => report.risk_level.toLowerCase() === selectedOption.value
  );
});

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>
