<script setup>
import { defineProps, computed, watch, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register only necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define props
const props = defineProps({
  attendance: Number, // Expect attendance count (out of 12)
});

// Compute attendance percentage
const attendancePercentage = computed(() =>
  Math.round((props.attendance / 12) * 100)
);

// Store the chart instance for reactivity
const chartRef = ref(null);

// Chart Data
const chartData = computed(() => ({
  labels: ["Attendance", "Remaining"],
  datasets: [
    {
      label: "Student Attendance",
      data: [props.attendance, 12 - props.attendance], // Attendance vs Remaining
      backgroundColor: ["#0050A8", "#A0A0A0"], // Active: Blue, Remaining: Dark Gray
      borderWidth: 0, // No border
    },
  ],
}));

// Center Text Plugin (Scoped to This Chart)
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return; // Ensure chart is fully rendered

    const { left, right, top, bottom } = chartArea;
    const width = right - left;
    const height = bottom - top;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Get computed percentage value dynamically
    const percentageText = `${attendancePercentage.value}%`;

    // Set styles for text
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#000";

    // Draw Percentage
    ctx.fillText(percentageText, left + width / 2, top + height / 1.7);

    // Draw "Attendance" below
    ctx.font = "14px Arial";
    ctx.fillStyle = "#444";
    ctx.fillText("Attendance", left + width / 2, top + height / 1.4);

    ctx.restore();
  },
};

const chartOptions = computed(() => ({
  responsive: true,
  cutout: "65%", // Thicker arc
  rotation: -90, // Start from bottom
  circumference: 180, // Half-doughnut shape
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }, // Hide tooltip
  },
  plugins: [centerTextPlugin],
}));

// Force chart to update when attendance changes
watch(
  () => props.attendance,
  () => {
    if (chartRef.value) {
      chartRef.value.update(); // Manually trigger chart re-draw
    }
  }
);
</script>

<template>
  <div class="w-full sm:w-[80%] lg:w-[30%] relative chart-container">
    <Doughnut ref="chartRef" :data="chartData" :options="chartOptions" />
  </div>
</template>
