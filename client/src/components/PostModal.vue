<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  isEditMode: boolean;
  initialData?: any;
  categories: any[];
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', data: any): void;
  (e: 'update', data: any): void;
}>();

const form = reactive({
  title: '',
  content: '',
  categoryId: null as number | null,
  published: false,
  image: '',
});

const errors = reactive({
  title: '',
  categoryId: '',
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.initialData && props.isEditMode) {
      form.title = props.initialData.title;
      form.content = props.initialData.content || '';
      form.categoryId = props.initialData.categoryId;
      form.published = props.initialData.published;
      form.image = props.initialData.image || '';
    } else {
      form.title = '';
      form.content = '';
      form.categoryId = props.categories.length > 0 ? props.categories[0].id : null;
      form.published = false;
      form.image = '';
    }
    errors.title = '';
    errors.categoryId = '';
  }
});

const validate = () => {
  let isValid = true;
  errors.title = '';
  errors.categoryId = '';

  if (!form.title || !form.title.trim()) {
    errors.title = 'Title is required';
    isValid = false;
  }
  
  if (!form.categoryId) {
      errors.categoryId = 'Category is required';
      isValid = false;
  }

  return isValid;
};

const handleSave = () => {
  if (!validate()) return;
  const payload = { ...form };
  if (props.isEditMode) {
    emit('update', payload);
  } else {
    emit('save', payload);
  }
};
</script>

<template>
  <div v-if="isOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" @click.self="$emit('close')">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900 mb-4" id="modal-title">
              {{ isEditMode ? 'Edit Post' : 'Create New Post' }}
            </h3>
            
            <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                {{ error }}
            </div>

            <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                  <input v-model="form.title" type="text" class="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Post Title">
                  <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
                </div>
                
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                        <select v-model="form.categoryId" class="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                        </select>
                        <p v-if="errors.categoryId" class="mt-1 text-sm text-red-600">{{ errors.categoryId }}</p>
                    </div>

                    <div>
                         <label class="block text-sm font-medium leading-6 text-gray-900">Status</label>
                         <select v-model="form.published" class="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                             <option :value="false">Draft</option>
                             <option :value="true">Published</option>
                         </select>
                    </div>
                </div>

                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
                  <input v-model="form.image" type="text" class="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="https://...">
                </div>

                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">Content</label>
                  <textarea v-model="form.content" rows="10" class="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button @click="handleSave" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">
              {{ isEditMode ? 'Update Post' : 'Create Post' }}
            </button>
            <button @click="$emit('close')" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
