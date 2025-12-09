import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/plugins/axios';

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
            // Execute all deletes concurrently and wait for all to finish
            const results = await Promise.allSettled(ids.map(id => axios.delete(`http://localhost:3000/invoices/${id}`)));

            // Process results
            const failedMessages: string[] = [];
            let successCount = 0;
            let failedCount = 0;

            results.forEach((result) => {
                if (result.status === 'rejected') {
                    failedCount++;
                    const err = result.reason;
                    const msg = err.response?.data?.message;
                    failedMessages.push(Array.isArray(msg) ? msg.join(', ') : (msg || err.message || 'Failed to delete invoice'));
                } else {
                    successCount++;
                }
            });

            if (failedMessages.length > 0) {
                // Set error if any failed. Use Set to remove duplicates (e.g. multiple "Cannot delete PAID")
                error.value = [...new Set(failedMessages)].join('; ');
            }

            // Always refresh list to ensure sync with server state (successful deletes will be gone)
            await fetchInvoices();

            return {
                success: successCount,
                failed: failedCount,
                messages: [...new Set(failedMessages)]
            };

        } catch (err: any) {
            console.error('Unexpected error in bulk delete:', err);
            error.value = 'An unexpected error occurred during bulk delete: ' + (err.message || String(err));
            await fetchInvoices();
            return {
                success: 0,
                failed: ids.length,
                messages: ['Unexpected error: ' + (err.message || String(err))]
            };
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
