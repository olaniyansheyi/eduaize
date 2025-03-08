<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div
      class="w-full mt-3 mb-4 flex justify-start flex-col gap-y-6 items-center"
    >
      <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
        All Your Student Performance for Last Term
      </h3>

      <!-- student data display with charts  -->

      <div class="pt-5 ms-auto">
        <div
          class="select-container w-[10.5rem] ms-auto"
          :class="isOpenFilterChart ? ' h-[10.5rem]' : ''"
        >
          <div
            class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between cursor-pointer relative mb-2 mt-1"
            @click="toggleDropdown"
          >
            <span>{{ selectedOption }}</span>
            <img src="~/assets/img/icons/selectdown.png" class="" />
          </div>

          <ul
            v-if="isOpenFilterChart"
            class="absolute left-0 top-[35%] w-full bg-white border-[1px] border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
          >
            <li
              v-for="option in options"
              :key="option"
              class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
              @click="selectOption(option)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>

      <!-- student data display with charts  -->

      <div
        class="w-full my-5 flex justify-start lg:justify-between items-start flex-wrap gap-8 gap-y-12 px-4 sm:px-10"
      >
        <div class="w-full sm:w-[80%] lg:w-[60%]">
          <ChartBar :chartData="chartDataBar" :chartOptions="chartOptionsBar" />
        </div>
        <div class="w-full sm:w-[80%] lg:w-[30%]">
          <ChartPie :chartData="chartDataPie" :chartOptions="chartOptionsPie" />
        </div>
      </div>
    </div>
  </div>

  <!-- student at risk risk  -->

  <StudentAtRiskList />

  <!-- students table  -->

  <studentsTable />
  <Spinner v-if="isLoading" />
</template>

<script setup>
import { useStudentStore } from "~/stores/student";

const studentStore = useStudentStore();
const isLoading = ref(false);
definePageMeta({
  layout: "teacher",
  middleware: "auth",
});

const isOpenFilterChart = ref(false);

const options = ref(["Term 1", "Term 2"]);
const selectedOption = ref("Term 1");

const toggleDropdown = () => {
  isOpenFilterChart.value = !isOpenFilterChart.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpenFilterChart.value = false;
};

// chart data

const chartDataBar = computed(() => {
  const labels = studentStore.students.map(
    (student) => student.student_details.name
  );

  const isTerm1 = selectedOption.value === "Term 1";

  const scores = studentStore.students.map((student) =>
    isTerm1
      ? student.subjects.Math?.average_term_1 || 0
      : student.subjects.Math?.average_term_2 || 0
  );

  return {
    labels,
    datasets: [
      {
        label: isTerm1 ? "Term 1 Scores" : "Term 2 Scores",
        data: scores,
        backgroundColor: isTerm1 ? "#0050AB" : "#6495ED",
        borderRadius: 10,
      },
    ],
  };
});

const chartDataPie = computed(() => {
  const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  const isTerm1 = selectedOption.value === "Term 1";

  studentStore.students.forEach((student) => {
    Object.values(student.subjects).forEach((subject) => {
      const avg = isTerm1 ? subject.average_term_1 : subject.average_term_2;

      if (avg >= 80) grades.A++;
      else if (avg >= 70) grades.B++;
      else if (avg >= 60) grades.C++;
      else if (avg >= 50) grades.D++;
      else grades.F++;
    });
  });

  return {
    labels: ["A (80-100)", "B (70-79)", "C (60-69)", "D (50-59)", "F (<50)"],
    datasets: [
      {
        data: Object.values(grades),
        backgroundColor: [
          "#0050AB",
          "#6495ED",
          "#28A745",
          "#FFA726",
          "#DC3545",
        ],
        borderWidth: 5,
        borderColor: "#ffffff",
        borderRadius: 10,
      },
    ],
  };
});

const chartOptionsBar = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { display: false } },
  },
  plugins: {
    legend: { display: false },
  },
});

// chart option

// Dynamic Chart Options
const chartOptionsPie = ref({
  responsive: true,
  cutout: "60%",
  plugins: {
    legend: { position: "bottom" },
  },
});

const fetchStudents = async () => {
  isLoading.value = true;
  await studentStore.getStudents();
  isLoading.value = false;
};

// Fetch user data when component mounts
onMounted(() => {
  fetchStudents();
});
</script>
