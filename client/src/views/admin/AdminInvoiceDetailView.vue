<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useInvoicesStore } from '@/stores/invoices';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const invoicesStore = useInvoicesStore();
const { invoice, loading } = storeToRefs(invoicesStore);

const isEditMode = computed(() => route.params.id !== 'new');

const form = reactive({
  customerName: '',
  customerEmail: '',
  status: 'PENDING',
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  items: [] as any[]
});

const errors = reactive({
    customerName: '',
    customerEmail: '',
    invoiceDate: '',
    items: ''
});

const descriptionRefs = ref<HTMLInputElement[]>([]);

const addItem = async () => {
    form.items.push({
        description: '',
        quantity: 1,
        price: 0
    });
    // Focus new item if triggered via keyboard (handled in handleTabOnPrice, but handy default?)
};

const handleTabOnPrice = async (event: KeyboardEvent, index: number) => {
    if (index === form.items.length - 1 && !event.shiftKey) {
        event.preventDefault(); // Prevent leaving the table
        addItem();
        await nextTick();
        // Focus the new description
        const newInput = descriptionRefs.value[index + 1];
        if (newInput) newInput.focus();
    }
};

const removeItem = (index: number) => {
    form.items.splice(index, 1);
};

const calculatedTotal = computed(() => {
    return form.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2);
});

onMounted(async () => {
    if (isEditMode.value) {
        await invoicesStore.fetchInvoice(Number(route.params.id));
        if (invoice.value) {
            form.customerName = invoice.value.customerName;
            form.customerEmail = invoice.value.customerEmail;
            form.status = invoice.value.status;
            form.invoiceNumber = invoice.value.invoiceNumber;
            form.invoiceDate = new Date(invoice.value.invoiceDate).toISOString().split('T')[0];
            // Map items
            form.items = invoice.value.items.map((i: any) => ({
                description: i.description,
                quantity: i.quantity,
                price: Number(i.price)
            }));
        }
    } else {
        addItem(); // Start with one empty item
    }
});

const handleSubmit = async () => {
    // Clear errors
    errors.customerName = '';
    errors.customerEmail = '';
    errors.invoiceDate = '';
    errors.items = '';

    try {
        const payload = { ...form };
        if (isEditMode.value) {
            await invoicesStore.updateInvoice(Number(route.params.id), payload);
        } else {
            await invoicesStore.createInvoice(payload);
        }
        router.push('/admin/invoices');
    } catch (e: any) {
        // Parse validation errors
        const messages = e.response?.data?.message;
        if (Array.isArray(messages)) {
            errors.customerName = messages.find((m: string) => m.toLowerCase().includes('customername')) || '';
            errors.customerEmail = messages.find((m: string) => m.toLowerCase().includes('customeremail')) || '';
            errors.invoiceDate = messages.find((m: string) => m.toLowerCase().includes('invoicedate')) || '';
            errors.items = messages.find((m: string) => m.toLowerCase().includes('items')) || ''; // Catch-all for items
        }
        // If not array, the generic "error" ref from store (displayed at top) handles it
    }
};
</script>

<template>
  <div>
      <div class="sticky top-0 z-10 bg-gray-50 py-4 px-8 flex items-center justify-between border-b border-gray-200/50 backdrop-blur-sm bg-gray-50/95">
           <div>
             <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{ isEditMode ? 'Edit Invoice #' + route.params.id : 'Create New Invoice' }}</h1>
           </div>
           <div class="flex gap-3">
             <button @click="router.back()" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">{{ $t('button.cancel') }}</button>
             <button @click="handleSubmit" :disabled="loading" type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50">{{ $t('button.save') }}</button>
           </div>
      </div>
      
      <div class="p-8">
      <div class="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-4">
          <!-- Customer Info -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Invoice Number</label>
              <div class="mt-2">
                <input :value="isEditMode ? form.invoiceNumber : 'Auto-generated'" type="text" disabled class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm sm:leading-6">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Invoice Date</label>
              <div class="mt-2">
                <input v-model="form.invoiceDate" type="date" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <p v-if="errors.invoiceDate" class="mt-1 text-sm text-red-600">{{ errors.invoiceDate }}</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Customer Name</label>
              <div class="mt-2">
                <input v-model="form.customerName" type="text" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                 <p v-if="errors.customerName" class="mt-1 text-sm text-red-600">{{ errors.customerName }}</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Customer Email</label>
              <div class="mt-2">
                <input v-model="form.customerEmail" type="email" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <p v-if="errors.customerEmail" class="mt-1 text-sm text-red-600">{{ errors.customerEmail }}</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Status</label>
              <div class="mt-2">
                <select v-model="form.status" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Items -->
          <div>
              <div class="flex items-center justify-between mb-4">
                  <h2 class="text-base font-semibold leading-7 text-gray-900">Invoice Items</h2>
                  <button @click="addItem" type="button" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">+ Add Item</button>
              </div>
              <p v-if="errors.items" class="mb-4 text-sm text-red-600">{{ errors.items }}</p>
              
              <div class="flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-1/2">Description</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-24">Qty</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">Price</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">Total</th>
                          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0 w-12">
                            <span class="sr-only">Delete</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr v-for="(item, index) in form.items" :key="index">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                              <input 
                                :ref="(el) => { if(el) descriptionRefs[index] = el as HTMLInputElement }" 
                                v-model="item.description" 
                                type="text" 
                                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                placeholder="Item description"
                              >
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <input v-model.number="item.quantity" type="number" min="1" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span class="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input 
                                  v-model.number="item.price" 
                                  type="number" 
                                  step="0.01" 
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  @keydown.tab="handleTabOnPrice($event, index)"
                                >
                              </div>
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                              ${{ (item.quantity * item.price).toFixed(2) }}
                          </td>
                          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button @click="removeItem(index)" type="button" class="text-red-600 hover:text-red-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                          <tr>
                              <td colspan="3" class="text-right py-4 px-3 font-bold text-gray-900">Total</td>
                              <td class="py-4 px-3 font-bold text-indigo-600 text-lg">${{ calculatedTotal }}</td>
                              <td></td>
                          </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
          </div>
      </div>
      </div>
  </div>
</template>
