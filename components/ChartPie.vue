<script setup>
import { ref } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: ["A (80-100)", "B (70-79)", "C (60-69)", "D (50-59)", "F (<50)"],
  datasets: [
    {
      label: "Grade Distribution",
      data: [3, 1, 0, 1, 0], // Example count of students per grade range
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#EC407A", "#AB47BC"],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
});
</script>

<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>
