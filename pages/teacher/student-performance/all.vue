<template>
  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div
      class="w-full mt-3 mb-4 flex justify-start flex-col gap-y-6 items-center"
    >
      <h3 class="me-auto Grotesque-Regular text-md text-[#010109]">
        All Your Student Performance for Last Term
      </h3>

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
    </div>
  </div>

  <!-- students table  -->

  <studentsTable />
</template>

<script setup>
definePageMeta({
  layout: "teacher",
});
</script>
