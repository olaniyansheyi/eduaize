<template>
  <div class="w-full lg:gap-x-6">
    <div class="w-full text-left mt-8 pb-8 flex justify-between items-center">
      <h1 class="Grotesque-Bold text-xl text-[#010109]">Alerts</h1>
      <button
        class="bg-[#0050A8] text-white whitespace-nowrap px-3 md:px-8 rounded-xl py-2"
        @click="handleIsOpen"
      >
        Send Alert
      </button>
    </div>

    <div
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-start justify-start pt-3 pb-6"
    >
      <!-- Your notifications -->

      <div
        class="flex flex-col justify-start items-center gap-y-8 border-b-[1px] border-b-[#F4F4FB] pb-6"
      >
        <h1 class="Grotesque-Regular text-md text-[#010109] me-auto">
          Your notifications
        </h1>
        <div class="w-full flex justify-start items-center gap-y-11 flex-col">
          <div
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <div
              class="w-[50px] h-[50px] rounded-full bg-[#F5FBEF] flex justify-center items-center flex-shrink-0"
            >
              <h1 class="Grotesque-Bold text-lg text-[#669F2A]">SE</h1>
            </div>

            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[14px] text-[hsl(240,8%,20%)]">
                Your trip has been accepted by Samuel Ezeocha.<span
                  class="text-[#0050AB]"
                >
                  Trip ID : [ORD13786].
                </span>
                Please view trip history
              </h3>

              <h4 class="Grotesque-Regular text-[12px] text-[#737373]">
                Oct 21, 10:24a.m
              </h4>
            </div>
          </div>
        </div>
      </div>

      <!-- notification you sent -->

      <div
        class="flex flex-col justify-start items-center gap-y-8 border-b-[1px] border-b-[#F4F4FB] py-5"
      >
        <h1 class="Grotesque-Regular text-md text-[#010109] me-auto">
          Notifications You Sent
        </h1>
        <div class="w-full flex justify-start items-center gap-y-11 flex-col">
          <div
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <img src="~/assets/img/avatar1.png" class="" />
            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[14px] text-[hsl(240,8%,20%)]">
                Your wallet has been funded
                <span class="text-[#0050AB]"> 600,000NGN </span> . Please view
                receipt here
              </h3>

              <h4 class="Grotesque-Regular text-[12px] text-[#737373]">
                Oct 21, 10:24a.m
              </h4>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        title="Alert parent or school admin"
        :options="['parent', 'School Admin']"
        idPlaceholder="Student ID"
        messagePlaceholder="Enter your message"
        :isOpen="isOpen"
      />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "teacher",
});


const isOpen = ref(false);


const handleIsOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped></style>
