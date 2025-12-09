<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const form = reactive({
  name: '',
  email: '',
  password: '',
});

const handleRegister = async () => {
  await authStore.register(form.name, form.email, form.password);
};
</script>

<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('auth.create_account_title') }}</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('auth.full_name_label') }}</label>
          <div class="mt-2">
            <input v-model="form.name" id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('auth.email_label') }}</label>
          <div class="mt-2">
            <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('auth.password_label') }}</label>
          </div>
          <div class="mt-2">
            <input v-model="form.password" id="password" name="password" type="password" autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
          </div>
        </div>

        <div v-if="authStore.error" class="text-red-500 text-sm text-center">
            {{ authStore.error }}
        </div>

        <div>
          <button type="submit" :disabled="authStore.loading" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50">
            {{ authStore.loading ? $t('auth.signing_up') : $t('auth.sign_up_btn') }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        {{ $t('auth.already_have_account') }}
        {{ ' ' }}
        <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ $t('auth.sign_in_title') }}</router-link>
      </p>
    </div>
  </div>
</template>
