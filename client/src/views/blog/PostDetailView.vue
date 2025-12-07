<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';

const route = useRoute();
const postsStore = usePostsStore();
const { currentPost: post, fetching: loading, error } = storeToRefs(postsStore);

onMounted(() => {
  postsStore.fetchPost(+route.params.id);
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="h-64 bg-gray-200 rounded-lg w-full"></div>
      <div class="space-y-4">
         <div class="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
         <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
    
    <article v-else-if="post" class="prose lg:prose-xl mx-auto">
      <div class="mb-8 text-center">
         <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {{ post.category?.name }}
         </span>
         <h1 class="mt-4 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none lg:text-6xl">
           {{ post.title }}
         </h1>
         <div class="mt-4 flex items-center justify-center text-gray-500">
           <span>By {{ post.author?.name }}</span>
           <span class="mx-2">&middot;</span>
           <time>{{ new Date(post.createdAt).toLocaleDateString() }}</time>
         </div>
      </div>
      
      <img 
        :src="post.image || 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1679&q=80'" 
        class="w-full h-96 object-cover rounded-lg shadow-lg mb-8" 
        alt="" 
      />
      
      <div class="mt-6 text-gray-800 text-lg leading-relaxed whitespace-pre-line">
        {{ post.content }}
      </div>
    </article>
  </div>
</template>
