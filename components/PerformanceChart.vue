<script setup>
import { defineProps } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const props = defineProps({
  chartData: Object,
  chartOptions: Object,
});
</script>

<template>
  <div class="w-full h-[17rem]">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
