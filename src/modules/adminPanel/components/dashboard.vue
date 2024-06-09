<script>
import ToastMixin from '@/mixins/toast.js'
import { mapActions} from 'vuex'

export default {
  data() {
    return {
      items: [],
    }
  },
  mixins: [ToastMixin],
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions('adminPanel', ['getDashboardData']),
    fetchData() {
      this.getDashboardData()
        .then(({data}) => {
          this.items = data
          console.log(this.items);
        })
    },
  },
}
</script>

<template>
  <div class="px-4 py-5 md:px-6">
    <div class="grid">
      <div class="col-12 md:col-6 mb-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Orders</span>
              <div class="text-900 font-medium text-xl">{{ items.orderCount }}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-blue-100 border-round"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{items.thisMonthOrderCount}} new </span>
          <span class="text-500">since this month</span>
        </div>
      </div>
      <div class="col-12 md:col-6 mb-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Revenue</span>
              <div class="text-900 font-medium text-xl">${{items.totalRevenue}}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-orange-100 border-round"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-map-marker text-orange-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">${{items.thisMonthTotalRevenue}} </span>
          <span class="text-500"> since this month</span>
        </div>
      </div>
      <div class="col-12 md:col-6 mb-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Customers</span>
              <div class="text-900 font-medium text-xl">{{items.customerCount}}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-inbox text-cyan-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{items.thisMonthCustomerCount}} </span>
          <span class="text-500"> newly registered this month</span>
        </div>
      </div>
      <div class="col-12 md:col-6 mb-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Products</span>
              <div class="text-900 font-medium text-xl">{{items.productCount}}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-shopping-bag text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{items.thisMonthProductCount}} </span>
          <span class="text-500"> added products this month</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
