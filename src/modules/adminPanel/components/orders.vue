<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      orders: null,
      expandedRows: [],
      isLoading: false,
      selectedOrder: {},
      selectedOrderStatus: null,
      orderStatus: [
        { id: 0, status: 'OLUSTURULDU' },
        { id: 1, status: 'ONAYLANDI' },
        { id: 2, status: 'TAMAMLANDI' },
        { id: 3, status: 'IPTAL_EDILDI' }
      ],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions('managementTable', ['fetchTableDatas', 'addItem', 'updateItem']),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
      this.isLoading = true

      return this.fetchTableDatas({
        url: '/order'
      })
        .then(({ data }) => {
          this.orders = data
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    formatCurrency(value) {
      if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

      return
    },
    expandAll() {
        this.expandedRows = this.orders.reduce((acc, p) => (acc[p.orderId] = true) && acc, {});
    },
    collapseAll() {
        this.expandedRows = null;
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
    getThumbnail(images) {
      return images.find(image => image.isThumbnail) ? images.find(image => image.isThumbnail) : images[0];
    },
    toggle(event, data) {
      this.selectedOrder = data;
      this.selectedOrderStatus = data.orderStatus;
      this.$refs.op.toggle(event);
    },
    updateOrderStatus(selectedOrderStatus) {
      this.updateItem({
        url: `/order/${this.selectedOrder.orderId}`,
        data: {
          ...this.selectedOrder,
          orderStatus: selectedOrderStatus
        }
      })
        .then(() => {
          this.fetchData()
          this.$refs.op.hide()
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000
          })
        })
    },
  }
}
</script>

<template>
  <div class="card">
      <Toolbar class="mb-2">
        <template #start>
          <Button
            icon="pi pi-refresh"
            severity="info"
            class="mr-2"
            :loading="isLoading"
            @click="fetchData"
          />
        </template>
      </Toolbar>
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="orders"
        dataKey="orderId"
        tableStyle="min-width: 60rem"
        scrollable
        scrollHeight="calc(100vh - 249px)"
      >
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
        <Column header="Status">
            <template #body="slotProps">
                <Tag
                :value="slotProps.data.orderStatus.status"
                :severity="getSeverity(slotProps.data.orderStatus)"
                @click="(event) => toggle(event, slotProps.data)" />
            </template>
        </Column>
        <template #expansion="slotProps">
            <div class="p-3">
                <h5>Orders for {{ slotProps.data.name }}</h5>
                <DataTable :value="slotProps.data.orderItems" >
                    <Column field="id" header="Id" sortable class="w-1"></Column>
                    <Column header="Image" class="w-1">
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
                    <Column field="name" header="Name" sortable class="w-2"></Column>
                    <Column field="quantity" header="Quantity" sortable class="w-1"></Column>
                    <Column field="grossPrice" header="Gross Price" sortable class="w-2">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.grossPrice) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
      </DataTable>
      <OverlayPanel ref="op">
            <div class="flex flex-column gap-3 w-25rem">
                <div>
                    <span class="font-medium text-900 block mb-2">Update Order Status</span>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Dropdown
                    v-model="selectedOrderStatus"
                    :options="orderStatus"
                    optionLabel="status"
                    placeholder="Select a Status"
                    class="w-25rem"
                    >
                    </Dropdown>
                    <Button label="Update" @click="updateOrderStatus(selectedOrderStatus)" />
                </div>
            </div>
        </OverlayPanel>
      <Toast />
  </div>
</template>
