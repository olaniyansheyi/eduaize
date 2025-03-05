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
      <form
        @submit.prevent="handleLogin"
        class="w-full mt-6 flex flex-col gap-y-4"
      >
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
            required
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
            required
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

      <button @click="handleAddScore">create Score</button>
    </div>
  </div>
  <Spinner v-if="isLoading" />
</template>

<script setup>
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import eye from "~/assets/img/Eye.png";
import eyeSlash from "~/assets/img/eye-slash.png";
import { useAuthStore } from "~/stores/auth.js";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const passwordVisible = ref(false);
const password = ref("12345678");
const email = ref("olaniyansheyi1704@gmail.com");

const isOpen = ref(false);
const selectedOption = ref("Teacher");
const options = ref(["Teacher", "Admin", "Parent", "student"]);

const isLoading = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;

  switch (option) {
    case "Teacher":
      email.value = "olaniyansheyi1704@gmail.com";
      break;
    case "Admin":
      email.value = "jonasbenson1704@gmail.com";
      break;
    case "Parent":
      email.value = "williamvictor1704@gmail.com";
      break;
    case "student":
      email.value = "williamjohn1704@gmail.com";
      break;
    default:
      email.value = "olaniyansheyi1704@gmail.com";
  }
};

onMounted(() => {
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".relative")) {
      isOpen.value = false;
    }
  });
});

async function handleLogin() {
  isLoading.value = true;

  try {
    const response = await authStore.login({
      email: email.value,
      password: password.value,
    });

    if (authStore.error) {
      throw new Error(authStore.error);
    }

    toast.success("Login Successful!");
    router.push(`/${selectedOption.value.toLowerCase()}`);
  } catch (error) {
    toast.error(`Login Failed: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
}

async function handleAddScore() {
  isLoading.value = true;

  const scoreData = {
    student_details: {
      name: "enyi vivian",
      email: "enyivivian1704@gmail.com",
      studentId: "2020-0009",
      class: "Grade 8A-Science",
    },
    subjects: {
      English: {
        term_1_scores: [30, 25, 28],
        term_2_scores: [20, 15, 18],
        average_term_1: 27,
        average_term_2: 18,
        attendance: { term_1: 5, term_2: 3 },
        teacher_remark: {
          term_1: "Weak in comprehension",
          term_2: "Struggling with basic grammar",
        },
      },
      Math: {
        term_1_scores: [15, 12, 18],
        term_2_scores: [10, 8, 12],
        average_term_1: 15,
        average_term_2: 10,
        attendance: { term_1: 4, term_2: 3 },
        teacher_remark: {
          term_1: "Poor arithmetic skills",
          term_2: "Needs intensive remedial sessions",
        },
      },
      Physics: {
        term_1_scores: [22, 20, 18],
        term_2_scores: [18, 15, 12],
        average_term_1: 20,
        average_term_2: 15,
        attendance: { term_1: 6, term_2: 5 },
        teacher_remark: {
          term_1: "Struggles with experiments",
          term_2: "Fails to grasp key concepts",
        },
      },
      Biology: {
        term_1_scores: [25, 22, 20],
        term_2_scores: [18, 16, 15],
        average_term_1: 22,
        average_term_2: 16,
        attendance: { term_1: 5, term_2: 4 },
        teacher_remark: {
          term_1: "Needs to focus on theory",
          term_2: "Struggles with memorization",
        },
      },
      History: {
        term_1_scores: [30, 28, 25],
        term_2_scores: [22, 18, 20],
        average_term_1: 28,
        average_term_2: 20,
        attendance: { term_1: 6, term_2: 5 },
        teacher_remark: {
          term_1: "Does not participate in discussions",
          term_2: "Weak retention of historical events",
        },
      },
    },
    created_at: new Date().toISOString(),
  };

  try {
    await authStore.addScore(scoreData);
    toast.success("Score added successfully!");
  } catch (error) {
    toast.error(`Failed to add score: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
}
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
