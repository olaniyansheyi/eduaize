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
      class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-start justify-start pt-3 pb-10"
    >
      <!-- Your notifications -->

      <div
        v-if="receivedNotifications.length > 0"
        class="flex flex-col justify-start items-center gap-y-8 border-b-[1px] border-b-[#F4F4FB] pb-6"
      >
        <h1 class="Grotesque-Regular text-md text-[#010109] me-auto">
          Your notifications
        </h1>
        <div class="w-full flex justify-start items-center gap-y-11 flex-col">
          <div
            v-for="notification in receivedNotifications"
            :key="notification.id"
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <div
              class="w-[50px] h-[50px] rounded-full bg-[#F5FBEF] flex justify-center items-center flex-shrink-0"
            >
              <h1 class="Grotesque-Bold text-lg text-[#669F2A]">SE</h1>
            </div>

            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[14px] text-[hsl(240,8%,20%)]">
                {{ notification.message }}
              </h3>
              <h4 class="Grotesque-Regular text-[12px] text-[#737373]">
                {{ formatDate(notification.created_at) }}
              </h4>

              <!-- Read Status -->
              <span
                class="text-xs px-2 py-1 rounded-md"
                :class="
                  notification.is_read
                    ? 'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'
                "
              >
                {{ notification.is_read ? "Read" : "Unread" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- notification you sent -->

      <div
        v-if="sentNotifications.length > 0"
        class="flex flex-col justify-start items-center gap-y-8 border-b-[1px] border-b-[#F4F4FB] py-5"
      >
        <h1 class="Grotesque-Regular text-md text-[#010109] me-auto">
          Notifications You Sent
        </h1>
        <div class="w-full flex justify-start items-center gap-y-11 flex-col">
          <div
            v-for="notification in sentNotifications"
            :key="notification.id"
            class="w-full justify-start items-start gap-x-6 cursor-pointer flex"
          >
            <img src="~/assets/img/avatar1.png" class="" />
            <div class="flex flex-col items-start justify-start gap-y-2">
              <h3 class="Grotesque-Regular text-[14px] text-[hsl(240,8%,20%)]">
                {{ notification.message }}
              </h3>
              <h4 class="Grotesque-Regular text-[12px] text-[#737373]">
                {{ formatDate(notification.created_at) }}
              </h4>

              <!-- Read Status -->
              <span
                class="text-xs px-2 py-1 rounded-md"
                :class="
                  notification.is_read
                    ? 'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'
                "
              >
                {{ notification.is_read ? "Read" : "Unread" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        title="Alert parent or school admin"
        :options="['parent', 'teacher', 'student']"
        messagePlaceholder="Enter your message"
        v-model:isOpen="isOpen"
      />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

import { useNotificationStore } from "~/stores/notification";

const notificationStore = useNotificationStore();

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

// Fetch user data when component mounts
onMounted(() => {
  loadUserFromLocalStorage();
});

watch(
  () => userDetails.value.id,
  (newId) => {
    if (newId) {
      notificationStore.getNotifications(newId);
      console.log(notificationStore.notifications);
    }
  },
  { immediate: true }
);

const isOpen = ref(false);

const handleIsOpen = () => {
  isOpen.value = !isOpen.value;
};

// Separate received and sent notifications
const receivedNotifications = computed(() => {
  return notificationStore.notifications.filter(
    (n) => n.receiver_id === userDetails.value.id
  );
});

const sentNotifications = computed(() => {
  return notificationStore.notifications.filter(
    (n) => n.sender_id === userDetails.value.id
  );
});

// Format date function
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
</script>

<style scoped></style>
