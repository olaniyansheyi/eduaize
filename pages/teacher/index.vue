<template>
  <div>
    <!-- Teacher details section  -->
    <div
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
    >
      <div
        class="w-full mt-3 mb-4 flex justify-start flex-col gap-y-6 items-center"
      >
        <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
          Teacher Details
        </h3>
        <div
          class="w-full flex justify-start items-start lg:gap-x-12 gap-x-5 lg:flex-nowrap flex-wrap gap-y-4"
        >
          <img :src="personImg" class="w-[80px] h-[80px] rounded-full" alt="" />
          <div class="h-full flex justify-start items-start flex-col gap-y-2">
            <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
              john Anetor
            </h3>
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">ID</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                ID: 2020-0001
              </h3>
            </div>
          </div>
          <div class="mt-auto sm:ms-auto lg:ms-0">
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">Number</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                +2348135158754
              </h3>
            </div>
          </div>
          <div class="mt-auto">
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">Email</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                olaniyansheyi1704@gmail.com
              </h3>
            </div>
          </div>
          <div class="mt-auto sm:ms-auto lg:ms-0">
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">Address</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                123 Elim Street
              </h3>
            </div>
          </div>
        </div>

        <div
          class="w-full flex justify-between items-start flex-wrap gap-5 mt-4"
        >
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div
              class="flex justify-start items-start flex-col gap-y-1 me-auto"
            >
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div
              class="flex justify-start items-start flex-col gap-y-1 me-auto"
            >
              <p class="text-[#010109] text-sm">5</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal subject Assigned
              </h3>
            </div>
          </div>
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div
              class="flex justify-start items-start flex-col gap-y-1 me-auto"
            >
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div
              class="flex justify-start items-start flex-col gap-y-1 me-auto"
            >
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5 ms-auto">
      <div
        class="select-container w-[10.5rem] ms-auto"
        :class="isOpenFilterChart ? ' h-[10.5rem]' : ''"
      >
        <div
          class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between cursor-pointer relative mb-2 mt-1"
          @click="toggleDropdown"
        >
          <span>{{ selectedOption }}</span>
          <img src="~/assets/img/icons/selectdown.png" class="" />
        </div>

        <ul
          v-if="isOpenFilterChart"
          class="absolute left-0 top-[35%] w-full bg-white border-[1px] border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
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

    <!-- student data display with charts  -->

    <div
      class="w-full my-5 flex justify-start lg:justify-between items-start flex-wrap gap-8 gap-y-12 px-4 sm:px-10"
    >
      <div class="w-full sm:w-[80%] lg:w-[60%]">
        <ChartBar :chartData="chartDataBar" :chartOptions="chartOptionsBar" />
      </div>
      <div class="w-full sm:w-[80%] lg:w-[30%]">
        <ChartPie :chartData="chartDataPie" :chartOptions="chartOptionsPie" />
      </div>
    </div>

    <!-- student at risk risk  -->

    <StudentAtRiskList />

    <!-- student database table  -->
    <StudentsTable />
    <!-- student database table  -->
  </div>
</template>

<script setup>
// temporal data for the roles

import personImg from "~/assets/img/person.png";

definePageMeta({
  layout: "teacher",
});

const isOpen = ref(false);

onMounted(() => {
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".relative")) {
      isOpen.value = false;
    }
  });
});

// chart data

const chartDataBar = ref({
  labels: ["Alice", "Bob", "Charlie", "David", "Eve"],
  datasets: [
    {
      label: "Grades",
      data: [85, 72, 90, 78, 92],
      backgroundColor: "#F7F7F7", // Base color for full height
      borderRadius: 10, // Rounded tops
      barPercentage: 0.4, // Slim bars
      categoryPercentage: 0.7, // Space between bars
    },
    {
      label: "Actual Grades",
      data: [85, 72, 90, 78, 92],
      backgroundColor: "#0050AB", // Main color on top
      borderRadius: 10,
      barPercentage: 0.4,
      categoryPercentage: 0.7,
    },
  ],
});

// Dynamic Chart Options
const chartOptionsBar = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { display: false } },
  },
  plugins: {
    legend: { display: false },
  },
});

// chart option

const chartDataPie = ref({
  labels: ["A (80-100)", "B (70-79)", "C (60-69)", "D (50-59)", "F (<50)"],
  datasets: [
    {
      label: "Grade Distribution",
      data: [2, 1, 8, 4, 2], // You can modify this dynamically
      backgroundColor: [
        "#0050AB", // Blue
        "#6495ED", // Lighter Blue
        "#28A745", // Success Green
        "#FFA726", // Orange (For D)
        "#DC3545",
      ],
      borderWidth: 5,
      borderColor: "#ffffff",
      borderRadius: 10,
    },
  ],
});

// Dynamic Chart Options
const chartOptionsPie = ref({
  responsive: true,
  cutout: "60%",
  plugins: {
    legend: { position: "bottom" },
  },
});

const isOpenFilterChart = ref(false);
const selectedOption = ref("Last Term");
const options = ref(["Last Term", "Upper Last Term"]);

const toggleDropdown = () => {
  isOpenFilterChart.value = !isOpenFilterChart.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpenFilterChart.value = false;
};
</script>

<style>
.pass-btn {
  background: #eefbf4;
  color: #66c27c;
}

.fail-btn {
  background: #e9adb073;
  color: #c9252d;
}
</style>
