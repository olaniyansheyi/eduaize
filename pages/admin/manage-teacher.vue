<template>
  <h1 class="Grotesque-regular text-xl py-6 text-[#010109]">Manage Teacher</h1>

  <div class="w-full flex justify-between items-start flex-wrap gap-5 mt-4">
    <div
      class="rounded-xl flex justify-center items-center bg-[#F7F7F7] p-4 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
    >
      <div class="flex justify-center items-center flex-col gap-y-1 mx-auto">
        <p class="text-[#010109] text-lg font-bold">{{ totalTeachers }}</p>
        <h3 class="Grotesque-Regular text-[#737373] text-sm text-center">
          Toatal Teacher
        </h3>
      </div>
    </div>
    <div
      class="rounded-xl py flex justify-center items-start gap-x-2 bg-[#F7F7F7] p-4 w-full sm:w-[47%] sm:gap-x-0 lg:w-[22%]"
    >
      <div class="flex justify-center items-center flex-col gap-y-1 mx-auto">
        <p class="text-[#010109] text-lg font-bold">{{ totalClasses }}</p>
        <h3
          class="me-auto Grotesque-Regular text-[#737373] text-sm whitespace-nowrap"
        >
          Toatal Class
        </h3>
      </div>
    </div>
  </div>

  <!-- teacher table  -->

  <div
    class="w-full border-[1px] border-[#F4F4FB] rounded-2xl px-8 flex flex-col items-center justify-center my-10 gap-y-5 pb-10"
  >
    <div class="w-full mt-3 mb-4 flex justify-between items-center">
      <div>
        <h3 class="Grotesque-Regular text-md text-[#010109]">
          Teacher Database
        </h3>
      </div>

      <!-- filter -->

      <button
        @click="openCreateTeacherModal"
        class="bg-[#0050A8] text-white whitespace-nowrap text-sm px-3 md:px-8 rounded-lg py-3 sm:text-sm lg:text-lg"
      >
        Create New
      </button>
    </div>

    <!-- table element -->
    <div
      class="flex flex-col w-full overflow-x-auto overflow-y-auto max-w-full h-[331px]"
    >
      <!-- Header -->
      <div
        class="flex justify-between bg-[#F9F9F9] items-center w-[1000px] px-5 h-[68px]"
      >
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Teacher Name</h3>
        </div>
        <div class="flex-1 text-left">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Subject</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Email</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">ID</h3>
        </div>
        <div class="flex-1 text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Status</h3>
        </div>
        <div class="w-[5%] text-center">
          <h3 class="Grotesque-Regular text-md text-[#010109]">Action</h3>
        </div>
      </div>

      <!-- Row with dropdown -->
      <div
        v-for="(teacher, index) in teachers"
        :key="index"
        class="flex justify-between border-b items-center border-b-[#E9E5E5] w-[1000px] h-[68px] px-5 relative"
      >
        <div class="flex-1 text-left">
          <div class="flex w-full justify-start items-center gap-x-3">
            <img
              :src="teacher.avatar_url"
              class="w-[28px] rounded-full"
              lt=""
            />
            <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
              {{ teacher.name }}
            </p>
          </div>
        </div>
        <div class="flex-1 text-left">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ teacher.subjects }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ teacher.email }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            {{ teacher.teacher_id }}
          </p>
        </div>
        <div class="flex-1 text-center">
          <button
            :class="[
              'py-1 px-8 rounded-lg text-[14px]',
              teacher.status === 'Inactive' ? 'fail-btn' : 'pass-btn',
            ]"
          >
            {{ teacher.status }}
          </button>
        </div>
        <div class="w-[4%] text-center cursor-pointer relative">
          <img
            src="~/assets/img/icons/dotted-menu.png"
            alt="Menu"
            @click="toggleDropdownDelete(index)"
          />
          <!-- action modal -->
          <div
            v-if="dropdownVisible === index"
            class="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-[120px] py-2 z-10 Px-4"
          >
            <button
              class="block w-full text-left px-4 py-2 text-[#C9252D] hover:bg-gray-100 text-xs"
              @click="openDeleteRoleModal(teacher.id)"
            >
              Delete Teacher
            </button>
            <button
              class="block w-full text-left px-4 py-2 text-[#0050A8] hover:bg-gray-100 text-xs"
              @click="openEditTeacherModal(teacher)"
            >
              Edit Teacher
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- paginations buttons -->

    <div
      class="w-full justify-between flex flex-wrap items-center gap-y-5 mt-5"
    >
      <div class="flex justify-center items-center gap-x-4">
        <p class="text-[#737373] Grotesque-Regular text-[14px]">
          Rows per page
        </p>
        <select
          class="w-[64px] h-[32px] border-[1px] border-[#E9E5E5] rounded-lg outline-none px-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      <div class="flex justify-start items-center gap-x-1 flex-wrap gap-y-5">
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          First
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          Previuos
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          1
        </button>
        <button
          class="bg-[#0050AB] rounded-lg px-4 py-1 cursor-pointer text-white Grotesque-Regular text-[14px]"
        >
          2
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          ....
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          Next
        </button>
        <button
          class="border-[1px] border-[#E9E5E5] rounded-lg px-4 py-1 cursor-pointer text-[#737373] Grotesque-Regular text-[14px]"
        >
          Last
        </button>
        <p class="text-[#737373] Grotesque-Regular text-[14px] lg:ms-2">
          1-10 of 346 Results
        </p>
      </div>
    </div>

    <!-- modal for delete user -->

    <Modal v-model="isDeleteRoleModalOpen">
      <div class="flex flex-col gap-y-4 justify-center items-center w-full">
        <div class="flex flex-col gap-y-1 justify-center items-center">
          <img src="~/assets/img/unknown-user.png" alt="" />
          <h2 class="text-[#1A1A1A] Grotesque-Regular">Delete Teacher?</h2>
          <p class="text-[#4B4B4B] Grotesque-Regular text-[14px]">
            All data will be permanently lost
          </p>
        </div>
        <div class="flex flex-col gap-y-1 justify-center items-center w-full">
          <button
            @click="deleteTeacher"
            class="bg-[#EF3333] py-2 w-full text-white rounded-lg Grotesque-Regular"
          >
            Yes, please
          </button>

          <button
            @click="closeModal"
            class="bg-none py-2 w-full text-[#4B4B4B] Grotesque-Regular"
          >
            No, dont
          </button>
        </div>
      </div>
    </Modal>

    <!-- Create Teacher Modal -->
    <Modal v-model="isCreateTeacherModalOpen">
      <div class="flex flex-col gap-y-4 justify-center items-center w-full">
        <h2 class="text-[#1A1A1A] Grotesque-Regular">Create Teacher</h2>
        <div class="w-full lg:w-[45%] flex flex-col gap-y-4">
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Teacher Name</label
            >
            <input
              type="text"
              v-model="editTeacherData.name"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Subject</label
            >
            <input
              type="text"
              v-model="editTeacherData.subjects"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Email</label
            >
            <input
              type="email"
              v-model="editTeacherData.email"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]">id</label>
            <input
              type="text"
              v-model="editTeacherData.teacher_id"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <div class="w-full">
            <label class="Grotesque-Regular text-md text-[#010109]"
              >Upload Avatar</label
            >
            <input
              type="file"
              class="custom-select w-full bg-[#F9F9FC] border-[1px] h-[50px] px-3 rounded-lg outline-none mb-2 mt-1"
            />
          </div>
          <button
            @click="submitEditTeacher"
            class="bg-[#0050A8] py-2 w-full text-white rounded-lg"
          >
            {{ isEditMode ? "Update Teacher" : "Create Teacher" }}
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import personImg from "~/assets/img/person.png";

