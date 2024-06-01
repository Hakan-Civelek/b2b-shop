
<script>
import { mapActions } from 'vuex';

export default {
    name: 'Orders',
    data() {
        return {
            expandedRows: {},
            orders: null
        };
    },
    mounted() {
        this.getOrders();
    },
    methods: {
      ...mapActions('orders', ['fetchOrders']),
        getOrders() {
          this.fetchOrders()
            .then(({ data }) => {
             this.orders = data
            })
        },
        onRowExpand(event) {
            this.$toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
        },
        onRowCollapse(event) {
            this.$toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
        },
        expandAll() {
            this.expandedRows = this.orders.reduce((acc, p) => (acc[p.orderId] = true) && acc, {});
        },
        collapseAll() {
            this.expandedRows = null;
        },
        formatCurrency(value) {
            return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
        },
        getSeverity(data) {
            switch (data.status) {
                case 'OLUSTURULDU':
                    return 'secondary';

                case 'ONAYLANDI':
                    return 'info';

                case 'TAMAMLANDI':
                    return 'success';

                case 'IPTAL_EDILDI':
                    return 'danger';

                default:
                    return null;
            }
        },
        getThumbnail(item) {
          return item.images?.find(image => image.isThumbnail) ? item.images.find(image => image.isThumbnail) : ''
        },
    }
};

</script>

<template>
    <div class="card">
        <DataTable v-model:expandedRows="expandedRows" :value="orders" dataKey="orderId"
                @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" tableStyle="min-width: 60rem">
            <template #header>
                <div class="flex flex-wrap justify-content-end gap-2">
                    <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
                    <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column expander style="width: 5rem" />
            <Column field="orderNumber" header="Order Number"></Column>
            <Column field="orderNote" header="Order Note"></Column>
            <Column field="createdByName" header="Created By"></Column>
            <Column field="orderDate" header="Order Date">
              <template #body="slotProps">
                {{ new Date(slotProps.data.orderDate).toLocaleDateString('tr-tr') }}
              </template>
            </Column>
            <Column field="totalPrice" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.totalPrice) }}
                </template>
            </Column>
            <Column field="category" header="Category"></Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.orderStatus.status" :severity="getSeverity(slotProps.data.orderStatus)" />
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-3">
                    <h5>Orders for {{ slotProps.data.name }}</h5>
                    <DataTable :value="slotProps.data.orderItems" >
                        <Column field="id" header="Id" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column header="Image">
                          <template #body="slotProps">
                            <img
                              v-if="slotProps.data.images.length"
                              :src="getThumbnail(slotProps.data.images)?.url"
                              :alt="getThumbnail(slotProps.data.images)?.id"
                              class="border-round"
                              style="width: 64px"
                            />
                          </template>
                        </Column>
                        <Column field="quantity" header="Quantity" sortable></Column>
                        <Column field="grossPrice" header="Gross Price" sortable>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.grossPrice) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
        <Toast />
    </div>
</template>
<style></style>
