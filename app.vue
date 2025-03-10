<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtPage />
      <SearchTab v-if="searchStore.openSearch" />
    </NuxtLayout>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script setup>
import { useSearchStore } from "~/stores/search.js";
import { useAuthStore } from "~/stores/auth";
import { useStudentStore } from "~/stores/student";

const studentStore = useStudentStore();
const isLoading = ref(false);

const authStore = useAuthStore();

const fetchStudents = async () => {
  isLoading.value = true;
  await studentStore.getStudents();
  isLoading.value = false;
};

const searchStore = useSearchStore();
fetchStudents();
onMounted(() => {
  if (process.client) {
    authStore.loadUser(); // This will now work only on the client

    if (authStore.user) {
      authStore.getCurrentUser();
    }
  }
});
</script>
