<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-xl font-bold text-indigo-600">MyBlog</router-link>
            </div>
          </div>
          <div class="flex items-center">
            <template v-if="authStore.isAuthenticated">
               <router-link to="/admin/dashboard" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</router-link>
            </template>
            <template v-else>
               <router-link to="/login" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
               <router-link to="/register" class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Register</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <slot />
    </main>
    <footer class="bg-white mt-12 border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
         <p class="text-center text-base text-gray-400">&copy; 2025 MyBlog. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
