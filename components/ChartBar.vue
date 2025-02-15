<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartData = ref({
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
    },
  },
  plugins: {
    legend: { display: false },
  },
});
</script>

<template>
  <div style="width: 100%; overflow-x: auto">
    <div style="min-width: 600px">
      <Bar :data="chartData" :options="chartOptions" style="height: 300px" />
    </div>
  </div>
</template>
