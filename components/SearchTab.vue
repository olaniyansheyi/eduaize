<template>
  <!-- Only show the search tab when openSearch is true -->
  <div v-if="searchStore.openSearch" class="fixed inset-0 z-[999]">
    <div
      class="hidden sm:block z-10 fixed inset-0 sm:bg-transparent"
      @click="searchStore.handleToggleSearch"
    ></div>

    <div
      class="bg-white inset-0 fixed sm:bottom-auto sm:rounded-2xl z-20 py-6 overflow-y-auto sm:shadow-xl shadow-black sm:top-[4%] sm:left-[46%] sm:w-[400px] lg:top-[2%] lg:left-[70%] lg:shadow-none lg:border-[1px] lg:border-[rgba(34, 34, 34, 0.08)] lg:w-[420px]"
    >
      <!-- Search bar -->
      <div class="w-full flex justify-between items-center pe-5">
        <div class="relative">
          <div class="absolute inset-y-0 left-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7D7D7D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search student by id or name"
            class="w-full rounded-full bg-transparent text-[#7d7d7d] py-[8px] px-4 pl-12 outline-none placeholder:text-sm"
          />
        </div>

        <svg
          @click="searchStore.handleToggleSearch"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="cursor-pointer"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>

      <!-- Top Students Section -->
      <div
        v-if="searchQuery === ''"
        class="flex justify-center items-start gap-x-4 w-[48%] py-5 me-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
        <p class="text-sm text-[#7d7d7d] tracking-wide font-medium">
          Top Students
        </p>
      </div>

      <!-- Top Students List -->
      <div
        v-if="searchQuery === ''"
        class="w-full flex flex-col gap-y-5 items-center justify-center px-5"
      >
        <NuxtLink
          v-for="student in topStudents"
          :key="student.student_details.studentId"
          :to="`/student/${student.id}`"
          @click="searchStore.handleToggleSearch"
          class="flex justify-between items-center w-full hover:bg-[#e2dddd3b]"
        >
          <div class="flex justify-center items-center gap-x-3">
            <img :src="personImg" class="w-[36px] h-[36px]" />
            <div class="flex flex-col justify-start items-start">
              <div class="text-[#000000]">
                {{ student.student_details.name }}
              </div>
              <p class="text-[#7d7d7d] text-sm">
                ID: {{ student.student_details.studentId }}
              </p>
            </div>
          </div>
          <div class="flex flex-col justify-start items-start font-medium">
            <p class="text-sm">Prev score: {{ student.avg1.toFixed(2) }}/100</p>
            <div class="flex items-center justify-center gap-x-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="down"
                class="sc-bpUBKd lbsNGc"
              >
                <path
                  d="M10.6979 16.2453L6.31787 9.75247C5.58184 8.66118 6.2058 7 7.35185 7L16.6482 7C17.7942 7 18.4182 8.66243 17.6821 9.75247L13.3021 16.2453C12.623 17.2516 11.377 17.2516 10.6979 16.2453Z"
                  fill="currentColor"
                ></path>
              </svg>
              <p class="text-green-500">{{ student.improvement }}%</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Show search results when user types -->
      <div
        v-if="searchQuery !== ''"
        class="w-full flex flex-col gap-y-5 items-center justify-center px-5"
      >
        <template v-if="filteredStudents.length">
          <NuxtLink
            v-for="student in filteredStudents"
            :key="student.student_details.studentId"
            :to="`/student/${student.id}`"
            @click="searchStore.handleToggleSearch"
            class="flex justify-between items-center w-full hover:bg-[#e2dddd3b]"
          >
            <div class="flex justify-center items-center gap-x-3">
              <img :src="personImg" class="w-[36px] h-[36px]" />
              <div class="flex flex-col justify-start items-start">
                <div class="text-[#000000]">
                  {{ student.student_details.name }}
                </div>
                <p class="text-[#7d7d7d] text-sm">
                  ID: {{ student.student_details.studentId }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </template>
        <p v-else class="text-[#7d7d7d] text-sm text-center">
          No students found
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useSearchStore } from "~/stores/search";
import { useStudentStore } from "~/stores/student";
import personImg from "~/assets/img/person.png";

const studentStore = useStudentStore();
const searchStore = useSearchStore();
const searchQuery = ref(""); // Bind search input
const debounceTimeout = ref(null);

// Compute top 3 students based on improvement percentage
const topStudents = computed(() => {
  return studentStore.students
    .map((student) => {
      let totalAvgTerm1 = 0;
      let totalAvgTerm2 = 0;
      let subjectCount = 0;

      // Loop through subjects
      for (const subject in student.subjects) {
        const subjectData = student.subjects[subject];

        // Check if Term 1 and Term 2 exist before calculation
        const avgTerm1 = subjectData.average_term_1 || null;
        const avgTerm2 = subjectData.average_term_2 || null;

        if (avgTerm1 !== null && avgTerm2 !== null) {
          totalAvgTerm1 += avgTerm1;
          totalAvgTerm2 += avgTerm2;
          subjectCount++;
        }
      }

      if (subjectCount === 0) return null; // Skip students with no scores

      const avg1 = totalAvgTerm1 / subjectCount;
      const avg2 = totalAvgTerm2 / subjectCount;

      // Avoid division by zero, ensure avg1 exists before calculating improvement
      const improvement = avg1 > 0 ? ((avg2 - avg1) / avg1) * 100 : 0;

      return { ...student, improvement: improvement.toFixed(2), avg1, avg2 };
    })
    .filter(Boolean) // Remove null values
    .sort((a, b) => b.improvement - a.improvement) // Sort by improvement
    .slice(0, 3); // Take top 3
});

// Filtered students based on search
const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) return [];
  return studentStore.students.filter(
    (student) =>
      student.student_details.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      student.student_details.studentId.includes(searchQuery.value)
  );
});

// Debounced search function
const handleSearch = () => {
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    console.log("Searching for:", searchQuery.value);
  }, 500);
};

// Watch searchQuery to trigger debounce
watch(searchQuery, handleSearch);
</script>
