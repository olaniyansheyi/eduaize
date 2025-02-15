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
      data: [85, 72, 90, 78, 92], // Student grades
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#EC407A", "#AB47BC"],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: false },
  },
});
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
