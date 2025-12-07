<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  initialData?: any;
  categories?: any[];
  error?: string | string[] | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', data: any): void;
  (e: 'update', data: any): void;
}>();

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'USER',
  status: 'ACTIVE',
});

const managedCategoryIds = ref<number[]>([]);

const errors = reactive({
  name: '',
  email: '',
  password: '',
});

// Real-time password validation
watch(() => form.password, (newVal) => {
  if (isEditMode.value && !newVal) {
    errors.password = '';
  } else if (newVal && newVal.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else {
    if (errors.password === 'Password must be at least 6 characters') {
        errors.password = '';
    }
  }
});

const serverEmailError = computed(() => {
  const errorMsg = Array.isArray(props.error) ? props.error.join(', ') : props.error;
  if (errorMsg && errorMsg.toLowerCase().includes('email already exists')) {
    return errorMsg;
  }
  return '';
});

const displayEmailError = computed(() => {
  return errors.email || serverEmailError.value;
});

const globalError = computed(() => {
  if (serverEmailError.value) {
    return null;
  }
  return Array.isArray(props.error) ? props.error.join(', ') : props.error;
});

const isEditMode = computed(() => !!props.initialData);

// Reset or fill form when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.initialData) {
      form.name = props.initialData.name;
      form.email = props.initialData.email;
      form.password = ''; // Don't fill password on edit
      form.role = props.initialData.role || 'USER';
      form.status = props.initialData.status || 'ACTIVE';
      managedCategoryIds.value = props.initialData.managedCategories?.map((c: any) => c.id) || [];
    } else {
      form.name = '';
      form.email = '';
      form.password = '';
      form.role = 'USER';
      form.status = 'ACTIVE';
      managedCategoryIds.value = [];
    }
  }
  // Clear errors when modal opens/closes or data changes
  errors.name = '';
  errors.email = '';
  errors.password = '';
});

const validate = () => {
  let isValid = true;
  errors.name = '';
  errors.email = '';
  errors.password = '';

  if (!form.name || !form.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!form.email || !form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email format';
    isValid = false;
  }

  if (!isEditMode.value && !form.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.password && form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return isValid;
};

const handleSave = () => {
  if (!validate()) return;
  
  const payload: any = { ...form };
  
  // If in edit mode and password is empty, remove it so it doesn't try to update it
  if (isEditMode.value && !payload.password) {
    delete payload.password;
  }
  
  if (form.role === 'MOD') {
      payload.managedCategoryIds = managedCategoryIds.value;
  }

  if (isEditMode.value) {
    emit('update', payload);
  } else {
    emit('save', payload);
  }
};

const toggleCategory = (id: number) => {
    const index = managedCategoryIds.value.indexOf(id);
    if (index === -1) {
        managedCategoryIds.value.push(id);
    } else {
        managedCategoryIds.value.splice(index, 1);
    }
};
</script>

<template>
  <div v-if="isOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" @click.self="$emit('close')">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-5.255L5.25 11.25m-2.25 2.25L12 21l9-7.5" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  {{ isEditMode ? 'Edit Member' : 'Add New Member' }}
                </h3>
                <div class="mt-4 space-y-4">
                  <div v-if="globalError" class="rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {{ globalError }}
                  </div>
                  <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                    <div class="mt-1">
                      <input v-model="form.name" type="text" name="name" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="John Doe">
                      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                    </div>
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                    <div class="mt-1">
                      <input v-model="form.email" type="email" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="john@example.com">
                      <p v-if="displayEmailError" class="mt-1 text-sm text-red-600">{{ displayEmailError }}</p>
                    </div>
                  </div>
                   <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-1">
                      <input v-model="form.password" type="password" name="password" id="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" placeholder="••••••••">
                      <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                    </div>
                  </div>
                  <div>
                    <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
                    <select v-model="form.role" id="role" name="role" class="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value="USER">User</option>
                      <option value="MOD">Moderator</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  
                  <div v-if="form.role === 'MOD' && categories">
                    <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Managed Categories</label>
                    <div class="space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
                        <div v-for="category in categories" :key="category.id" class="flex items-center">
                            <input 
                                :id="'cat-' + category.id" 
                                type="checkbox" 
                                :checked="managedCategoryIds.includes(category.id)"
                                @change="toggleCategory(category.id)"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            >
                            <label :for="'cat-' + category.id" class="ml-2 block text-sm text-gray-900">
                                {{ category.name }}
                            </label>
                        </div>
                    </div>
                  </div>

                  <div>
                    <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
                    <select v-model="form.status" id="status" name="status" class="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button @click="handleSave" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">
              {{ isEditMode ? 'Update Member' : 'Save Member' }}
            </button>
            <button @click="$emit('close')" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
