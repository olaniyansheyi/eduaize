<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="w-full flex justify-between items-start flex-wrap gap-5 mt-4">
      <div
        class="rounded-xl flex justify-center items-center bg-[#F7F7F7] p-4 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
      >
        <div class="flex justify-center items-center flex-col gap-y-1 mx-auto">
          <p class="text-[#010109] text-lg font-bold">1,200</p>
          <h3 class="Grotesque-Regular text-[#737373] text-sm text-center">
            Toatal sudent
          </h3>
        </div>
      </div>
      <div
        class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
      >
        <div class="flex justify-center items-center flex-col gap-y-1 mx-auto">
          <p class="text-red-500 text-lg font-bold">54</p>
          <h3
            class="me-auto Grotesque-Regular text-[#737373] text-sm whitespace-nowrap"
          >
            Toatal Student At Risk
          </h3>
        </div>
      </div>
      <div
        class="rounded-xl py flex justify-center items-center gap-x-2 bg-[#F7F7F7] p-4 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
      >
        <div class="flex justify-center items-center flex-col gap-y-1">
          <p class="text-[#010109] text-lg font-bold">80</p>
          <h3 class="me-auto Grotesque-Regular text-[#737373] text-sm">
            Toatal Teachers
          </h3>
        </div>
      </div>
      <div
        class="rounded-xl py flex justify-center items-center gap-x-2 bg-[#F7F7F7] p-4 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
      >
        <div class="flex justify-center items-center flex-col gap-y-1 mx-auto">
          <p class="text-[#010109] text-lg font-bold">1,000</p>
          <h3
            class="me-auto Grotesque-Regular text-[#737373] text-sm font-bold"
          >
            Toatal Parent
          </h3>
        </div>
      </div>
    </div>

    <div class="w-full mt-10 flex justify-between items-center">
      <div>
        <h3 class="Grotesque-Regular text-md text-[#010109]">
          school-wide student analytics.
        </h3>
      </div>
      <NuxtLink
        to="/admin/export-report"
        class="bg-[#0050A8] text-white whitespace-nowrap text-xs px-2 md:px-8 rounded-lg py-3 md:text-md"
      >
        Export Report
      </NuxtLink>
    </div>

    <!-- student performance chart -->

    <div class="w-full mt-5">
      <PerformanceChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>

    <!-- student at risk risk  -->
    <ExportReport />

    <!-- student database table  -->
    <StudentsTable />
    <!-- student database table  -->
  </div>
</template>

<script setup>
const chartData = ref({
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      label: "Student Performance",
      data: [20, 75, 80, 98, 85], // Example weekly performance scores
      borderColor: "#0050A8", // Blue color
      backgroundColor: "rgba(0, 80, 168, 0.2)", // Light transparent blue
      borderWidth: 2,
      pointBackgroundColor: "#0050A8",
      tension: 0.4, // Smooth line
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        stepSize: 10,
        padding: 15,
      },
    },
  },
});

definePageMeta({
  layout: "admin",
});
</script>
