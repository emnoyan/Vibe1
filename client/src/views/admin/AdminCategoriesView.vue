<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';

const categoriesStore = useCategoriesStore();
const { categories, loading, error } = storeToRefs(categoriesStore);

const isModalOpen = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: 0,
  name: '',
  slug: '',
});

onMounted(() => {
  categoriesStore.fetchCategories();
});

function openCreateModal() {
  isEditing.value = false;
  formData.value = { id: 0, name: '', slug: '' };
  isModalOpen.value = true;
}

function openEditModal(cat: any) {
  isEditing.value = true;
  formData.value = { id: cat.id, name: cat.name, slug: cat.slug };
  isModalOpen.value = true;
}

async function handleSubmit() {
  try {
    if (isEditing.value) {
      await categoriesStore.updateCategory(formData.value.id, formData.value);
    } else {
      await categoriesStore.createCategory(formData.value);
    }
    isModalOpen.value = false;
  } catch (e) {
    // Error handled in store
  }
}

async function handleDelete(id: number) {
  if (confirm('Are you sure?')) {
    await categoriesStore.deleteCategory(id);
  }
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Categories</h1>
        <p class="mt-2 text-sm text-gray-700">Manage blog categories.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button @click="openCreateModal" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Add Category</button>
      </div>
    </div>
    
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Slug</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="cat in categories" :key="cat.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ cat.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ cat.slug }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button @click="openEditModal(cat)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                  <button @click="handleDelete(cat.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" @click.self="isModalOpen = false">
          <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">{{ isEditing ? 'Edit Category' : 'New Category' }}</h3>
            <div class="mt-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="formData.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Slug</label>
                <input v-model="formData.slug" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
              </div>
            </div>
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button @click="handleSubmit" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:col-start-2">Save</button>
              <button @click="isModalOpen = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
