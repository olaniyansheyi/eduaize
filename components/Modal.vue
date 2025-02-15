<template>
  <div
    v-if="isOpen"
    class="modal-overlay px-6 overflow-y-scroll"
    @click="closeModal"
  >
    <div
      class="bg-white rounded-lg px-10 pt-12 mb-20 pb-6 flex flex-col justify-center items-center gap-y-4 relative w-full md:w-[50%] lg:w-[25%]"
      @click.stop
    >
      <slot></slot>
      <img
        src="~/assets/img/cancel-btn.png"
        alt=""
        class="absolute top-4 right-4 cursor-pointer"
        @click="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(props.modelValue);

const closeModal = () => {
  isOpen.value = false;
  emit("update:modelValue", false);
};

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding-top: 10rem;
}
</style>
