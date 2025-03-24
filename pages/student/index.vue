<template>
  <div
    class="w-full rounded-2xl flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="flex justify-between items-center w-full">
      <h2 class="sm:flex hidden font-bold text-[#010109]">Your Performance</h2>
      <div class="relative ms-auto">
        <div
          class="custom-select w-full bg-[#F9F9FC] border border-[#2F2B43]/10 h-[50px] px-5 rounded-lg flex items-center justify-between cursor-pointer relative mt-1 gap-x-3"
          @click="toggleDropdown"
        >
          <span>{{ selectedTerm === "term_1" ? "Term 1" : "Term 2" }}</span>
          <img src="~/assets/img/icons/selectdown.png" class="w-2 h-2" />
        </div>

        <!-- Dropdown List -->
        <transition name="fade">
          <ul
            v-if="isOpen"
            class="absolute left-0 top-[115%] w-full bg-white border border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
          >
            <li
              class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
              @click.stop="
                () => {
                  selectedTerm = 'term_1';
                  toggleDropdown();
                }
              "
            >
              Term 1
            </li>
            <li
              class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
              @click.stop="
                () => {
                  selectedTerm = 'term_2';
                  toggleDropdown();
                }
              "
            >
              Term 2
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
          :src="student?.avatar_url"
          class="w-[80px] h-[80px] rounded-full"
          alt="Student Image"
        />
        <div class="h-full flex justify-start items-start flex-col gap-y-2">
          <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
            {{ student?.student_details?.name || "Loading..." }}
          </h3>

          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Student ID</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              {{ student?.student_details?.studentId || "N/A" }}
            </h3>
          </div>
        </div>
        <div class="mt-auto">
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Class</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              {{ student?.student_details?.class || "N/A" }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- student Summary -->
    <div
      class="w-full flex justify-between items-start flex-wrap gap-5 mt-4 px-4"
    >
      <div
        v-for="(value, key) in studentStats"
        :key="key"
        class="rounded-xl flex justify-center items-center bg-[#F7F7F7] p-4 w-full sm:w-[47%] lg:w-[22%] flex-col"
      >
        <p class="text-lg font-bold text-[#010109]">{{ value }}</p>
        <p class="text-sm text-[#737373]">{{ key }}</p>
      </div>
    </div>

    <!-- performance   -->

    <div class="w-full h-screen px-6 py-4">
      <h1 class="text-xl font-bold text-[#010109] mb-4">
        Performance Insights
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Grade Comparison Chart -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-md font-semibold text-[#0050A8] mb-3">
            Grade Comparison
          </h2>
          <div class="w-full">
            <ChartBar
              :chartData="chartDataBar"
              :chartOptions="chartOptionsBar"
            />
          </div>
        </div>

        <!-- AI-Powered Study Recommendations -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-md font-semibold text-[#0050A8] mb-3">
            AI Study Focus
          </h2>
          <p class="text-gray-600 text-sm">
            Based on your past performance, AI suggests focusing on:
          </p>
          <ul class="mt-3 list-disc list-inside text-sm text-gray-700">
            <li v-for="topic in studyRecommendations" :key="topic">
              {{ topic }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Resources -->
      <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-md font-semibold text-[#0050A8] mb-3">
          Recommended Learning Resources
        </h2>
        <ul class="list-disc list-inside text-sm text-gray-700">
          <li v-for="resource in learningResources" :key="resource.title">
            <a
              :href="resource.link"
              target="_blank"
              class="text-blue-500 underline"
            >
              {{ resource.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- AI Insights & Alerts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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

    <!-- Study Plan -->
    <div class="w-full bg-white shadow-md rounded-lg p-6">
      <h2 class="text-md font-semibold text-[#0050A8] mb-3">
        Your AI-Generated Study Plan
      </h2>
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-[#F7F7F7]">
            <th class="border p-2 text-left">Day</th>
            <th class="border p-2 text-left">Subject</th>
            <th class="border p-2 text-left">Focus Topic</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(plan, index) in studyPlan" :key="index">
            <td class="border p-2 text-sm">{{ plan.day }}</td>
            <td class="border p-2 text-sm">{{ plan.subject }}</td>
            <td class="border p-2 text-sm">{{ plan.topic }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Contact Teacher -->
    <form class="w-full flex flex-col gap-y-4 mt-5 lg:w-[45%] lg:me-auto">
      <div class="w-full">
        <label class="text-md text-[#010109]">Contact Your Teacher</label>
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
definePageMeta({
  layout: "student",
  middleware: "auth",
});

import { useStudentStore } from "~/stores/student";

import { getAIInsights } from "~/services/aiServices";

const config = useRuntimeConfig();

const studentStore = useStudentStore();

const isOpen = ref(false);
const toggleDropdown = () => (isOpen.value = !isOpen.value);

const aiInsights = ref(
  "John's performance is improving. He needs more focus on Math to reach an A grade."
);
const alerts = ref(
  "John was absent 3 times last month. Please check with the school."
);

// AI-Powered Study Recommendations
const studyRecommendations = ref([
  "Focus on Geometry in Math",
  "Revise Biology topics",
  "Improve reading comprehension in English",
]);

// Recommended Learning Resources
const learningResources = ref([
  { title: "Khan Academy Math", link: "https://www.khanacademy.org/math" },
  {
    title: "Biology Crash Course",
    link: "https://www.youtube.com/c/crashcourse",
  },
  { title: "English Writing Tips", link: "https://www.grammarly.com/blog/" },
]);

// chart data

const chartOptionsBar = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { display: false } },
  },
  plugins: { legend: { display: false } },
});

// AI Study Plan (Mock Data)
const studyPlan = ref([
  { day: "Monday", subject: "Math", topic: "Algebra Equations" },
  { day: "Tuesday", subject: "English", topic: "Essay Writing" },
  { day: "Wednesday", subject: "Biology", topic: "Human Anatomy" },
  { day: "Thursday", subject: "Physics", topic: "Newton’s Laws" },
  { day: "Friday", subject: "History", topic: "World War II" },
  { day: "Saturday", subject: "Chemistry", topic: "Periodic Table" },
  { day: "Sunday", subject: "Revision", topic: "Past Exam Papers" },
]);

const userDetails = ref({
  id: "",
  email: "",
  address: "",
  fullName: "",
});

const loadUserFromLocalStorage = () => {
  if (process.client) {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      userDetails.value = {
        id: userData.id,
        email: userData.user_metadata?.email || "N/A",
        address: userData.user_metadata?.address || "N/A",
        fullName: userData.user_metadata?.fullName || "N/A",
      };
    }
  }
};

// Fetch user data when component mounts
onMounted(() => {
  loadUserFromLocalStorage();
});

watch(
  () => userDetails.value.id,
  async (newId) => {
    if (newId) {
      student.value = await studentStore.getStudent(newId);
      // console.log(student.value);
    }
  },
  { immediate: true }
);

const student = ref({});
const selectedTerm = ref("term_1"); // Default to Term 1
const studentStats = ref({});
const chartDataBar = ref({
  labels: [],
  datasets: [],
});

watch(
  () => student.value,
  (newStudent) => {
    if (newStudent?.subjects) {
      updateStudentData(selectedTerm.value); // Initialize with Term 1
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => student.value,
  async (newStudent) => {
    if (newStudent?.id) {
      const aiData = await getAIInsights(
        newStudent,
        config.public.openaiApiKey
      );

      try {
        console.log("AI Data:", aiData);

        if (typeof aiData === "string") {
          aiData = JSON.parse(aiData);
        }

        aiInsights.value = aiData.insight;
        studyRecommendations.value = aiData.studyFocus;

        // progressInsight.value = aiData.progressInsight;
        studyPlan.value = aiData.studyPlan || [];
      } catch (error) {
        console.error("Error parsing AI response:", error, aiData);
      }
    }
  },
  { immediate: true, deep: true }
);

const updateStudentData = (term) => {
  if (!student.value?.subjects) return;

  const subjects = Object.keys(student.value.subjects);
  if (subjects.length === 0) return; // Avoid empty data issues

  studentStats.value = {
    "Math Average": `${student.value.subjects.Math?.[`average_${term}`] || 0}%`,
    "English Average": `${
      student.value.subjects.English?.[`average_${term}`] || 0
    }%`,
    "Biology Average": `${
      student.value.subjects.Biology?.[`average_${term}`] || 0
    }%`,
    "Physics Average": `${
      student.value.subjects.Physics?.[`average_${term}`] || 0
    }%`,
  };

  chartDataBar.value = {
    labels: subjects,
    datasets: [
      {
        label: "Grades",
        data: subjects.map(
          (subj) => student.value.subjects[subj]?.[`average_${term}`] || 0
        ),
        backgroundColor: "#0050AB",
        borderRadius: 10,
        barPercentage: 0.4,
        categoryPercentage: 0.7,
      },
    ],
  };
};

// Watch for term change
watch(selectedTerm, (newTerm) => {
  updateStudentData(newTerm);
});

// chart data
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
