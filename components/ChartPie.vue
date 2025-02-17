<script setup>
import { defineProps } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define props
const props = defineProps({
  chartData: Object,
  chartOptions: Object
});
</script>

<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
