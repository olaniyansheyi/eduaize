<template>
  <div
    class="w-full flex justify-center items-center lg:h-[120vh] md:h-[950px] bg-[#F7F7F7] py-20 lg:py-0"
  >
    <div class="rounded-lg bg-white py-16 px-10 sm:px-10 sm:w-[600px] lg:px-7">
      <div class="w-full h-full">
        <div class="flex flex-col justify-start items-start">
          <p class="Grotesque-Regular text-[16px] text-[#737373]">
            Welcome Back,
          </p>
        </div>
      </div>
      <form class="w-full mt-6 flex flex-col gap-y-4">
        <div
          class="select-container w-full"
          :class="isOpen ? ' h-[10.5rem]' : ''"
        >
          <label class="Grotesque-Regular text-md text-[#010109]">
            Login as
          </label>

          <div
            class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between cursor-pointer relative mb-2 mt-1"
            @click="toggleDropdown"
          >
            <span>{{ selectedOption }}</span>
            <img src="~/assets/img/icons/selectdown.png" class="" />
          </div>

          <ul
            v-if="isOpen"
            class="absolute left-0 top-[55%] w-full bg-white border-[1px] border-[#2F2B43]/10 rounded-lg shadow-lg z-10"
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
        <div class="w-full relative">
          <label class="Grotesque-Regular text-md text-[#010109]">
            Email
          </label>

          <input
            type="email"
            class="w-[280px] sm:w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between outline-none mb-2 mt-1 pe-10"
            v-model="email"
          />
        </div>

        <div class="w-full relative">
          <label class="Grotesque-Regular text-md text-[#010109]">
            Password
          </label>

          <input
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            type="text"
            class="w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between outline-none mb-2 mt-1 pe-10"
          />

          <img
            @click.stop="togglePasswordVisibility"
            class="absolute right-0 pr-4 flex items-start font-semibold focus:outline-none top-1/2 -translate-y-1/2 mt-3 cursor-pointer"
            :src="passwordVisible ? eyeSlash : eye"
            alt=""
          />
        </div>

        <button
          type="submit"
          class="w-ful py-3 bg-[#0050AB] text-white rounded-lg mt-6"
        >
          Login
        </button>

        <p
          class="text-sm text-[#737373] text-left cursor-pointer Grotesque-Regular my-2"
        >
          Don’t have an account?
          <span
            @click="$router.push('/auth?tab=signUp')"
            class="text-[#0050AB] cursor-pointer"
            >Create New</span
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import eye from "~/assets/img/Eye.png";
import eyeSlash from "~/assets/img/eye-slash.png";

const passwordVisible = ref(false);
const password = ref("");
const email = ref("");

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const isOpen = ref(false);
const selectedOption = ref("A teacher");
const options = ref(["A Teacher", "School Admin", "As Parent"]);

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

const { $supabase } = useNuxtApp();

async function fetchData() {
  const { data, error } = await $supabase.from("test").select("*");
  if (error) console.error(error);

  console.log(data, "data");
}

fetchData();
</script>

<style>
* {
  font-family: "cabinetGrotesk", sans-serif;
}

.extraboldCabinet {
  font-family: "cabinetGroteskBold", sans-serif;
}

.blackCabinet {
  font-family: "cabinetGroteskBlack", sans-serif;
}
.select-container {
  position: relative;
}

.custom-select {
  appearance: none;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
