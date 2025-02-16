<template>
  <div>
    <!-- Teacher details section  -->
    <div
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
    >
      <div
        class="w-full mt-3 mb-4 flex justify-start flex-col gap-y-6 items-center"
      >
        <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
          Teacher Details
        </h3>
        <div
          class="w-full flex justify-start items-start lg:gap-x-12 gap-x-5 lg:flex-nowrap flex-wrap gap-y-4"
        >
          <img :src="personImg" class="w-[80px] h-[80px] rounded-full" alt="" />
          <div class="h-full flex justify-start items-start flex-col gap-y-2">
            <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
              john Anetor
            </h3>
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">ID</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                ID: 2020-0001
              </h3>
            </div>
          </div>
          <div class="mt-auto sm:ms-auto lg:ms-0">
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">Number</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                +2348135158754
              </h3>
            </div>
          </div>
          <div class="mt-auto">
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">Email</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                olaniyansheyi1704@gmail.com
              </h3>
            </div>
          </div>
          <div class="mt-auto sm:ms-auto lg:ms-0">
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#737373] text-sm">Address</p>
              <h3 class="me-auto Grotesque-Regular text-sm text-[#010109]">
                123 Elim Street
              </h3>
            </div>
          </div>
        </div>

        <div
          class="w-full flex justify-between items-start flex-wrap gap-5 mt-4"
        >
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-auto"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-auto"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-auto"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
          <div
            class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 pe-16 w-full sm:w-auto"
          >
            <img
              src="~/assets/img/individual-user.png"
              class="w-[45px] rounded-full"
              alt=""
            />
            <div class="flex justify-start items-start flex-col gap-y-1">
              <p class="text-[#010109] text-sm">100</p>
              <h3 class="me-auto Grotesque-Regular text-[#737373] text-xs">
                Toatal sudent
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- student data display with charts  -->

    <div
      class="w-full my-5 flex justify-start lg:justify-between items-start flex-wrap gap-8 gap-y-12 px-4 sm:px-10"
    >
      <div class="w-full sm:w-[80%] lg:w-[60%]">
        <ChartBar />
      </div>
      <div class="w-full sm:w-[80%] lg:w-[30%]">
        <ChartPie />
      </div>
    </div>

    <!-- student database table  -->
    <StudentsTable />
    <!-- student database table  -->
  </div>
</template>

<script setup>
// temporal data for the roles

import personImg from "~/assets/img/person.png";

definePageMeta({
  layout: "teacher",
});

const isOpen = ref(false);

onMounted(() => {
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".relative")) {
      isOpen.value = false;
    }
  });
});
</script>

<style>
.pass-btn {
  background: #eefbf4;
  color: #66c27c;
}

.fail-btn {
  background: #e9adb073;
  color: #c9252d;
}
</style>
