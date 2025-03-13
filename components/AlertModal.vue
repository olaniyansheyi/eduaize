<template>
  <Modal
    :model-value="isOpen"
    @update:model-value="emit('update:isOpen', $event)"
  >
    <div class="w-full">
      <div class="flex flex-col gap-y-1 mb-3">
        <p class="Grotesque-Regular text-[16px] text-[#737373]">
          {{ title }}
        </p>
      </div>

      <div class="w-full flex flex-col gap-y-4">
        <!-- Select Recipient -->
        <div
          class="select-container w-full"
          :class="isOpenDropDown ? 'h-[10.5rem]' : ''"
        >
          <label class="Grotesque-Regular text-md text-[#010109]"
            >Select Recipient</label
          >

          <div
            class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg flex items-center justify-between cursor-pointer relative mb-2 mt-1"
            @click="toggleDropdown"
          >
            <span>{{ selectedOption }}</span>
            <img src="~/assets/img/icons/selectdown.png" />
          </div>

          <ul
            v-if="isOpenDropDown"
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

        <!-- ID Field (if required) -->
        <div v-if="selectedOption !== 'School Admin'" class="w-full">
          <label class="Grotesque-Regular text-md text-[#010109]">{{
            idPlaceholder
          }}</label>
          <input
            v-model="receiverId"
            type="text"
            class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            :placeholder="idPlaceholder"
          />
        </div>

        <!-- Message Field -->
        <div class="w-full">
          <label class="Grotesque-Regular text-md text-[#010109]">{{
            messagePlaceholder
          }}</label>
          <textarea
            v-model="message"
            class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[87px] px-3 rounded-lg outline-none mb-2 mt-1 py-3"
          />
        </div>

        <button
          class="w-full py-3 bg-[#0050AB] text-white rounded-lg"
          @click="
            () => {
              alert();
            }
          "
        >
          Alert
        </button>
      </div>
    </div>
    <Spinner v-if="isLoading" />
  </Modal>
</template>

<script setup>
import { useNotificationStore } from "~/stores/notification";

const notificationStore = useNotificationStore();
const { $toast } = useNuxtApp();

const isLoading = ref(false);
const props = defineProps({
  isOpen: Boolean,
  title: String,
  options: Array,
  idPlaceholder: String,
  messagePlaceholder: String,
});

const emit = defineEmits(["update:isOpen"]);

const isOpenDropDown = ref(false);
const selectedOption = ref(props.options[0]);
const receiverId = ref("");
const message = ref("");
const senderId = ref("");

const toggleDropdown = () => {
  isOpenDropDown.value = !isOpenDropDown.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpenDropDown.value = false;
  if (selectedOption.value === "parent") {
    receiverId.value = "0bca4661-1a46-4f15-a536-039b403a0c06";
  } else if (selectedOption.value === "teacher") {
    receiverId.value = "0376446e-79a3-4572-b9c5-2c855246f72a";
  } else if (selectedOption.value === "admin") {
    receiverId.value = "b7fa2a6a-8f84-4f18-abca-34210a5960af";
  } else {
    receiverId.value = "ad83850a-cfe9-4c0f-b744-d29d2b7e0737";
  }
};

// Close modal and emit event to parent
const closeModal = () => {
  emit("update:isOpen", false);
};

const userDetails = ref({
  id: "",
  email: "",
  address: "",
  fullName: "",
});

const loadUserFromLocalStorage = () => {
  if (process.client) {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      userDetails.value = {
        id: userData.id,
        email: userData.user_metadata?.email || "N/A",
        address: userData.user_metadata?.address || "N/A",
        fullName: userData.user_metadata?.fullName || "N/A",
      };
    }
  }
};

console.log(userDetails.value);

// Fetch user data when component mounts
onMounted(() => {
  loadUserFromLocalStorage();
});

watch(
  () => userDetails.value.id,
  (newId) => {
    if (newId) {
      senderId.value = newId;
    }
  },
  { immediate: true }
);

const alert = async () => {
  if (senderId.value === "" || receiverId.value === "" || message.value === "")
    return $toast.error("please you need to alert something important!");
  try {
    isLoading.value = true;

    await notificationStore.createNotification({
      senderId: senderId.value,
      receiverId: receiverId.value,
      message: message.value,
    });

    $toast.success("Notification sent successfully!");
  } catch (error) {
    console.error("Error in alert function:", error);
    $toast.error("Something went wrong.");
  } finally {
    isLoading.value = false;
    closeModal();
  }
};
</script>
