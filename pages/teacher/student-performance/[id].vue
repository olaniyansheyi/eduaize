<template>
  <!-- Student Performance Dashboard -->
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div
      class="w-full mt-3 mb-4 flex justify-start flex-col gap-y-6 items-center"
    >
      <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
        Student Performance Overview For Last Term
      </h3>
      <div
        class="w-full flex justify-start items-start lg:gap-x-12 gap-x-5 lg:flex-nowrap flex-wrap gap-y-4"
      >
        <img
          :src="personImg"
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
        <div class="mt-auto sm:ms-auto lg:ms-0">
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Class</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              Grade 10 - Science
            </h3>
          </div>
        </div>
        <div class="mt-auto">
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Attendance</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              8/12 Days
            </h3>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-between items-start flex-wrap gap-5 mt-4">
        <div
          class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
        >
          <img
            src="~/assets/img/individual-user.png"
            class="w-[45px] rounded-full"
            alt=""
          />
          <div class="flex justify-start items-start flex-col gap-y-1 w-[70%]">
            <p class="text-[#010109] text-sm">85/100</p>
            <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
              Overall Grade
            </h3>
          </div>
        </div>
        <div
          class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
        >
          <img
            src="~/assets/img/individual-user.png"
            class="w-[45px] rounded-full"
            alt=""
          />
          <div class="flex justify-start items-start flex-col gap-y-1 w-[70%]">
            <p class="text-[#010109] text-sm">8/20</p>
            <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
              Test
            </h3>
          </div>
        </div>
        <div
          class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
        >
          <img
            src="~/assets/img/individual-user.png"
            class="w-[45px] rounded-full"
            alt=""
          />
          <div class="flex justify-start items-start flex-col gap-y-1 w-[70%]">
            <p class="text-[#010109] text-sm">5/7</p>
            <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
              Assignments Submitted
            </h3>
          </div>
        </div>
        <div
          class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
        >
          <img
            src="~/assets/img/individual-user.png"
            class="w-[45px] rounded-full"
            alt=""
          />
          <div class="flex justify-start items-start flex-col gap-y-1 w-[70%]">
            <p class="text-[#010109] text-sm">Excellent</p>
            <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
              Behavior
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full bg-[#FFF3CD] text-[#856404] p-4 rounded-lg flex items-start"
    >
      <div>
        <h3 class="font-bold text-xl pb-4">Performance Alert</h3>
        <p class="text-sm tracking-wider">
          {{ insightMessage }}
        </p>
      </div>
    </div>

    <div
      class="w-full my-5 flex justify-start lg:justify-between items-start flex-wrap gap-8 gap-y-12 px-4 sm:px-10"
    >
      <AttendanceChart :attendance="8" />

      <div class="w-full sm:w-[80%] lg:w-[30%]">
        <ChartPie :chartData="chartDataPie" :chartOptions="chartOptionsPie" />
      </div>
    </div>
  </div>
</template>

<script setup>
import personImg from "~/assets/img/person.png";

definePageMeta({
  layout: "teacher",
});

// chart option

const chartDataPie = ref({
  labels: ["score (50)", "Miss (50)"],
  datasets: [
    {
      label: "Grade Distribution",
      data: [1, 1], // You can modify this dynamically
      backgroundColor: [
        "#28A745", // Success Green
        "#DC3545",
      ],
      borderWidth: 5,
      borderColor: "#ffffff",
      borderRadius: 10,
    },
  ],
});

// Dynamic Chart Options
const chartOptionsPie = ref({
  responsive: true,
  cutout: "60%",
  plugins: {
    legend: { position: "bottom" },
  },
});

const previousGrades = ref([75, 60, 50]);
const attendanceRate = ref((8 / 12) * 100);

const insightMessage = computed(() => {
  const lastGrade = previousGrades.value[0]; // Most recent
  const beforeLastGrade = previousGrades.value[1];

  if (lastGrade < 50) {
    return "⚠️ Student is at risk! Immediate improvement is needed.";
  } else if (lastGrade < beforeLastGrade) {
    return "📉 Performance has dropped compared to last term. Consider extra support.";
  } else if (attendanceRate.value < 70) {
    return "🚨 Low attendance detected! Encourage regular participation and Drop Alert for the student's Parent";
  } else {
    return "✅ Student is performing well. Keep up the good work!";
  }
});
</script>

<style></style>
