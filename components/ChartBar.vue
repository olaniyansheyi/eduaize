<script setup>
import { defineProps } from "vue";
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

// Define props
const props = defineProps({
  chartData: Object,
  chartOptions: Object,
});
</script>

<template>
  <div style="width: 100%; overflow-x: auto">
    <div style="min-width: 600px">
      <Bar :data="chartData" :options="chartOptions" style="height: 300px" />
    </div>
  </div>
</template>
