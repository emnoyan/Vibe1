import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/plugins/axios';

export interface Post {
    id: number;
    title: string;
    content: string | null;
    published: boolean;
    authorId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    author?: { id: number; name: string; email: string };
    category?: { id: number; name: string };
    image?: string;
}

export interface PostQueryParams {
    q?: string;
    categoryId?: number;
    published?: string; // 'true' | 'false'
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<Post[]>([]);
    const publicPosts = ref<Post[]>([]);
    const currentPost = ref<Post | null>(null);
    const loading = ref(false);
    const fetching = ref(false);
    const error = ref<string | null>(null);

    async function fetchPublicPosts(params?: any) {
        fetching.value = true;
        error.value = null;
        try {
            const response = await axios.get('/posts/public', { params });
            publicPosts.value = response.data;
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to fetch public posts';
        } finally {
            fetching.value = false;
        }
    }

    async function fetchAdminPosts(params?: PostQueryParams) {
        fetching.value = true;
        error.value = null;
        try {
            const response = await axios.get('/posts', { params });
            posts.value = response.data;
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to fetch posts';
        } finally {
            fetching.value = false;
        }
    }

    async function fetchPost(id: number) {
        fetching.value = true;
        currentPost.value = null;
        error.value = null;
        try {
            // Try public endpoint first by default since we are using this in PostDetailView which is public
            // If we needed admin view of a post, we might need a separate action or parameter
            const response = await axios.get(`/posts/public/${id}`);
            currentPost.value = response.data;
            return response.data;
        } catch (e: any) {
            // Fallback for admin maybe? But simpler to just use public for now for view
            error.value = e.response?.data?.message || 'Failed to fetch post';
        } finally {
            fetching.value = false;
        }
    }

    async function createPost(data: any) {
        loading.value = true;
        try {
            await axios.post('/posts', data);
            await fetchAdminPosts(); // Refresh list if in admin view
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to create post';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updatePost(id: number, data: any) {
        loading.value = true;
        try {
            await axios.patch(`/posts/${id}`, data);
            // Update local if matched
            if (currentPost.value && currentPost.value.id === id) {
                currentPost.value = { ...currentPost.value, ...data };
            }
            await fetchAdminPosts();
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to update post';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deletePost(id: number) {
        loading.value = true;
        try {
            await axios.delete(`/posts/${id}`);
            posts.value = posts.value.filter(p => p.id !== id);
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to delete post';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function bulkDeletePosts(ids: number[]) {
        loading.value = true;
        try {
            // Mock implementation correctly or implement backend support
            // await axios.post('/posts/bulk-delete', { ids });
            // posts.value = posts.value.filter(p => !ids.includes(p.id));
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to bulk delete';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    return {
        posts,
        publicPosts,
        currentPost,
        loading,
        fetching,
        error,
        fetchPublicPosts,
        fetchAdminPosts,
        fetchPost,
        createPost,
        updatePost,
        deletePost,
        bulkDeletePosts
    };
});
