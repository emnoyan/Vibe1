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

const { locale } = useI18n();

const changeLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  locale.value = target.value;
  localStorage.setItem('locale', target.value);
};

// Start initialization from local storage
if (localStorage.getItem('locale')) {
    locale.value = localStorage.getItem('locale')!;
}
</script>

<style scoped>
.language-switcher select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}
</style>
