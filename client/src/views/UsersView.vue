<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/users';
import UserModal from '../components/UserModal.vue';

const store = useUsersStore();
const { users, loading, fetching, error } = storeToRefs(store);
const isModalOpen = ref(false);
const selectedUser = ref<any>(null);

onMounted(() => {
  store.fetchUsers();
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
};

const handleUpdateUser = async (formData: any) => {
  if (selectedUser.value) {
    await store.updateUser(selectedUser.value.id, formData);
    isModalOpen.value = false;
    selectedUser.value = null;
  }
};

const handleDeleteUser = async (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await store.deleteUser(id);
  }
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  store.error = null;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 p-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your team members and their account permissions.</p>
      </div>
      <button 
        @click="openCreateModal"
        :disabled="loading"
        class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Add Member
      </button>
    </div>

    <div v-if="error && !isModalOpen" class="mb-8 rounded-md bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-indigo-50 p-3 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500">User Info</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500">Role</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500">Status</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="fetching" class="animate-pulse">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">Loading users...</td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">No users found.</td>
            </tr>
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50/50 transition-colors">
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
                <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">User</span>
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
                  <button @click="openEditModal(user)" class="text-gray-400 hover:text-indigo-600 transition-colors">Edit</button>
                  <button @click="handleDeleteUser(user.id)" class="text-gray-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <UserModal 
      :isOpen="isModalOpen" 
      :initialData="selectedUser"
      :error="error"
      @close="handleCloseModal" 
      @save="handleSaveUser" 
      @update="handleUpdateUser"
    />
  </div>
</template>
