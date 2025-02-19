<template>
  <div class="w-full lg:gap-x-6">
    <div class="w-full text-left pt-5 pb-10">
      <h1 class="Grotesque-Bold text-xl text-[#010109]">Notifications</h1>
    </div>

    <div
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-start justify-start pt-3 pb-10"
    >
      <!-- today notifications -->

      <div
        class="flex flex-col justify-start items-center gap-y-8 border-b-[1px] border-b-[#F4F4FB] pb-16"
      >
        <h1 class="Grotesque-Bold text-xl text-[hsl(240,80%,2%)] me-auto">
          Today
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
              <h3 class="Grotesque-Regular text-[16px] text-[hsl(240,8%,20%)]">
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
          <div
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <img src="~/assets/img/avatar1.png" class="" />

            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[16px] text-[hsl(240,8%,20%)]">
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
          <div
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <img src="~/assets/img/avatar2.png" class="" />

            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[16px] text-[hsl(240,8%,20%)]">
                Payment for
                <span class="text-[#0050AB]"> Trip ID : [ORD13786]. </span> has
                encountered an issue. The payment was declined due to [Reason].
                Please contact the customer and resolve the payment issue.
              </h3>

              <h4 class="Grotesque-Regular text-[12px] text-[#737373]">
                Oct 21, 10:24a.m
              </h4>
            </div>
          </div>
          <div
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <div
              class="w-[50px] h-[50px] rounded-full bg-[#F5FBEF] flex justify-center items-center flex-shrink-0"
            >
              <h1 class="Grotesque-Bold text-lg text-[#669F2A]">SE</h1>
            </div>

            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[16px] text-[hsl(240,8%,20%)]">
                You have a new trip placed by John Doe for Product XYZ.
                <span class="text-[#0050AB]"> Trip ID : [ORD13786]. </span>
              </h3>

              <h4 class="Grotesque-Regular text-[12px] text-[#737373]">
                Oct 21, 10:24a.m
              </h4>
            </div>
          </div>
        </div>
      </div>

      <!-- notification for all other days / yesterday -->

      <div
        class="flex flex-col justify-start items-center gap-y-8 border-b-[1px] border-b-[#F4F4FB] py-10"
      >
        <h1 class="Grotesque-Bold text-xl text-[hsl(240,80%,2%)] me-auto">
          Yesterday
        </h1>
        <div class="w-full flex justify-start items-center gap-y-11 flex-col">
          <div
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <img src="~/assets/img/avatar1.png" class="" />
            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[16px] text-[hsl(240,8%,20%)]">
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
    </div>
  </div>
</template>
<script>
definePageMeta({
  layout: "teacher",
});

const toggleState = ref(false);
const startDate = ref();
const EndDate = ref();
</script>

<style scoped></style>
