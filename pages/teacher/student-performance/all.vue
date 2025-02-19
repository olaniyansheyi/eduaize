<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div
      class="w-full mt-3 mb-4 flex justify-start flex-col gap-y-6 items-center"
    >
      <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
        All Your Student Performance for Last Term
      </h3>

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
    </div>
  </div>

  <!-- student at risk risk  -->

  <StudentAtRiskList />

  <!-- students table  -->

  <studentsTable />
</template>

<script setup>
definePageMeta({
  layout: "teacher",
});

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
</script>
