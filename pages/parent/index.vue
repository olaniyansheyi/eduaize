<template>
  <div
    class="w-full rounded-2xl flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="flex justify-between items-center w-full">
      <h2 class="sm:flex hidden font-bold text-[#010109]">Parent Dashboard</h2>
      <div class="relative sm:w-[60%] w-[80%] ms-auto">
        <div
          class="custom-select w-full bg-[#F9F9FC] border border-[#2F2B43]/10 h-[50px] px-5 rounded-lg flex items-center justify-between cursor-pointer relative mt-1 gap-x-3"
          @click="toggleDropdown"
        >
          <span>{{ selectedChildName }}</span>
          <img src="~/assets/img/icons/selectdown.png" class="w-4 h-4" />
        </div>

        <!-- Dropdown List with Smooth Transition -->
        <transition name="fade">
          <ul
            v-if="isOpen"
            class="absolute left-0 top-[115%] w-full bg-white border border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
          >
            <li
              v-for="child in children"
              :key="child.id"
              class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
              @click="selectChild(child.id)"
            >
              {{ child.name }} - {{ child.class }}
            </li>
          </ul>
        </transition>
      </div>
    </div>

    <!-- student details  -->

    <div
      class="w-full mt-3 my-4 flex justify-start flex-col gap-y-6 items-center"
    >
      <div
        class="w-full flex justify-start items-start lg:gap-x-12 gap-x-5 lg:flex-nowrap flex-wrap gap-y-4"
      >
        <img
          src="~/assets/img/person.png"
          class="w-[80px] h-[80px] rounded-full"
          alt="Student Image"
        />
        <div class="h-full flex justify-start items-start flex-col gap-y-2">
          <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
            John Anetor
          </h3>
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Student ID</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              2020-0001
            </h3>
          </div>
        </div>
        <div class="mt-auto">
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Class</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              Grade 10 - Science
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Child Summary -->
    <div
      class="w-full flex justify-between items-start flex-wrap gap-5 mt-4 px-4"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl flex justify-center items-center bg-[#F7F7F7] p-4 w-full sm:w-[47%] lg:w-[22%] flex-col"
      >
        <p class="text-lg font-bold" :class="stat.color">{{ stat.value }}</p>
        <p class="text-sm text-[#737373]">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Performance Chart -->
    <div class="mt-6 w-full">
      <PerformanceChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>

    <!-- AI Insights & Alerts -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div
        class="border border-[#F4F4FB] p-4 rounded-lg shadow flex gap-3 gap-x-4"
      >
        <span class="text-blue-600 text-xl">🧠</span>
        <div>
          <h3 class="font-bold text-[#010109]">AI Insights</h3>
          <p class="text-sm text-[#737373]">
            {{ aiInsights }}
          </p>
        </div>
      </div>
      <div
        class="border border-[#F4F4FB] p-4 rounded-lg shadow flex gap-3 gap-x-4"
      >
        <span class="text-red-500 text-xl">⚠️</span>
        <div>
          <h3 class="font-bold text-red-500">Alerts</h3>
          <p class="text-sm text-red-500">
            {{ alerts }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Teacher -->
    <form class="w-full flex flex-col gap-y-4 mt-5 lg:w-[45%] lg:me-auto">
      <div class="w-full">
        <label class="text-md text-[#010109]">Contact Teacher</label>
        <textarea
          class="custom-select w-full bg-[#F9F9FC] border border-[#2F2B43]/10 h-[87px] px-3 rounded-lg outline-none mb-2 mt-1 py-3"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full py-3 bg-[#0050AB] text-white rounded-lg hover:bg-[#003D80] transition"
      >
        Alert Teacher
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "parent",
  middleware: "auth",
});

const children = ref([
  {
    id: 1,
    name: "Sheyi Olaniyan",
    class: "Grade 5",
    performance: 85,
    attendance: 92,
    grade: "A",
    behavior: "Good",
  },
  {
    id: 2,
    name: "Loveth Olaniyan",
    class: "Grade 3",
    performance: 76,
    attendance: 88,
    grade: "B",
    behavior: "Needs Improvement",
  },
]);

const selectedChild = ref(1);
const isOpen = ref(false);
const toggleDropdown = () => (isOpen.value = !isOpen.value);
const selectChild = (id) => {
  selectedChild.value = id;
  isOpen.value = false;
};

const currentChild = computed(() =>
  children.value.find((child) => child.id === selectedChild.value)
);

const selectedChildName = computed(() => {
  const child = children.value.find((c) => c.id === selectedChild.value);
  return child ? `${child.name} - ${child.class}` : "Select Child";
});

const stats = computed(() => [
  {
    label: "Performance",
    value: `${currentChild.value?.performance}%`,
    color: "text-green-600",
  },
  {
    label: "Attendance",
    value: `${currentChild.value?.attendance}%`,
    color: "text-blue-600",
  },
  {
    label: "Grade",
    value: currentChild.value?.grade,
    color: "text-yellow-600",
  },
  {
    label: "Behavior",
    value: currentChild.value?.behavior,
    color: "text-purple-600",
  },
]);

const aiInsights = ref(
  "John's performance is improving. He needs more focus on Math to reach an A grade."
);
const alerts = ref(
  "John was absent 3 times last month. Please check with the school."
);

const chartData = ref({
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Performance",
      data: [78, 82, 85, 87],
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
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { display: false } },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
