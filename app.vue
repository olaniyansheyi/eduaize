<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtPage />
      <SearchTab v-if="searchStore.openSearch" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/stores/search.js";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const searchStore = useSearchStore();
onMounted(() => {
  if (process.client) {
    authStore.loadUser(); // This will now work only on the client

    if (authStore.user) {
      authStore.getCurrentUser();
    }
  }
});
</script>
