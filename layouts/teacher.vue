<template>
  <div
    class="h-screen lg:max-h-[50rem] mx-auto w-full overflow-hidden flex relative"
  >
    <!-- sidebar section-desktop-display -->

    <div
      class="sm:h-[100vh] h-full sm:w-[23%] lg:w-[19%] bg-[#F7F7F7] items-center justify-start hidden sm:flex px-3 flex-col"
    >
      <div
        class="w-full flex items-center justify-center border border-grey-200 bg-white mb-7 gap-x-2 rounded-md h-[80px]"
      >
        <img
          src="~/assets/img/logo-eduaize.png"
          class="w-[21rem] max-w-none me-auto"
        />
      </div>
      <div
        class="h-full rounded-2xl sm:w-[100%] md:w-full flex flex-col items-center justify-start lg:py-4 gap-y-5 mt-8"
      >
        <NuxtLink href="/teacher" class="w-full flex items-center gap-x-3 px-4">
          <img
            v-if="$route.path == '/teacher'"
            src="~/assets/img/dashboard.svg"
            class="w-5"
          />
          <img v-else src="~/assets/img/dashboard2.svg" class="w-5" />
          <span
            :class="[
              $route.path == '/teacher' ? 'text-[#0050A8]' : 'text-[#737373]',
            ]"
            class="Grotesque-Light text-xs sm:text-[14px]"
          >
            Dashboard
          </span>
        </NuxtLink>

        <NuxtLink
          href="/teacher/grades"
          class="w-full flex items-center gap-x-3 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
            :class="[
              $route.path == '/teacher/grades'
                ? 'text-[#0050A8]'
                : 'text-[#737373]',
            ]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16v-8m0 0-3 3m3-3 3 3M4.5 15.75V6a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 6v9.75m-15 0h15m-15 0A2.25 2.25 0 006.75 18h10.5a2.25 2.25 0 002.25-2.25"
            />
          </svg>

          <span
            :class="[
              $route.path == '/notifications'
                ? 'text-[#0050A8]'
                : 'text-[#737373]',
            ]"
            class="Grotesque-Light text-xs sm:text-[14px]"
          >
            Grades Upload
          </span>
        </NuxtLink>
        <NuxtLink
          href="/teacher/student-performance/all"
          class="w-full flex items-center gap-x-3 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
            :class="[
              $route.path.includes('/teacher/student-performance')
                ? 'text-[#0050A8]'
                : 'text-[#737373]',
            ]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 18v-6a3 3 0 013-3h12a3 3 0 013 3v6m-3-3a3 3 0 11-6 0 3 3 0 116 0zm-7-6V5a1 1 0 011-1h2a1 1 0 011 1v4"
            />
          </svg>

          <span
            :class="[
              $route.path.includes('/teacher/student-performance')
                ? 'text-[#0050A8]'
                : 'text-[#737373]',
            ]"
            class="Grotesque-Light text-xs sm:text-[14px]"
          >
            Student performance
          </span>
        </NuxtLink>

        <NuxtLink
          href="/teacher/notifications"
          class="w-full flex items-center gap-x-3 px-4"
        >
          <img
            v-if="$route.path == '/notifications'"
            src="~/assets/img/bell.svg"
            class="w-5"
          />
          <img v-else src="~/assets/img/bell2.svg" class="w-5" />
          <span
            :class="[
              $route.path == '/notifications'
                ? 'text-[#0050A8]'
                : 'text-[#737373]',
            ]"
            class="Grotesque-Light text-xs sm:text-[14px]"
          >
            Notifications
          </span>
        </NuxtLink>

        <NuxtLink to="/" class="me-auto">
          <div class="w-full flex items-center gap-x-3 px-4 mt-40">
            <img src="~/assets/img/logout.svg" class="w-5" />
            <span class="Grotesque-Light text-[#737373] text-xs sm:text-[14px]">
              Logout
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- sidebar section -->

    <!-- sidebar section-mobile-display -->

    <div
      class="w-full right-0 left-0 sm:hidden fixed bottom-0 h-[70px] bg-[#F7F7F7] flex justify-around items-center py-3 z-50"
    >
      <NuxtLink
        href="/teacher"
        class="w-full flex items-center flex-col gap-y-0 px-4 router-link-disable"
      >
        <img
          v-if="$route.path == '/teacher'"
          src="~/assets/img/dashboard.svg"
          class="w-[29px]"
        />
        <img v-else src="~/assets/img/dashboard2.svg" class="w-[28px]" />
        <span
          :class="[
            $route.path == '/teacher' ? 'text-[#0050A8]' : 'text-[#737373]',
          ]"
          class="Grotesque-Light text-xs sm:text-[12px]"
        >
          Dashboard
        </span>
      </NuxtLink>

      <NuxtLink
        href="/teacher/grades"
        class="w-full flex items-center gap-x-0 flex-col router-link-disable px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[29px]"
          :class="[
            $route.path == '/teacher/grades'
              ? 'text-[#0050A8]'
              : 'text-[#737373]',
          ]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 16v-8m0 0-3 3m3-3 3 3M4.5 15.75V6a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 6v9.75m-15 0h15m-15 0A2.25 2.25 0 006.75 18h10.5a2.25 2.25 0 002.25-2.25"
          />
        </svg>

        <span
          :class="[
            $route.path == '/teacher/grades'
              ? 'text-[#0050A8]'
              : 'text-[#737373]',
          ]"
          class="Grotesque-Light text-xs sm:text-[12px]"
        >
          Upload
        </span>
      </NuxtLink>
      <NuxtLink
        href="/teacher/student-performance/all"
        class="w-full flex items-center flex-col router-link-disable px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[29px]"
          :class="[
            $route.path.includes('/teacher/student-performance')
              ? 'text-[#0050A8]'
              : 'text-[#737373]',
          ]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 18v-6a3 3 0 013-3h12a3 3 0 013 3v6m-3-3a3 3 0 11-6 0 3 3 0 116 0zm-7-6V5a1 1 0 011-1h2a1 1 0 011 1v4"
          />
        </svg>

        <span
          :class="[
            $route.path.includes('/teacher/student-performance')
              ? 'text-[#0050A8]'
              : 'text-[#737373]',
          ]"
          class="Grotesque-Light text-xs sm:text-[12px]"
        >
          performance
        </span>
      </NuxtLink>

      <NuxtLink
        href="/teacher/notifications"
        class="w-full flex items-center gap-x-0 flex-col router-link-disable px-4"
      >
        <img
          v-if="$route.path == '/teacher/notifications'"
          src="~/assets/img/bell.svg"
          class="w-[29px]"
        />
        <img v-else src="~/assets/img/bell2.svg" class="w-[29px]" />
        <span
          :class="[
            $route.path == '/teacher/notifications'
              ? 'text-[#0050A8]'
              : 'text-[#737373]',
          ]"
          class="Grotesque-Light text-xs sm:text-[12px]"
        >
          Alerts
        </span>
      </NuxtLink>
    </div>

    <!-- header -->

    <section
      class="h-full bg-white w-full overflow-y-scroll scroll-smooth sm:w-[77%] lg:w-[82%] grid grid-cols-12 py-4 gap-x-2"
    >
      <div class="col-span-12 h-full w-full overflow-y-scroll scroll-smooth">
        <div class="w-full gap-x-1 lg:gap-x-6 px-4 sm:px-10">
          <div class="w-full pt-3 flex items-center justify-between">
            <h1
              class="Grotesque-Bold font-semibold sm:text-xl text-md text-[#010109] hidden sm:block"
            >
              Hello John
            </h1>
            <div
              class="w-[30%] flex items-center justify-center border border-grey-200 bg-white rounded-md h-[60px] sm:hidden"
            >
              <img
                src="~/assets/img/logo-eduaize.png"
                class="w-[15rem] max-w-none me-5"
              />
            </div>
            <div
              @click="searchStore.handleToggleSearch"
              v-if="!searchStore.openSearch"
              class="relative sm:w-auto w-[60%]"
            >
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
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/stores/search";

const searchStore = useSearchStore();
</script>
<style scoped>
.router-link-exact-active {
  border-left: 4px solid #0050a8;
}
.router-link-disable {
  border-left: none !important;
}
</style>
