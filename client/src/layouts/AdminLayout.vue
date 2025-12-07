<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

const sidebarOpen = ref(false);
const route = useRoute();

// Close sidebar on route change
watch(() => route.path, () => {
  sidebarOpen.value = false;
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <!-- Mobile backdrop -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity md:hidden"
      @click="sidebarOpen = false"
    ></div>

    <Sidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
    
    <div class="flex flex-1 flex-col overflow-hidden">
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="flex-1 overflow-y-auto bg-gray-50 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
