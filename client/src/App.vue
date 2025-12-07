<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';

const route = useRoute();
const layout = computed(() => {
  if (route.meta.layout === 'AdminLayout') return AdminLayout;
  if (route.meta.layout === 'PublicLayout') return PublicLayout;
  return PublicLayout; // Default to PublicLayout? Or 'div'. For Guest pages 'div' is fine? Guest pages usually need PublicLayout (Header).
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
