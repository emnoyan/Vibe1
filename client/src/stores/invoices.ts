import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useInvoicesStore = defineStore('invoices', () => {
    const invoices = ref<any[]>([]);
    const invoice = ref<any>(null); // For detail view
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchInvoices = async (params: any = {}) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get('http://localhost:3000/invoices', { params });
            invoices.value = response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message;
            error.value = Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to fetch invoices');
        } finally {
            loading.value = false;
        }
    };

    const fetchInvoice = async (id: number) => {
        loading.value = true;
        error.value = null;
        invoice.value = null;
        try {
            const response = await axios.get(`http://localhost:3000/invoices/${id}`);
            invoice.value = response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message;
            error.value = Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to fetch invoice');
        } finally {
            loading.value = false;
        }
    };

    const createInvoice = async (data: any) => {
        loading.value = true;
        error.value = null;
        try {
            await axios.post('http://localhost:3000/invoices', data);
            await fetchInvoices(); // Refresh list
        } catch (err: any) {
            const msg = err.response?.data?.message;
            error.value = Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to create invoice');
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateInvoice = async (id: number, data: any) => {
        loading.value = true;
        error.value = null;
        try {
            await axios.patch(`http://localhost:3000/invoices/${id}`, data);
            // Refresh current if viewed
            if (invoice.value && invoice.value.id === id) {
                await fetchInvoice(id);
            }
            // Refresh list
            await fetchInvoices();
        } catch (err: any) {
            const msg = err.response?.data?.message;
            error.value = Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to update invoice');
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const deleteInvoice = async (id: number) => {
        loading.value = true;
        error.value = null;
        try {
            await axios.delete(`http://localhost:3000/invoices/${id}`);
            invoices.value = invoices.value.filter(i => i.id !== id);
        } catch (err: any) {
            const msg = err.response?.data?.message;
            error.value = Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to delete invoice');
        } finally {
            loading.value = false;
        }
    };

    const bulkDeleteInvoices = async (ids: number[]) => {
        loading.value = true;
        error.value = null;
        try {
            // Execute all deletes concurrently
            await Promise.all(ids.map(id => axios.delete(`http://localhost:3000/invoices/${id}`)));
            // Update local state
            invoices.value = invoices.value.filter(i => !ids.includes(i.id));
        } catch (err: any) {
            const msg = err.response?.data?.message;
            const errorMsg = Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to delete invoices');

            // Refresh to ensure sync with server even on partial failure
            // This will clear the error state, so we need to restore it after
            await fetchInvoices();

            error.value = errorMsg;
        } finally {
            loading.value = false;
        }
    };

    return {
        invoices,
        invoice,
        loading,
        error,
        fetchInvoices,
        fetchInvoice,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        bulkDeleteInvoices,
    };
});
