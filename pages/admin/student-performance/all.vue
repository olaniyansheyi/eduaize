<template>
  <h1 class="Grotesque-regular text-xl py-6 text-[#010109]">
    Student performance and managing
  </h1>

  <!-- Admin Statistics -->
  <div class="w-full flex justify-between items-start flex-wrap gap-5 mt-4">
    <div
      class="rounded-xl flex justify-center items-center bg-[#F7F7F7] p-4 w-full sm:w-[47%] lg:w-[22%]"
    >
      <div class="flex flex-col gap-y-1 mx-auto text-center">
        <p class="text-[#010109] text-lg font-bold">{{ totalStudents }}</p>
        <h3 class="text-[#737373] text-sm">Total Students</h3>
      </div>
    </div>

    <div
      class="rounded-xl flex justify-center items-center bg-[#F7F7F7] p-4 w-full sm:w-[47%] lg:w-[22%]"
    >
      <div class="flex flex-col gap-y-1 mx-auto text-center">
        <p class="text-red-500 text-lg font-bold">{{ studentsAtRisk }}</p>
        <h3 class="text-[#737373] text-sm">Total Students At Risk</h3>
      </div>
    </div>
  </div>

  <!-- Student Analytics Chart -->
  <div class="w-full mt-10 flex justify-between items-center">
    <h3 class="text-md text-[#010109]">School-wide Student Analytics</h3>
    <NuxtLink
      to="/admin/export-report"
      class="bg-[#0050A8] text-white text-xs px-2 md:px-8 rounded-lg py-3 md:text-md"
    >
      Export Report
    </NuxtLink>
  </div>

  <div class="w-full mt-5">
    <PerformanceChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>

  <!-- student performance report  -->

  <ExportReport />

  <!-- student database table  -->
  <StudentsTable />
  <!-- student database table  -->
</template>

<script setup>
import { useStudentStore } from "~/stores/student";

const studentStore = useStudentStore();

// Compute total students
const totalStudents = computed(() => studentStore.students.length);

const studentsAtRisk = studentStore.studentsAtRiskComputed.length;
// Aggregate student performance for the chart
const weeklyPerformance = computed(() => {
  const weeks = [0, 0, 0, 0, 0];
  let studentCount = 0;

  studentStore.students.forEach((student) => {
    Object.values(student.subjects).forEach((subject) => {
      const scores = subject.term_1_scores || [];
      for (let i = 0; i < scores.length && i < weeks.length; i++) {
        weeks[i] += scores[i];
      }
    });
    studentCount++;
  });

  return weeks.map((score) => (studentCount > 0 ? score / studentCount : 0));
});

const chartData = ref({
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      label: "Student Performance",
      data: weeklyPerformance.value,
      borderColor: "#0050A8",
      backgroundColor: "rgba(0, 80, 168, 0.2)",
      borderWidth: 2,
      pointBackgroundColor: "#0050A8",
      tension: 0.4,
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
      ticks: { stepSize: 10, padding: 15 },
    },
  },
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
