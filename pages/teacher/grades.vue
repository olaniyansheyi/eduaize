<template>
  <div
    class="w-full items-start justify-start flex my-20 mx-4 gap-y-10 flex-col pb-10"
  >
    <div class="w-full">
      <h3 class="Grotesque-Regular text-md text-[#010109]">
        Grades and Attendance Upload
      </h3>
      <p class="Grotesque-Regular text-[14px] text-[#737373]">
        Decide your prefered method of Uploading Grades
      </p>
    </div>
    <div
      class="w-full lg:w-[60%] flex justify-between items-center flex-wrap md:flex-nowrap gap-y-5"
    >
      <div class="flex gap-x-2 justify-center items-center">
        <input
          name="security"
          type="radio"
          id="individual"
          value="individual"
          v-model="selectedTab"
          class="custom-radio"
        />
        <p class="Grotesque-Regular text-[14px] text-[#737373]">
          Upload individual Student
        </p>
      </div>

      <div class="flex gap-x-2 justify-center items-center">
        <input
          name="security"
          type="radio"
          id="bulk"
          value="bulk"
          v-model="selectedTab"
          class="custom-radio"
        />
        <p class="Grotesque-Regular text-[14px] text-[#737373]">
          Bulk Upload with Excel file
        </p>
      </div>
    </div>

    <!-- upload individually -->
    <div
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
    >
      <div class="w-full mt-8 mb-4 flex justify-between gap-x-2 items-center">
        <div>
          <h3 class="Grotesque-Regular text-md text-[#010109]">
            Upload new Grades
          </h3>
          <p class="Grotesque-Regular text-[14px] text-[#737373]">
            This Grade will be recorded for the current term
          </p>
        </div>
        <NuxtLink href="/">
          <button
            class="bg-[#0050A8] text-white whitespace-nowrap text-xs px-3 md:px-8 rounded-lg py-3 md:text-md"
          >
            Save and Publish
          </button>
        </NuxtLink>
      </div>
      <div
        class="w-full flex justify-center items-start gap-8 flex-wrap lg:flex-nowrap"
      >
        <form class="w-full lg:w-[45%] flex flex-col gap-y-4">
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]">
              Name of Student
            </label>

            <input
              type="text"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between outline-none mb-2 mt-1"
            />
          </div>

          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]">
              Invite a new team member to this role
            </label>

            <input
              type="email"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between outline-none mb-2 mt-1"
              placeholder="email address"
            />
          </div>
        </form>
        <div class="w-full lg:w-[45%] text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109] mb-4">
            Attendance
          </h3>
          <div class="bg-[#F9F9FA] rounded-lg p-5 text-left">
            <h4 class="Grotesque-Regular text-[14px] text-[#737373] mb-5">
              List of weeks in a Term
            </h4>
            <div class="w-full flex flex-col items-start justify-start gap-y-6">
              <div class="flex flex-col gap-y-2 justify-center items-start">
                <span
                  v-for="week in termWeeks"
                  class="flex gap-x-2 justify-center items-center"
                >
                  <input type="checkbox" class="custom-checkbox" />
                  <h4 class="Grotesque-Regular text-[14px] text-[#737373]">
                    Week {{ week }}
                  </h4>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- upload in bulk -->

    <div v-if="selectedTab === 'bulk'"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "teacher",
});

const selectedTab = ref("individual");
const termWeeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>

<style>
.custom-checkbox {
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: white;
  border: 1px solid #666666;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #47b86e;
  border-color: #47b86e;
}

.custom-checkbox:checked::after {
  content: "✔";
  color: white;
  font-size: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
