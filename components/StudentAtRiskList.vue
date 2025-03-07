<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl sm:px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="w-full mt-3 mb-4 flex justify-between items-center">
      <div>
        <h3 class="Grotesque-Regular text-md text-[#010109]">
          Top 5 Students At Risk
        </h3>
      </div>
    </div>
    <div class="w-full flex flex-col gap-y-5 items-center justify-center px-5">
      <NuxtLink
        to="/teacher/student-performance/1"
        class="flex justify-between items-start w-full hover:bg-[#e2dddd3b]"
      >
        <div
          class="flex justify-center items-center gap-x-3 border-b border-b-[#E9E5E5] pb-3"
        >
          <img :src="personImg" class="sm:*:w-[36px] w-[30px]" />
          <div class="flex flex-col justify-start items-start">
            <div class="text-[#000000] text-[14px] sm:text-[16px]">
              olaniyan sheyi
            </div>
            <p class="text-[#7d7d7d] text-sm">ID: 2020398</p>
          </div>
        </div>

        <div
          class="flex flex-col justify-end ms-auto items-start font-medium gap-y-1"
        >
          <p class="text-[14px] sm:text-[16px]">prev score: 16/100</p>
          <button
            class="block text-center rounded-md py-1 text-[#C9252D] bg-red-200 text-xs px-2"
          >
            view performance
          </button>
        </div>
      </NuxtLink>
      <NuxtLink
        to="/teacher/student-performance/1"
        class="flex justify-between items-start w-full hover:bg-[#e2dddd3b]"
      >
        <div
          class="flex justify-center items-center gap-x-3 border-b border-b-[#E9E5E5] pb-3"
        >
          <img :src="personImg" class="sm:*:w-[36px] w-[30px]" />
          <div class="flex flex-col justify-start items-start">
            <div class="text-[#000000] text-[14px] sm:text-[16px]">
              olaniyan sheyi
            </div>
            <p class="text-[#7d7d7d] text-sm">ID: 2020398</p>
          </div>
        </div>

        <div
          class="flex flex-col justify-end ms-auto items-start font-medium gap-y-1"
        >
          <p class="text-[14px] sm:text-[16px]">prev score: 16/100</p>
          <button
            class="block text-center rounded-md py-1 text-[#C9252D] bg-red-200 text-xs px-2"
          >
            view performance
          </button>
        </div>
      </NuxtLink>
      <NuxtLink
        to="/teacher/student-performance/1"
        class="flex justify-between items-start w-full hover:bg-[#e2dddd3b]"
      >
        <div
          class="flex justify-center items-center gap-x-3 border-b border-b-[#E9E5E5] pb-3"
        >
          <img :src="personImg" class="sm:*:w-[36px] w-[30px]" />
          <div class="flex flex-col justify-start items-start">
            <div class="text-[#000000] text-[14px] sm:text-[16px]">
              olaniyan sheyi
            </div>
            <p class="text-[#7d7d7d] text-sm">ID: 2020398</p>
          </div>
        </div>

        <div
          class="flex flex-col justify-end ms-auto items-start font-medium gap-y-1"
        >
          <p class="text-[14px] sm:text-[16px]">prev score: 16/100</p>
          <button
            class="block text-center rounded-md py-1 text-[#C9252D] bg-red-200 text-xs px-2"
          >
            view performance
          </button>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import personImg from "~/assets/img/person.png";
</script>
