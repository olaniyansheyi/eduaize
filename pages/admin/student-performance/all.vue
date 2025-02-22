<template>
  <h1 class="Grotesque-regular text-xl py-6 text-[#010109]">
    Student performance and managing
  </h1>

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
  </div>

  <div class="w-full mt-14 mb-4 flex justify-between items-center">
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

  <div class="w-full mt-8">
    <PerformanceChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>

  <!-- student performance report  -->

  <ExportReport />

  <!-- student database table  -->
  <StudentsTable />
  <!-- student database table  -->
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const chartData = ref({
  labels: [
    "last term",
    "1st term(2024)",
    "2nd term(2024)",
    "1st term(2023)",
    "2nd term(2023)",
  ],
  datasets: [
    {
      label: "Student Performance Over The Years",
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
</script>
