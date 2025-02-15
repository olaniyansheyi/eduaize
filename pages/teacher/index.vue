<template>
  <div class="w-full gap-x-1 lg:gap-x-6 px-4 sm:px-10">
    <div class="w-full py-3 flex items-center justify-between">
      <h1
        class="Grotesque-Bold font-semibold sm:text-xl text-md text-[#010109]"
      >
        Hello John
      </h1>
      <div class="relative sm:w-auto w-[60%]">
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
          type="text"
          placeholder="Search student"
          class="rounded-full bg-[#F7F7F7] text-textSecondary py-[8px] px-4 pl-12 outline-none w-full"
        />
      </div>
    </div>

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

    <!-- student database table  -->

    <div
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
    >
      <div class="w-full mt-3 mb-4 flex justify-between items-center">
        <div>
          <h3 class="Grotesque-Regular text-md text-[#010109]">Database</h3>
        </div>

        <!-- filter -->

        <div
          class="rounded-lg w-fit h-fit inline-flex items-center justify-center px-3 py-2 border border-grey-200 bg-[#F9F9F9] outline-none hover:bg-green3 relative"
          @click="toggleDropdown"
        >
          <div
            class="flex items-center justify-center cursor-pointer text-white gap-2"
          >
            <img src="~/assets/img/filter.svg" class="w-6" />
            <span class="text-sm capitalize truncate text-black poppinsMedium">
              Filter By
            </span>
          </div>
          <svg
            class="cursor-pointer w-6 md:w-7 dark:fill-white dark:stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
            />
          </svg>

          <ul
            v-if="isOpen"
            class="absolute left-0 top-[100%] w-full bg-white border-[1px] border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
          >
            <li
              v-for="option in options"
              :key="option"
              class="px-3 py-2 hover:bg-[#F9F9FC] cursor-pointer"
              @click="selectOption(option)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>

      <!-- table element -->
      <div
        class="flex flex-col w-full overflow-x-auto overflow-y-auto max-w-full h-[331px]"
      >
        <!-- Header -->
        <div
          class="flex justify-between bg-[#F9F9F9] items-center w-[1000px] px-5 h-[68px]"
        >
          <div class="flex-1 text-left">
            <h3 class="Grotesque-Regular text-md text-[#010109]">
              Student Name
            </h3>
          </div>
          <div class="flex-1 text-left">
            <h3 class="Grotesque-Regular text-md text-[#010109]">Score</h3>
          </div>
          <div class="flex-1 text-center">
            <h3 class="Grotesque-Regular text-md text-[#010109]">Submitted</h3>
          </div>
          <div class="flex-1 text-center">
            <h3 class="Grotesque-Regular text-md text-[#010109]">Grade</h3>
          </div>
          <div class="flex-1 text-center">
            <h3 class="Grotesque-Regular text-md text-[#010109]">
              Pass / Fail
            </h3>
          </div>
        </div>

        <!-- Row with dropdown -->
        <div
          v-for="(role, index) in roles"
          :key="index"
          class="flex justify-between border-b items-center border-b-[#E9E5E5] w-[1000px] h-[68px] px-5 relative"
        >
          <div class="flex-1 text-left">
            <div class="flex w-full justify-start items-center gap-x-3">
              <img :src="role.image" class="w-[28px] rounded-full" lt="" />
              <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
                {{ role.name }}
              </p>
            </div>
          </div>
          <div class="flex-1 text-left">
            <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
              {{ role.description }}
            </p>
          </div>
          <div class="flex-1 text-center">
            <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
              {{ role.dateCreated }}
            </p>
          </div>
          <div class="flex-1 text-center">
            <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
              {{ role.permissions }}
            </p>
          </div>
          <div class="flex-1 text-center">
            <button
              :class="[
                'py-1 px-8 rounded-lg text-[14px]',
                role.status === 'fail' ? 'fail-btn' : 'pass-btn',
              ]"
            >
              {{ role.status }}
            </button>
          </div>
        </div>
      </div>

      <!-- paginations buttons -->

      <div
        class="w-full justify-between flex flex-wrap items-center gap-y-5 mt-5"
      >
        <div class="flex justify-center items-center gap-x-4">
          <p class="text-[#737373] Grotesque-Regular text-[14px]">
            Rows per page
          </p>
          <select
            class="w-[64px] h-[32px] border-[1px] border-[#E9E5E5] rounded-lg outline-none px-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div class="flex justify-start items-center gap-x-1 flex-wrap gap-y-5">
          <button
            class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            First
          </button>
          <button
            class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            Previuos
          </button>
          <button
            class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            1
          </button>
          <button
            class="bg-[#0050AB] rounded-lg px-4 py-1 cursor-pointer text-white Grotesque-Regular text-[14px]"
          >
            2
          </button>
          <button
            class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            ....
          </button>
          <button
            class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            Next
          </button>
          <button
            class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
          >
            Last
          </button>
          <p class="text-[#737373] Grotesque-Regular text-[14px] lg:ms-2">
            1-10 of 346 Results
          </p>
        </div>
      </div>
    </div>

    <!-- student database table  -->
  </div>
</template>

<script setup>
// temporal data for the roles

import personImg from "~/assets/img/person.png";
import personImg2 from "~/assets/img/person2.png";
import personImg3 from "~/assets/img/person3.png";
const roles = ref([
  {
    name: "Super Administrator",
    description: "100/100",
    dateCreated: "07/07/23, 13:23pm",
    permissions: 46,
    status: "pass",
    image: personImg,
  },
  {
    name: "Administrator",
    description: "20/100",
    dateCreated: "07/07/23, 13:23pm",
    permissions: 56,
    status: "fail",
    image: personImg2,
  },
  {
    name: "Product Ownerr",
    description: "70/100",
    dateCreated: "07/07/23, 13:23pm",
    permissions: 45,
    status: "pass",
    image: personImg3,
  },
]);

const toggleState = ref(false);

definePageMeta({
  layout: "teacher",
});

const isOpen = ref(false);
const selectedOption = ref("all");
const options = ref(["pass", "fail", "Top student", "all"]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};

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
