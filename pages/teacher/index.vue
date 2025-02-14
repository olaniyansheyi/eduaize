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
  </div>
</template>

<script setup>
definePageMeta({
  layout: "teacher",
});
</script>
