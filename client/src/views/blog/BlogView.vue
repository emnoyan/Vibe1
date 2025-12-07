<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';

const postsStore = usePostsStore();
const categoriesStore = useCategoriesStore();
const { publicPosts, loading, error } = storeToRefs(postsStore);
const { categories } = storeToRefs(categoriesStore);

onMounted(() => {
  postsStore.fetchPublicPosts();
  categoriesStore.fetchCategories();
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        <span class="block xl:inline">Welcome to </span>
        <span class="block text-indigo-600 xl:inline">Our Blog</span>
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Insights, tutorials, and news about the tech world.
      </p>
    </div>

    <!-- Filter by Category -->
    <div class="mt-8 flex justify-center space-x-4">
      <button 
        @click="postsStore.fetchPublicPosts()"
        class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700"
      >
        All
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        @click="postsStore.fetchPublicPosts({ category: cat.slug })"
        class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700"
      >
        {{ cat.name }}
      </button>
    </div>

    <div v-if="loading" class="mt-12 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="mt-12 text-center text-red-600">
      {{ error }}
    </div>

    <div v-else class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="post in publicPosts" :key="post.id" class="flex flex-col rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl">
        <div class="flex-shrink-0">
          <img class="h-48 w-full object-cover" :src="post.image || 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1679&q=80'" alt="" />
        </div>
        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-indigo-600">
              <a href="#" class="hover:underline">
                {{ post.category?.name || 'General' }}
              </a>
            </p>
            <router-link :to="`/post/${post.id}`" class="block mt-2">
              <p class="text-xl font-semibold text-gray-900">
                {{ post.title }}
              </p>
              <p class="mt-3 text-base text-gray-500 line-clamp-3">
                {{ post.content }}
              </p>
            </router-link>
          </div>
          <div class="mt-6 flex items-center">
            <div class="flex-shrink-0">
               <span class="sr-only">{{ post.author?.name }}</span>
               <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                  {{ post.author?.name?.charAt(0).toUpperCase() }}
               </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                {{ post.author?.name }}
              </p>
              <div class="flex space-x-1 text-sm text-gray-500">
                <time :datetime="post.createdAt">
                  {{ new Date(post.createdAt).toLocaleDateString() }}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
