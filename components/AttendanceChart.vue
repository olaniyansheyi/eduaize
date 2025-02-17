<script setup>
import { defineProps, computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define props
const props = defineProps({
  attendance: Number, // Expect attendance count (out of 12)
});

// Compute attendance percentage
const attendancePercentage = computed(() =>
  Math.round((props.attendance / 12) * 100)
);

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

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const { left, right, top, bottom } = chartArea;
    const width = right - left;
    const height = bottom - top;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 🔥 Increase text size (Percentage: 16px, Label: 14px)
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "#000";

    // Draw Percentage
    ctx.fillText(
      `${attendancePercentage.value}%`,
      left + width / 2,
      top + height / 1.65 // 🔥 Moved slightly up to reduce gap
    );

    // Draw "Attendance" below with a smaller gap
    ctx.font = "16px Arial";
    ctx.fillStyle = "#444";
    ctx.fillText("Attendance", left + width / 2, top + height / 1.4); // 🔥 Moved up

    ctx.restore();
  },
};

// Register Plugin
ChartJS.register(centerTextPlugin);

// Chart Options
const chartOptions = computed(() => ({
  responsive: true,
  cutout: "65%", // Thicker arc
  rotation: -90, // Start from bottom
  circumference: 180, // Half-doughnut shape
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }, // Hide tooltip
  },
  plugins: [centerTextPlugin], // Attach the custom plugin
}));
</script>

<template>
  <div class="w-full sm:w-[80%] lg:w-[30%] relative chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<style></style>
