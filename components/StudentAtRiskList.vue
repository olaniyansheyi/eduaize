<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl sm:px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="w-full mt-3 mb-4 flex justify-between items-center">
      <h3 class="Grotesque-Regular text-md text-[#010109]">
        Top 5 Students At Risk
      </h3>
    </div>

    <div class="w-full flex flex-col gap-y-5 items-center justify-center px-5">
      <template v-for="student in highRiskStudents" :key="student.id">
        <NuxtLink
          :to="`/student/${student.id}`"
          class="flex justify-between items-start w-full hover:bg-[#e2dddd3b]"
        >
          <div
            class="flex justify-center items-center gap-x-3 border-b border-b-[#E9E5E5] pb-3"
          >
            <img
              :src="student.avatar"
              class="sm:w-[36px] w-[30px] rounded-full"
            />
            <div class="flex flex-col justify-start items-start">
              <div class="text-[#000000] text-[14px] sm:text-[16px]">
                {{ student.student_name }}
              </div>
              <p class="text-[#7d7d7d] text-xs">
                {{ student.ai_insights }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-col justify-end ms-auto my-auto items-center font-medium gap-y-1"
          >
            <p class="text-[14px] sm:text-[16px]">
              Risk Level: {{ student.risk_level }}
            </p>
            <button
              class="block text-center rounded-md py-1 text-[#C9252D] bg-red-200 text-xs px-1 my-auto"
            >
              View Performance
            </button>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import personImg from "~/assets/img/person.png";
import { useStudentStore } from "~/stores/student";

// Get student data from the store
const studentStore = useStudentStore();

// Filter students with "High" risk level and take the top 5
const highRiskStudents = computed(() =>
  studentStore.studentsAtRiskComputed
    .filter((student) => student.risk_level === "High")
    .slice(0, 5)
);
</script>
