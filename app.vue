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

const searchStore = useSearchStore();
</script>
