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
            {{ student?.student_details.name || "Loading..." }}
          </h3>
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Student ID</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              {{ student?.student_details.studentId || "Loading..." }}
            </h3>
          </div>
        </div>
        <div class="mt-auto sm:ms-auto lg:ms-0">
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Class</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              {{ student?.student_details.class || "Loading..." }}
            </h3>
          </div>
        </div>
        <div class="mt-auto">
          <div class="flex justify-start items-start flex-col gap-y-1">
            <p class="text-[#737373] text-sm">Attendance</p>
            <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
              {{ overallAttendance }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Overall Grade -->
      <div class="w-full flex justify-between items-start flex-wrap gap-5 mt-4">
        <div
          class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-[47%] lg:w-[22%]"
        >
          <img
            src="~/assets/img/individual-user.png"
            class="w-[45px] rounded-full"
            alt=""
          />
          <div class="flex justify-start items-start flex-col gap-y-1 w-[70%]">
            <p class="text-[#010109] text-sm">{{ overallGrade }}/100</p>
            <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
              Overall Grade
            </h3>
          </div>
        </div>
      </div>

      <!-- Subjects Performance Table -->
      <div class="w-full mt-6">
        <h3 class="me-auto Grotesque-Regular text-lg mb-5 text-[#010109]">
          Subject Performance Summary for last term
        </h3>
        <div class="w-full overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th class="px-6 py-3">Subject</th>
                <th class="px-6 py-3">Term 2 Average</th>
                <th class="px-6 py-3">Attendance</th>
                <th class="px-6 py-3">Teacher's Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="subject in subjectsList"
                :key="subject"
                class="border-b bg-white"
              >
                <td class="px-6 py-4 font-medium text-gray-900">
                  {{ subject }}
                </td>
                <td class="px-6 py-4">
                  {{ student?.subjects[subject].average_term_2 }}/100
                </td>
                <td class="px-6 py-4">
                  {{ student?.subjects[subject].attendance.term_2 }}/10
                </td>
                <td class="px-6 py-4">
                  {{ student?.subjects[subject].teacher_remark.term_2 }}
                </td>
              </tr>
            </tbody>
          </table>
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
      <!-- Attendance Chart with Text Percentage -->
      <div class="w-full sm:w-[80%] lg:w-[30%] flex flex-col items-center">
        <AttendanceChart :attendance="attendanceRate" />

        <p class="text-gray-700 text-lg">
          Attendance Rate: <span class="font-bold">{{ attendanceRate }}%</span>
        </p>
      </div>

      <!-- Pie Chart with Meaningful Labels -->
      <div class="w-full sm:w-[80%] lg:w-[30%] flex flex-col items-center">
        <ChartPie :chartData="chartDataPie" :chartOptions="chartOptionsPie" />
        <div class="mt-4 flex justify-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 bg-[#28A745] inline-block rounded-full"></span>
            <span>Score (%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 bg-[#DC3545] inline-block rounded-full"></span>
            <span>Missed (%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import personImg from "~/assets/img/person.png";
// import { useRoute } from "vue-router";
import { useStudentStore } from "~/stores/student";

const route = useRoute();
const studentStore = useStudentStore();
const student = ref(null);

onMounted(async () => {
  const studentId = route.params.id;

  student.value = await studentStore.getStudent(studentId); // Fetch and assign student data
});

definePageMeta({
  layout: "student",
});

// chart option

const chartDataPie = computed(() => {
  if (!student.value) return { labels: ["Loading..."], datasets: [] };

  const overallScore = parseFloat(overallGrade.value); // Convert to number
  const missedPoints = 100 - overallScore; // Out of 100

  return {
    labels: ["Score (%)", "Missed (%)"],
    datasets: [
      {
        label: "Grade Distribution",
        data: [overallScore, missedPoints],
        backgroundColor: ["#28A745", "#DC3545"], // Green for score, red for missed
        borderWidth: 5,
        borderColor: "#ffffff",
        borderRadius: 10,
      },
    ],
  };
});

// Dynamic Chart Options
const chartOptionsPie = ref({
  responsive: true,
  cutout: "60%",
  plugins: {
    legend: { position: "bottom" },
  },
});
const previousGrades = computed(() => {
  if (!student.value) return [];
  return Object.values(student.value.subjects).map(
    (subject) => subject.average_term_2
  );
});

const attendanceRate = computed(() => {
  if (!student.value) return "Loading...";
  const subjects = student.value.subjects;

  let totalAttended = 0;
  let totalPossible = 0;

  Object.values(subjects).forEach((subject) => {
    totalAttended += subject.attendance.term_2;
    totalPossible += 10; // Assuming max attendance per subject is 10
  });

  return ((totalAttended / totalPossible) * 100).toFixed(1); // Convert to percentage
});

const insightMessage = computed(() => {
  if (!previousGrades.value.length) return "Loading insights...";

  const lastGrade = parseFloat(overallGrade.value);
  const beforeLastGrade =
    previousGrades.value.length > 1 ? previousGrades.value[1] : lastGrade;

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

// Compute overall attendance across all five subjects

const overallAttendance = computed(() => {
  if (!student.value) return "Loading...";
  const subjects = student.value.subjects;
  let totalAttended = 0;
  let totalPossible = 0;

  Object.values(subjects).forEach((subject) => {
    totalAttended += subject.attendance.term_2;
    totalPossible += 12; // Assuming each subject has 10 total attendance days
  });

  return `${totalAttended}/${totalPossible} Days`;
});

// Compute overall grade (average of all subjects)
const overallGrade = computed(() => {
  if (!student.value) return "Loading...";
  const subjects = student.value.subjects;
  let totalScore = 0;
  let count = 0;

  Object.values(subjects).forEach((subject) => {
    totalScore += subject.average_term_2;
    count++;
  });

  return (totalScore / count).toFixed(1); // Display with 1 decimal place
});

// Get subjects dynamically
const subjectsList = computed(() => {
  return student.value ? Object.keys(student.value.subjects) : [];
});
</script>

<style></style>
