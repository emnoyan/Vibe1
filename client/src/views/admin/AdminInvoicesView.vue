<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { useInvoicesStore } from '@/stores/invoices';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import Modal from '@/components/common/Modal.vue';
import ToastNotification from '@/components/common/ToastNotification.vue';

const invoicesStore = useInvoicesStore();
const { invoices, loading, error } = storeToRefs(invoicesStore);
const { t } = useI18n();

// Toast State
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'error'>('success');

const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    setTimeout(() => {
        showToast.value = false;
    }, 3000);
};

// Stats
const stats = computed(() => {
    const total = invoices.value.length;
    const paid = invoices.value.filter(i => i.status === 'PAID').length;
    const pending = invoices.value.filter(i => i.status === 'PENDING').length;
    return { total, paid, pending };
});

// Selection
const selectedIds = ref<Set<number>>(new Set());
const allSelected = computed(() => {
    return invoices.value.length > 0 && selectedIds.value.size === invoices.value.length;
});
const indeterminate = computed(() => {
    return selectedIds.value.size > 0 && selectedIds.value.size < invoices.value.length;
});

const toggleAll = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
        selectedIds.value = new Set(invoices.value.map(i => i.id));
    } else {
        selectedIds.value.clear();
    }
};

const toggleOne = (id: number) => {
    if (selectedIds.value.has(id)) {
        selectedIds.value.delete(id);
    } else {
        selectedIds.value.add(id);
    }
};

watch(invoices, () => {
    selectedIds.value.clear(); // Clear selection on data refresh
});

const searchQuery = ref('');
const statusFilter = ref('');
const dateFilter = ref('');
const sortBy = ref('createdAt');
const sortOrder = ref<'asc' | 'desc'>('desc');

let debounceTimer: ReturnType<typeof setTimeout>;

const fetchData = () => {
    invoicesStore.fetchInvoices({
        q: searchQuery.value,
        status: statusFilter.value,
        date: dateFilter.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value
    });
};

watch([statusFilter, dateFilter], () => {
    fetchData();
});

watch(searchQuery, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchData();
    }, 500);
});

const toggleSort = (field: string) => {
    if (sortBy.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = field;
        sortOrder.value = 'asc';
    }
    fetchData();
};

onMounted(() => {
  fetchData();
});

// Delete Report State
const showDeleteReport = ref(false);
const deleteReport = ref({ success: 0, failed: 0, messages: [] as string[] });

// Delete Confirmation State
const showConfirmModal = ref(false);
const itemToDelete = ref<number | null>(null); // null means bulk delete

const openDeleteConfirm = (id: number | null = null) => {
    itemToDelete.value = id;
    showConfirmModal.value = true;
};

const confirmDelete = async () => {
    showConfirmModal.value = false;
    
    // Treat everything as a bulk delete for consistent reporting
    let idsToDelete: number[] = [];
    if (itemToDelete.value) {
        idsToDelete = [itemToDelete.value];
    } else {
        if (selectedIds.value.size === 0) return;
        idsToDelete = Array.from(selectedIds.value);
    }

    const result = await invoicesStore.bulkDeleteInvoices(idsToDelete);
    
    if (!itemToDelete.value) {
        selectedIds.value.clear();
    }

    if (idsToDelete.length === 1) {
        // Single item delete (or bulk select 1) - Show simple Toast
        if (result.failed > 0) {
            triggerToast(result.messages.join('\n'), 'error');
        } else {
            triggerToast(t('message.delete_success'), 'success');
        }
    } else {
        // Multiple items - Show detailed report if any failed
        if (result.failed > 0) {
            deleteReport.value = result;
            showDeleteReport.value = true;
        } else {
            triggerToast(t('message.delete_success') || `Successfully deleted ${result.success} invoice(s).`, 'success');
        }
    }

    itemToDelete.value = null;
};
</script>

