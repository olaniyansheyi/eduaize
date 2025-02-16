<template>
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
          <h3 class="Grotesque-Regular text-md text-[#010109]">Student Name</h3>
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
          <h3 class="Grotesque-Regular text-md text-[#010109]">Pass / Fail</h3>
        </div>
        <div class="w-[5%] text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Action</h3>
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
        <div class="w-[4%] text-center cursor-pointer relative">
          <img
            src="~/assets/img/icons/dotted-menu.png"
            alt="Menu"
            @click="toggleDropdownDelete(index)"
          />
          <!-- action modal -->
          <div
            v-if="dropdownVisible === index"
            class="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-[120px] py-2 z-10 Px-4"
          >
            <button
              class="block w-full text-left px-4 py-2 text-[#C9252D] hover:bg-gray-100 text-xs"
              @click="openDeleteRoleModal"
            >
              Delete Student
            </button>
          </div>
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

    <!-- modal for delete user -->

    <Modal v-model="isDeleteRoleModalOpen">
      <div class="flex flex-col gap-y-4 justify-center items-center w-full">
        <div class="flex flex-col gap-y-1 justify-center items-center">
          <img src="~/assets/img/unknown-user.png" alt="" />
          <h2 class="text-[#1A1A1A] Grotesque-Regular">Delete Student?</h2>
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            All data will be permanently lost
          </p>
        </div>
        <div class="flex flex-col gap-y-1 justify-center items-center w-full">
          <button
            @click="closeModal"
            class="bg-[#EF3333] py-2 w-full text-white rounded-lg Grotesque-Regular"
          >
            Yes, please
          </button>

          <button
            @click="closeModal"
            class="bg-none py-2 w-full text-[#4B4B4B] Grotesque-Regular"
          >
            No, dont
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
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
const selectedOption = ref("all");
const options = ref(["pass", "fail", "Top student", "all"]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};

const dropdownVisible = ref(null);
const isOpen = ref(false);

const isDeleteRoleModalOpen = ref(false);
const openDeleteRoleModal = () => {
  isDeleteRoleModalOpen.value = true;
  dropdownVisible.value = null;
};

const toggleDropdownDelete = (index) => {
  dropdownVisible.value = dropdownVisible.value === index ? null : index;
};

const closeModal = () => {
  isDeleteRoleModalOpen.value = false;
};
</script>
