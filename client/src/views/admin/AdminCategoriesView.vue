<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
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

// Search & Sort State
const searchQuery = ref('');
const sortBy = ref('id');
const sortOrder = ref<'asc' | 'desc'>('desc');

let debounceTimer: ReturnType<typeof setTimeout>;

// Stats
const stats = computed(() => {
    return {
        total: categories.value.length,
    };
});

const fetchData = () => {
  categoriesStore.fetchCategories({
    q: searchQuery.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

watch(searchQuery, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchData();
    }, 500);
});

const toggleSort = (field: string) => {
    if (sortBy.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = field;
        sortOrder.value = 'asc';
    }
    fetchData();
};

onMounted(() => {
  fetchData();
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
  <div>
    <div class="sticky top-0 z-10 bg-gray-50 py-4 px-8 sm:flex sm:items-center border-b border-gray-200/50 backdrop-blur-sm bg-gray-50/95">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Categories</h1>
        <p class="mt-2 text-sm text-gray-700">Manage blog categories.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button @click="openCreateModal" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Add Category</button>
      </div>
    </div>
    
    <div class="p-8">
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

    <!-- Stats -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-indigo-50 p-3 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500">Total Categories</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Actions -->
    <div class="mt-4 flex gap-4">
        <div class="relative flex-1">
             <input v-model="searchQuery" type="text" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search categories...">
        </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer hover:text-gray-700" @click="toggleSort('name')">
                    Name <span v-if="sortBy === 'name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-700" @click="toggleSort('slug')">
                    Slug <span v-if="sortBy === 'slug'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-if="loading">
                    <td colspan="3" class="text-center py-4">Loading...</td>
                </tr>
                 <tr v-else-if="categories.length === 0">
                    <td colspan="3" class="text-center py-4">No categories found.</td>
                </tr>
              <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50 transition-colors">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ cat.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ cat.slug }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button @click="openEditModal(cat)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
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
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isModalOpen = false"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-hidden flex items-center justify-center p-4 sm:p-0">
        <div class="relative transform flex flex-col max-h-[calc(100vh-2rem)] overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full">
          <div class="px-4 pb-4 pt-5 sm:p-6 overflow-y-auto flex-1">
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
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 shrink-0 border-t border-gray-100 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button @click="handleSubmit" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:col-start-2">{{ $t('button.save') }}</button>
              <button @click="isModalOpen = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0">{{ $t('button.cancel') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
