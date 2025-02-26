<template>
  <div class="w-full h-screen px-6 py-4">
    <h1 class="text-xl font-bold text-[#010109] mb-4">Progress Tracker</h1>

    <!-- Goal Setting -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-md font-semibold text-[#0050A8] mb-3">
        Set Your Academic Goals
      </h2>
      <input
        v-model="newGoal"
        type="text"
        placeholder="E.g., Improve my math score to 85%"
        class="border p-2 w-full rounded-lg"
      />
      <button
        @click="addGoal"
        class="mt-2 bg-[#0050A8] text-white py-2 px-4 rounded-lg"
      >
        Add Goal
      </button>

      <ul class="mt-3 list-disc list-inside text-gray-700">
        <li v-for="(goal, index) in goals" :key="index">
          {{ goal }}
        </li>
      </ul>
    </div>

    <!-- AI Progress Analysis -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-md font-semibold text-[#0050A8] mb-3">
        Your Progress Insights
      </h2>
      <p class="text-gray-600 text-sm">
        Based on your recent performance, AI suggests focusing on:
      </p>
      <ul class="mt-3 list-disc list-inside text-gray-700">
        <li v-for="topic in studyRecommendations" :key="topic">
          {{ topic }}
        </li>
      </ul>
    </div>

    <!-- Motivational AI Messages -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-md font-semibold text-[#0050A8] mb-3">
        AI Motivational Message
      </h2>
      <p class="text-gray-700 italic">"{{ motivationalMessage }}"</p>
    </div>

    <!-- Study Plan -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-md font-semibold text-[#0050A8] mb-3">
        Your AI-Generated Study Plan
      </h2>
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-[#F7F7F7]">
            <th class="border p-2">Day</th>
            <th class="border p-2">Subject</th>
            <th class="border p-2">Focus Topic</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(plan, index) in studyPlan" :key="index">
            <td class="border p-2">{{ plan.day }}</td>
            <td class="border p-2">{{ plan.subject }}</td>
            <td class="border p-2">{{ plan.topic }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "student",
});

// Goal Setting
const newGoal = ref("");
const goals = ref([]);

const addGoal = () => {
  if (newGoal.value.trim()) {
    goals.value.push(newGoal.value);
    newGoal.value = "";
  }
};

// AI Study Recommendations (Dummy Data)
const studyRecommendations = ref([
  "Review Algebra concepts",
  "Practice essay writing in English",
  "Revise Human Anatomy for Biology",
]);

// AI Motivational Messages (Dynamic)
const motivationalMessages = [
  "You're on track for an A! Keep pushing! 🚀",
  "Consistency is key! Just a little more effort! 🎯",
  "You're improving every day. Stay focused! 💡",
];
const motivationalMessage = computed(() => {
  return motivationalMessages[
    Math.floor(Math.random() * motivationalMessages.length)
  ];
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
</script>

<style scoped>
h1,
h2 {
  font-family: "Grotesque-Bold", sans-serif;
}
</style>