<template>
  <div>
    <div class="sticky top-0 z-10 bg-gray-50 py-4 px-8 sm:flex sm:items-center border-b border-gray-200/50 backdrop-blur-sm bg-gray-50/95">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Invoices</h1>
        <p class="mt-2 text-sm text-gray-700">Manage customer invoices.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-3">
        <button 
           v-if="selectedIds.size > 0"
           @click="openDeleteConfirm()"
           class="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            {{ $t('button.delete') }} ({{ selectedIds.size }})
        </button>
        <router-link to="/admin/invoices/new" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">{{ $t('button.create') }}</router-link>
      </div>
    </div>
    <div class="p-8">
    <!-- Stats -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-indigo-50 p-3 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500">{{ $t('common.total_invoices') }}</p>
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
                    <p class="text-sm font-medium text-gray-500">Paid</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.paid }}</p>
                </div>
            </div>
        </div>
        
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-yellow-50 p-3 text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-500">Pending</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div class="relative sm:col-span-2">
             <input v-model="searchQuery" type="text" class="h-9 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :placeholder="$t('button.search')">
        </div>
        <div>
            <input v-model="dateFilter" type="date" class="h-9 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
        <div>
            <select v-model="statusFilter" class="h-9 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
            </select>
        </div>
    </div>
    
    <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

    <div class="mt-8 flow-root">
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                  <input type="checkbox" :checked="allSelected" :indeterminate="indeterminate" @change="toggleAll" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 cursor-pointer hover:text-gray-700" @click="toggleSort('invoiceNumber')">
                    {{ $t('menu.invoices') }} # <span v-if="sortBy === 'invoiceNumber'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                 <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-700" @click="toggleSort('invoiceDate')">
                    {{ $t('common.date') }} <span v-if="sortBy === 'invoiceDate'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                 </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-700" @click="toggleSort('customerName')">
                    {{ $t('common.customer') }} <span v-if="sortBy === 'customerName'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                 <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-700" @click="toggleSort('status')">
                    {{ $t('common.status') }} <span v-if="sortBy === 'status'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                 </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-700" @click="toggleSort('total')">
                    {{ $t('common.total') }} <span v-if="sortBy === 'total'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-if="loading">
                    <td colspan="7" class="text-center py-4 text-gray-500">{{ $t('message.loading') }}</td>
                </tr>
                 <tr v-else-if="invoices.length === 0">
                    <td colspan="7" class="text-center py-4 text-gray-500">{{ $t('message.no_data') }}</td>
                </tr>
              <tr v-for="inv in invoices" :key="inv.id" :class="[selectedIds.has(inv.id) ? 'bg-gray-50' : 'hover:bg-gray-50/50', 'transition-colors']">
                <td class="relative px-7 sm:w-12 sm:px-6">
                  <div v-if="selectedIds.has(inv.id)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                  <input type="checkbox" :checked="selectedIds.has(inv.id)" @change="toggleOne(inv.id)" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{ inv.invoiceNumber }}</td>
                 <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ new Date(inv.invoiceDate).toLocaleDateString() }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="font-medium text-gray-900">{{ inv.customerName }}</div>
                    <div class="text-gray-500">{{ inv.customerEmail }}</div>
                </td>
                 <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                        :class="{
                            'bg-green-50 text-green-700 ring-green-600/20': inv.status === 'PAID',
                            'bg-yellow-50 text-yellow-800 ring-yellow-600/20': inv.status === 'PENDING',
                            'bg-red-50 text-red-700 ring-red-600/20': inv.status === 'CANCELLED'
                        }"
                    >
                        {{ inv.status }}
                    </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${{ inv.total }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ new Date(inv.createdAt).toLocaleDateString() }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <router-link :to="`/admin/invoices/${inv.id}`" class="text-indigo-600 hover:text-indigo-900 mr-4">{{ $t('button.edit') }}</router-link>
                  <button @click="openDeleteConfirm(inv.id)" class="text-red-600 hover:text-red-900">{{ $t('button.delete') }}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    <!-- Confirm Delete Modal -->
    <Modal :show="showConfirmModal" :title="$t('message.confirm_delete_title') || 'Confirm Delete'" @close="showConfirmModal = false">
      <p class="text-sm text-gray-500">
        {{ $t('message.confirm_delete') }}
      </p>
      <template #footer>
        <div class="sm:flex sm:flex-row-reverse gap-2">
            <button 
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm"
                @click="confirmDelete"
            >
                {{ $t('button.delete') }}
            </button>
            <button 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                @click="showConfirmModal = false"
            >
                {{ $t('button.cancel') }}
            </button>
        </div>
      </template>
    </Modal>

    <!-- Delete Report Modal -->
    <Modal :show="showDeleteReport" title="Delete Report" @close="showDeleteReport = false">
      <div class="space-y-4">
        <p class="text-sm text-gray-500">
          Operation completed with the following results:
        </p>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-green-50 p-3 rounded-md">
            <p class="text-sm font-medium text-green-800">Success</p>
            <p class="text-2xl font-semibold text-green-600">{{ deleteReport.success }}</p>
          </div>
          <div class="bg-red-50 p-3 rounded-md">
            <p class="text-sm font-medium text-red-800">Failed</p>
            <p class="text-2xl font-semibold text-red-600">{{ deleteReport.failed }}</p>
          </div>
        </div>
        
        <div v-if="deleteReport.messages.length > 0" class="mt-4">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Error Details</p>
          <ul class="list-disc pl-5 space-y-1 text-sm text-red-600">
             <li v-for="(msg, idx) in deleteReport.messages" :key="idx">{{ msg }}</li>
          </ul>
        </div>
      </div>
      
      <template #footer>
        <button 
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          @click="showDeleteReport = false"
        >
          Close
        </button>
      </template>
    </Modal>

    <!-- Toast Notification -->
    <ToastNotification 
        :show="showToast" 
        :message="toastMessage" 
        :type="toastType" 
        @close="showToast = false"
    />
  </div>
</template>
