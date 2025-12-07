<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';
import PostModal from '@/components/PostModal.vue';

const postsStore = usePostsStore();
const categoriesStore = useCategoriesStore();
const { posts, loading, fetching, error } = storeToRefs(postsStore);
const { categories } = storeToRefs(categoriesStore);

// State
const searchQuery = ref('');
const selectedCategoryId = ref<number | ''>('');
const selectedStatus = ref<string>(''); // 'true' | 'false' | ''
const sortBy = ref('createdAt');
const sortOrder = ref<'asc' | 'desc'>('desc');
const isModalOpen = ref(false);
const isEditing = ref(false);
const selectedPost = ref<any>(null);

// Stats (Computed from fetched posts as simplified approach)
const stats = computed(() => {
    const total = posts.value.length;
    const published = posts.value.filter(p => p.published).length;
    const drafts = total - published;
    return { total, published, drafts };
});

const fetchData = () => {
  postsStore.fetchAdminPosts({
    q: searchQuery.value,
    categoryId: selectedCategoryId.value === '' ? undefined : selectedCategoryId.value,
    published: selectedStatus.value || undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};

watch([selectedCategoryId, selectedStatus], () => {
    fetchData();
});

let debounceTimer: ReturnType<typeof setTimeout>;
watch(searchQuery, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchData();
    }, 500);
});

const toggleSort = (column: string) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  fetchData();
};

onMounted(() => {
  fetchData();
  categoriesStore.fetchCategories();
});

// Modal Handlers
const openCreateModal = () => {
    isEditing.value = false;
    selectedPost.value = null;
    isModalOpen.value = true;
};

const openEditModal = (post: any) => {
    isEditing.value = true;
    selectedPost.value = post;
    isModalOpen.value = true;
};

const handleCloseModal = () => {
    isModalOpen.value = false;
    selectedPost.value = null;
};

const handleSavePost = async (data: any) => {
    await postsStore.createPost(data);
    isModalOpen.value = false;
};

const handleUpdatePost = async (data: any) => {
    if (selectedPost.value) {
        await postsStore.updatePost(selectedPost.value.id, data);
        isModalOpen.value = false;
        selectedPost.value = null;
    }
};

const handleDeletePost = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
        await postsStore.deletePost(id);
        fetchData(); // Refresh to ensure stats are correct
    }
};
</script>

<template>
  <div class="h-full">
      <div class="sticky top-0 z-10 bg-gray-50 py-4 px-8 flex items-center justify-between border-b border-gray-200/50 backdrop-blur-sm bg-gray-50/95">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">Post Management</h1>
            <p class="mt-1 text-sm text-gray-500">Create, edit, and manage blog posts.</p>
          </div>
          <button @click="openCreateModal" :disabled="loading" class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Create Post
          </button>
      </div>

       <div class="p-8">
       <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
           {{ error }}
       </div>

       <!-- Stats -->
       <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
              <div class="rounded-full bg-indigo-50 p-3 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Total Posts</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
              </div>
            </div>
          </div>

           <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
              <div class="rounded-full bg-green-50 p-3 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Published</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.published }}</p>
              </div>
            </div>
          </div>
          
           <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
              <div class="rounded-full bg-yellow-50 p-3 text-yellow-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Drafts</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.drafts }}</p>
              </div>
            </div>
          </div>
       </div>

       <!-- Filters -->
       <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div class="relative">
             <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                 <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
               </svg>
             </div>
             <input v-model="searchQuery" type="text" class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search posts...">
          </div>

          <div>
             <select v-model="selectedCategoryId" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
               <option value="">All Categories</option>
               <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
             </select>
          </div>

          <div>
             <select v-model="selectedStatus" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="">All Status</option>
                <option value="true">Published</option>
                <option value="false">Draft</option>
             </select>
          </div>
       </div>

       <!-- Table -->
       <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div class="overflow-x-auto">
             <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                   <tr>
                      <th scope="col" class="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-700" @click="toggleSort('title')">
                         Title
                         <span v-if="sortBy === 'title'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                      </th>
                      <th scope="col" class="px-6 py-4 font-medium text-gray-500">Category</th>
                      <th scope="col" class="px-6 py-4 font-medium text-gray-500">Author</th>
                      <th scope="col" class="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-700" @click="toggleSort('published')">
                         Status
                          <span v-if="sortBy === 'published'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                      </th>
                      <th scope="col" class="px-6 py-4 font-medium text-gray-500 cursor-pointer hover:text-gray-700" @click="toggleSort('createdAt')">
                         Date
                          <span v-if="sortBy === 'createdAt'" class="ml-1">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                      </th>
                      <th scope="col" class="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-if="fetching" class="animate-pulse">
                        <td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading posts...</td>
                    </tr>
                    <tr v-else-if="posts.length === 0">
                        <td colspan="6" class="px-6 py-4 text-center text-gray-500">No posts found.</td>
                    </tr>
                    <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50/50 transition-colors">
                        <td class="px-6 py-4 font-medium text-gray-900">{{ post.title }}</td>
                        <td class="px-6 py-4 text-gray-500">
                             <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ post.category?.name }}</span>
                        </td>
                        <td class="px-6 py-4 text-gray-500">{{ post.author?.name }}</td>
                        <td class="px-6 py-4">
                            <span v-if="post.published" class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span> Published
                            </span>
                            <span v-else class="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                <span class="h-1.5 w-1.5 rounded-full bg-yellow-600"></span> Draft
                            </span>
                        </td>
                        <td class="px-6 py-4 text-gray-500">{{ new Date(post.createdAt).toLocaleDateString() }}</td>
                        <td class="px-6 py-4 text-right">
                             <div class="flex justify-end gap-2">
                                <button @click="openEditModal(post)" class="text-gray-400 hover:text-indigo-600 transition-colors">Edit</button>
                                <button @click="handleDeletePost(post.id)" class="text-gray-400 hover:text-red-600 transition-colors">Delete</button>
                             </div>
                        </td>
                    </tr>
                </tbody>
             </table>
          </div>
       </div>

       <PostModal 
          :isOpen="isModalOpen"
          :isEditMode="isEditing"
          :initialData="selectedPost"
          :categories="categories"
          :error="error"
          @close="handleCloseModal"
          @save="handleSavePost"
          @update="handleUpdatePost"
       />
  </div>
  </div>
</template>
