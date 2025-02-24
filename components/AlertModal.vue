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

      <form class="w-full flex flex-col gap-y-4">
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
            class="custom-select w-full bg-[#F9F9FC] border-[1px] border-[#2F2B43]/10 h-[87px] px-3 rounded-lg outline-none mb-2 mt-1 py-3"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-[#0050AB] text-white rounded-lg"
          @click.prevent="closeModal"
        >
          Alert
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>
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

const toggleDropdown = () => {
  isOpenDropDown.value = !isOpenDropDown.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpenDropDown.value = false;
};

// Close modal and emit event to parent
const closeModal = () => {
  emit("update:isOpen", false);
};
</script>