import { useAdminStore } from "~/stores/admin";
import { useToast } from "vue-toastification";

const toast = useToast();

const adminStore = useAdminStore();
const teachers = ref([]); // Reactive array

const fetchTeachers = async () => {
  await adminStore.getTeachers();
};

// Watch for changes in the store and update `teachers`
watchEffect(() => {
  teachers.value = adminStore.teachers || [];
});

onMounted(async () => {
  await fetchTeachers();
});

const isEditMode = ref(false);
const editTeacherData = ref({});
const selectedTeacherId = ref(null);

const isCreateTeacherModalOpen = ref(false);
const openCreateTeacherModal = () => {
  isEditMode.value = false;
  editTeacherData.value = {
    name: "",
    subject: "",
    email: "",
    phone: "",
    image: null,
  };
  isCreateTeacherModalOpen.value = true;
};
const closeCreateTeacherModal = () => (isCreateTeacherModalOpen.value = false);

const dropdownVisible = ref(null);

const isDeleteRoleModalOpen = ref(false);
const openDeleteRoleModal = (teacherId) => {
  isDeleteRoleModalOpen.value = true;
  dropdownVisible.value = null;
  selectedTeacherId.value = teacherId;
};

const openEditTeacherModal = (teacher) => {
  isEditMode.value = true;
  editTeacherData.value = { ...teacher };
  isCreateTeacherModalOpen.value = true;
};

const toggleDropdownDelete = (index) => {
  dropdownVisible.value = dropdownVisible.value === index ? null : index;
};

const closeModal = () => {
  isDeleteRoleModalOpen.value = false;
};

const fetchteachers = async () => {
  await adminStore.getTeachers();
};

onMounted(async () => {
  await fetchteachers();
  console.log(adminStore.teachers);
});

// Compute total number of teachers
const totalTeachers = computed(() => teachers.value.length);

// Compute total unique classes
const totalClasses = computed(() => {
  const classSet = new Set();
  teachers.value.forEach((teacher) => {
    let assignedClasses = teacher.classAssigned;
    if (assignedClasses) {
      // If classAssigned is a string of JSON array, parse it
      if (
        typeof assignedClasses === "string" &&
        assignedClasses.startsWith("[")
      ) {
        assignedClasses = JSON.parse(assignedClasses);
      }
      if (Array.isArray(assignedClasses)) {
        assignedClasses.forEach((cls) => classSet.add(cls));
      } else if (typeof assignedClasses === "string") {
        classSet.add(assignedClasses);
      }
    }
  });
  return classSet.size;
});

const deleteTeacher = async () => {
  await adminStore.deleteTeacher(selectedTeacherId.value);
  isDeleteRoleModalOpen.value = false;

  toast.success("teacher deleted succesfully");
  closeModal();
};

// Submit Edit Teacher
const submitEditTeacher = async () => {
  const result = await adminStore.editTeacher(editTeacherData.value);
  isCreateTeacherModalOpen.value = false;

  toast.success("teacher updated succesfully");

  closeCreateTeacherModal();
};
</script>
