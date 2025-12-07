<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const route = useRoute();
const authStore = useAuthStore();

const navigation = computed(() => {
  const nav = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
    { name: 'Posts', href: '/admin/posts', icon: 'DocumentText' },
  ];

  if (authStore.user?.role === 'ADMIN') {
    nav.push({ name: 'Users', href: '/admin/users', icon: 'Users' });
    nav.push({ name: 'Categories', href: '/admin/categories', icon: 'Folder' });
    nav.push({ name: 'Invoices', href: '/admin/invoices', icon: 'DocumentDuplicate' });
  }

  return nav;
});

defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits(['close']);

const isCurrent = (path: string) => route.path === path;
</script>

<template>
  <div 
    class="fixed inset-y-0 z-50 flex w-64 flex-col bg-gray-900 transition-transform duration-300 ease-in-out md:static md:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-16 shrink-0 items-center justify-between bg-gray-800 px-6">
      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
      <button @click="emit('close')" class="text-gray-400 hover:text-white md:hidden">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <nav class="flex flex-1 flex-col px-6 py-4">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.href"
                :class="[
                  isCurrent(item.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                ]"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
