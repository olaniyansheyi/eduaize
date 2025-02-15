<script setup>
import { ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Chart Data
const chartData = ref({
  labels: ["A (80-100)", "B (70-79)", "C (60-69)", "D (50-59)", "F (<50)"],
  datasets: [
    {
      label: "Grade Distribution",
      data: [2, 1, 8, 4, 2],
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

// Chart Options
const chartOptions = ref({
  responsive: true,
  cutout: "60%", // Converts Pie chart to Doughnut by cutting out the center
  plugins: {
    legend: { position: "bottom" },
  },
});
</script>

<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
