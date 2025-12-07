<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/users';
import { useAuthStore } from '../stores/auth';
import { useCategoriesStore } from '../stores/categories';
import UserModal from '../components/UserModal.vue';

const store = useUsersStore();
const authStore = useAuthStore();
const categoriesStore = useCategoriesStore();
const { users, stats, loading, fetching, error } = storeToRefs(store);
const isModalOpen = ref(false);
const selectedUser = ref<any>(null);
const selectedUserIds = ref<number[]>([]);
const searchQuery = ref('');
const selectedRole = ref('');
const selectedStatus = ref('');
const sortBy = ref('id');
const sortOrder = ref<'asc' | 'desc'>('asc');

const allSelected = computed(() => {
  return users.value.length > 0 && selectedUserIds.value.length === users.value.length;
});

const indeterminate = computed(() => {
    return selectedUserIds.value.length > 0 && selectedUserIds.value.length < users.value.length;
});

const toggleAll = () => {
  if (allSelected.value) {
    selectedUserIds.value = [];
  } else {
    selectedUserIds.value = users.value.map(u => u.id);
  }
};

const toggleSelection = (id: number) => {
  const index = selectedUserIds.value.indexOf(id);
  if (index === -1) {
    selectedUserIds.value.push(id);
  } else {
    selectedUserIds.value.splice(index, 1);
  }
};

const handleBulkDelete = async () => {
  if (selectedUserIds.value.length === 0) return;
  
  if (confirm(`Are you sure you want to delete ${selectedUserIds.value.length} users?`)) {
    await store.bulkDeleteUsers(selectedUserIds.value);
    selectedUserIds.value = [];
    store.fetchStats();
  }
};

let debounceTimer: ReturnType<typeof setTimeout>;
const debouncedFetch = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchData();
  }, 500);
};

const fetchData = () => {
  store.fetchUsers({
    q: searchQuery.value,
    role: selectedRole.value || undefined,
    status: selectedStatus.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

watch([selectedRole, selectedStatus], () => {
  fetchData();
});

watch(searchQuery, () => {
  debouncedFetch();
});

const toggleSort = (column: string) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  fetchData();
};


onMounted(() => {
  fetchData();
  store.fetchStats();
  if (authStore.user?.role === 'ADMIN') {
      categoriesStore.fetchCategories();
  }
});

const openCreateModal = () => {
  store.error = null;
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user: any) => {
  store.error = null;
  selectedUser.value = user;
  isModalOpen.value = true;
};

const handleSaveUser = async (formData: any) => {
  await store.createUser(formData);
  isModalOpen.value = false;
  store.fetchStats();
};

const handleUpdateUser = async (formData: any) => {
  if (selectedUser.value) {
    await store.updateUser(selectedUser.value.id, formData);
    isModalOpen.value = false;
    selectedUser.value = null;
    store.fetchStats();
  }
};

const handleDeleteUser = async (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await store.deleteUser(id);
    store.fetchStats();
  }
};



const handleCloseModal = () => {
  isModalOpen.value = false;
  store.error = null;
};
</script>

<template>
  <div class="h-full">
    <div v-if="error && error.toLowerCase().includes('forbidden')" class="flex h-full flex-col items-center justify-center text-center">
      <div class="rounded-full bg-red-100 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      </div>
      <h3 class="mt-4 text-lg font-semibold text-gray-900">Access Denied</h3>
      <p class="mt-2 text-sm text-gray-500 max-w-sm">{{ error }}</p>
      <button @click="authStore.logout()" class="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Sign in with different account
      </button>
    </div>

    <div v-else class="h-full">
      <div class="sticky top-0 z-10 bg-gray-50 py-4 px-8 sm:flex sm:items-center border-b border-gray-200/50 backdrop-blur-sm bg-gray-50/95 sticky-header">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
          <p class="mt-1 text-sm text-gray-500">Manage your team members and their account permissions.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-3">
          <button 
            v-if="selectedUserIds.length > 0 && $can('delete', 'User')"
            @click="handleBulkDelete"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
             Delete Selected ({{ selectedUserIds.length }})
          </button>
          
          <button 
            v-if="$can('create', 'User')"
            @click="openCreateModal"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Add Member
          </button>
        </div>
      </div>

    <div class="p-8">
    <div v-if="error && !isModalOpen" class="mb-8 rounded-md bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
      <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-indigo-50 p-3 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-green-50 p-3 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Active / Inactive</p>
            <div class="flex items-baseline gap-2">
                <p class="text-2xl font-bold text-gray-900">{{ stats?.active || 0 }}</p>
                <p class="text-sm text-gray-400">/ {{ stats?.inactive || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-purple-50 p-3 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Admin / User</p>
            <div class="flex items-baseline gap-2">
                <p class="text-2xl font-bold text-gray-900">{{ stats?.admin || 0 }}</p>
                <p class="text-sm text-gray-400">/ {{ stats?.user || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input v-model="searchQuery" type="text" class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search users...">
      </div>

      <div>
        <select v-model="selectedRole" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <div>
        <select v-model="selectedStatus" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                <input type="checkbox" :checked="allSelected" :indeterminate="indeterminate" @change="toggleAll" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-700" @click="toggleSort('name')">
                User Info
                <span v-if="sortBy === 'name'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-700" @click="toggleSort('role')">
                Role
                <span v-if="sortBy === 'role'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-700" @click="toggleSort('status')">
                Status
                <span v-if="sortBy === 'status'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="fetching" class="animate-pulse">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">Loading users...</td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">No users found.</td>
            </tr>
            <tr v-for="user in users" :key="user.id" :class="[selectedUserIds.includes(user.id) ? 'bg-gray-50' : 'hover:bg-gray-50/50', 'transition-colors']">
              <td class="relative px-7 sm:w-12 sm:px-6">
                <div v-if="selectedUserIds.includes(user.id)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                <input type="checkbox" :checked="selectedUserIds.includes(user.id)" @change="toggleSelection(user.id)" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`" alt="Avatar" class="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ user.name || 'Unknown' }}</div>
                    <div class="text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{{ user.role }}</span>
              </td>
              <td class="px-6 py-4">
                <span v-if="user.status === 'ACTIVE'" class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span> Active
                </span>
                <span v-else class="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  <span class="h-1.5 w-1.5 rounded-full bg-gray-500"></span> Inactive
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button v-if="$can('update', 'User')" @click="openEditModal(user)" class="text-gray-400 hover:text-indigo-600 transition-colors">Edit</button>
                  <button v-if="$can('delete', 'User')" @click="handleDeleteUser(user.id)" class="text-gray-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>

    <UserModal 
      :isOpen="isModalOpen" 
      :initialData="selectedUser"
      :categories="categoriesStore.categories"
      :error="error"
      @close="handleCloseModal" 
      @save="handleSaveUser" 
      @update="handleUpdateUser"
    />
  </div>
</template>
