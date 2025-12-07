import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/plugins/axios';

export const useCategoriesStore = defineStore('categories', () => {
    const categories = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCategories() {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get('/categories');
            categories.value = response.data;
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to fetch categories';
        } finally {
            loading.value = false;
        }
    }

    async function createCategory(data: any) {
        loading.value = true;
        try {
            await axios.post('/categories', data);
            await fetchCategories();
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to create category';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updateCategory(id: number, data: any) {
        loading.value = true;
        try {
            await axios.patch(`/categories/${id}`, data);
            await fetchCategories();
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to update category';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteCategory(id: number) {
        loading.value = true;
        try {
            await axios.delete(`/categories/${id}`);
            await fetchCategories();
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Failed to delete category';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
});
