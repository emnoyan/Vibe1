<template>
  <div class="language-switcher">
    <select v-model="$i18n.locale" @change="changeLanguage">
      <option value="en">English</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { onMounted, watch } from 'vue';

const { locale } = useI18n();
const authStore = useAuthStore();

const changeLanguage = async (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLang = target.value;
  locale.value = newLang;
  localStorage.setItem('locale', newLang);

  if (authStore.isAuthenticated) {
    await authStore.updateLanguage(newLang);
  }
};

// Initialize from user preference if available, otherwise localStorage
onMounted(() => {
    if (authStore.user?.language) {
        locale.value = authStore.user.language;
    } else if (localStorage.getItem('locale')) {
        locale.value = localStorage.getItem('locale')!;
    }
});

// Watch for user changes (e.g. login) to update language
watch(() => authStore.user, (newUser) => {
    if (newUser?.language) {
        locale.value = newUser.language;
    }
});
</script>

<style scoped>
.language-switcher select {
  padding: 0.375rem 2rem 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #374151;
}
.language-switcher select:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: rgb(79 70 229);
}
</style>
