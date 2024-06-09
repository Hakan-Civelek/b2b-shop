<script>
import { mapActions, mapState } from 'vuex'
import ToastMixin from '@/mixins/toast.js'

export default {
  name: 'ProductsList',
  data() {
    return {
      layout: 'grid',
      selectedBrands: [],
      filters: {
        brands: null,
        priceRange: null,
        evoulotionRate: null,
        categories: null
      }
    }
  },
  mixins: [ToastMixin],
  created() {
    this.fetchProducts()
    this.fetchCategories()
    this.fetchBrands()
  },
  computed: {
    ...mapState('productsList', ['products', 'loading', 'categories', 'totalProducts', 'brands'])
  },
  methods: {
    ...mapActions('productsList', ['fetchProducts', 'fetchCategories', 'fetchBrands']),
    ...mapActions('card', ['addBasket']),
    getSeverity(product) {
      switch (product.inventoryStatus) {
        case 'INSTOCK':
          return 'success'

        case 'LOWSTOCK':
          return 'warning'

        case 'OUTOFSTOCK':
          return 'danger'

        default:
          return null
      }
    },
    goProductDetail(product) {
      this.$router.push(`/products/${product.id}`)
    },
    addProductBasket(product) {
      const basketItem = {
        productId: product.id,
        quantity: product.quantity,
        updateQuantity: false
      }
      this.addBasket(basketItem).then(() => {
        this.showSuccessMessage('Product added to basket')
      })
    },
    filterProducts() {
      let params = {}
      if (this.filters.categories) {
        params.categoryId = this.filters.categories.value
      }
      if (this.filters.brands) {
        params.brandId = this.filters.brands.value
      }
        this.fetchProducts(params)
    },
    getThumbnail(product) {
      return product.images.find((image) => image.isThumbnail)
        ? product?.images?.find((image) => image?.isThumbnail)
        : product?.images[0]
    }
  }
}
</script>

<template>
  <div class="formgrid grid">
    <div class="col-2">
      <div class="card mb-0 p-3 sticky top-0 sidebar-height">
        <Skeleton v-if="loading" class="mb-2"></Skeleton>
        <template v-else>
          <span class="text-sm font-bold text-600">{{ totalProducts }}</span>
          <span class="text-sm text-700"> Products listed</span>
        </template>
        <Divider />
        <h2 class="text-lg font-semibold text-700">Categories</h2>
        <Listbox
          v-model="filters.categories"
          :options="categories"
          optionLabel="name"
          class="w-full"
          @change="filterProducts"
        />
        <Divider />
        <h2 class="text-lg font-semibold text-700">Brands</h2>
        <Listbox
          v-model="filters.brands"
          :options="brands"
          :modelValue="filters.brands"
          filter
          optionLabel="name"
          class="w-full"
          @change="filterProducts"
        >
          <template #option="{ option }">
            <div class="flex">
              <Checkbox
                v-model="option.selected"
                :key="option.id"
                :input-id="option.id"
                :name="option.name"
                class="mr-3"
              />
              <label :for="option.id" class="cursor-pointer">{{ option.name }}</label>
            </div>
          </template>
        </Listbox>
      </div>
    </div>
    <div class="col">
      <div class="card mb-0 h-full">
        <DataView
          :value="products"
          :layout="layout"
          :sortOrder="sortOrder"
          :sortField="sortField"
          :rows="4"
        >
          <template #header>
            <div class="flex justify-content-between">
              <Dropdown
                v-model="sortKey"
                :options="sortOptions"
                optionLabel="label"
                placeholder="Sort By Price"
                @change="onSortChange($event)"
              />
              <DataViewLayoutOptions v-model="layout" />
            </div>
          </template>

          <template #list="slotProps">
            <div v-if="!loading" class="grid grid-nogutter">
              <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                <div
                  class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                  :class="{ 'border-top-1 surface-border': index !== 0 }"
                >
                  <div class="md:w-10rem relative">
                    <img
                      class="block xl:block mx-auto border-round w-full cursor-pointer"
                      :src="getThumbnail(item)?.url"
                      :alt="getThumbnail(item)?.id"
                      style="height: 140px; object-fit: contain; cursor: pointer"
                      @click="goProductDetail(item)"
                    />
                  </div>
                  <div
                    class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
                  >
                    <div
                      class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
                    >
                      <div>
                        <span class="font-medium text-secondary text-sm">{{
                          item.brand?.name
                        }}</span>
                        <div
                          class="text-lg font-medium text-900 mt-2 cursor-pointer"
                          @click="goProductDetail(item)"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-column md:align-items-end gap-5">
                      <span class="text-xl font-semibold text-900">${{ item.salesPrice }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <div class="flex">
                          <InputNumber
                            v-model="item.quantity"
                            inputId="horizontal-buttons"
                            showButtons
                            buttonLayout="horizontal"
                            inputClass="sm:w-4rem h-3rem"
                            :allowEmpty="false"
                            :min="1"
                            :max="item?.stock"
                          >
                            <template #incrementbuttonicon>
                              <span class="pi pi-plus" />
                            </template>
                            <template #decrementbuttonicon>
                              <span class="pi pi-minus" />
                            </template>
                          </InputNumber>
                        </div>
                        <Button
                          icon="pi pi-shopping-cart"
                          label="Buy Now"
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                          class="flex-auto md:flex-initial white-space-nowrap"
                          @click="addProductBasket(item)"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="grid grid-nogutter">
              <div v-for="i in 16" :key="i" class="col-12">
                <div
                  class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                  :class="{ 'border-top-1 surface-border': i !== 0 }"
                >
                  <Skeleton
                    class="w-9 sm:w-16rem xl:w-10rem h-6rem block xl:block mx-auto border-round"
                  />
                  <div
                    class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                  >
                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                      <Skeleton class="w-8rem border-round h-2rem" />
                      <Skeleton class="w-6rem border-round h-1rem" />
                      <div class="flex align-items-center gap-3">
                        <Skeleton class="w-6rem border-round h-1rem" />
                        <Skeleton class="w-3rem border-round h-1rem" />
                      </div>
                    </div>
                    <div
                      class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                    >
                      <Skeleton class="w-4rem border-round h-2rem" />
                      <Skeleton shape="circle" class="w-3rem h-3rem" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div v-if="!loading" class="grid grid-nogutter">
              <div
                v-for="(item, index) in slotProps.items"
                :key="index"
                class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-2"
              >
                <div
                  class="p-4 border-1 surface-border surface-card border-round flex flex-column justify-content-between h-full"
                >
                  <div
                    class="surface-50 flex justify-content-center border-round p-3 hover:shadow-2"
                    @click="goProductDetail(item)"
                  >
                    <div class="relative mx-auto cursor-pointer">
                      <img
                        class="border-round w-full"
                        :src="getThumbnail(item)?.url"
                        :alt="getThumbnail(item)?.id"
                        style="width: 300px; height: 200px; object-fit: contain; cursor: pointer"
                      />
                    </div>
                  </div>
                  <div class="pt-4">
                    <div class="flex flex-row justify-content-start align-items-start gap-2 h-4rem">
                      <div>
                        <div
                          class="text-lg font-bold text-900 mt-1 cursor-pointer"
                          @click="goProductDetail(item)"
                        >
                          {{ item.brand }}
                        </div>
                        <div
                          class="text-lg font-medium text-900 mt-1 cursor-pointer"
                          @click="goProductDetail(item)"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-column gap-4 mt-4">
                      <span class="text-2xl font-semibold text-900">${{ item.salesPrice }}</span>
                      <div class="flex gap-2">
                        <div class="flex">
                          <InputNumber
                            v-model="item.quantity"
                            inputId="horizontal-buttons"
                            showButtons
                            buttonLayout="horizontal"
                            inputClass="sm:w-4rem h-3rem"
                            :allowEmpty="false"
                            :min="1"
                            :max="item?.stock"
                          >
                            <template #incrementbuttonicon>
                              <span class="pi pi-plus" />
                            </template>
                            <template #decrementbuttonicon>
                              <span class="pi pi-minus" />
                            </template>
                          </InputNumber>
                        </div>
                        <Button
                          icon="pi pi-shopping-cart"
                          label="Buy Now"
                          :disabled="item.quantity === 0 || item.quantity === undefined"
                          class="flex-auto white-space-nowrap"
                          @click="addProductBasket(item)"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="grid grid-nogutter">
              <div v-for="i in 16" :key="i" class="col-12 sm:col-6 md:col-6 lg:col-4 xl:col-3 p-2">
                <div class="p-4 border-1 surface-border surface-card border-round">
                  <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <Skeleton class="w-6rem border-round h-2rem" />
                    <Skeleton class="w-3rem border-round h-1rem" />
                  </div>
                  <div class="flex flex-column align-items-center gap-3 py-5">
                    <Skeleton class="w-9 border-round h-10rem" />
                    <Skeleton class="w-8rem border-round h-2rem" />
                    <Skeleton class="w-6rem border-round h-1rem" />
                  </div>
                  <div class="flex align-items-center justify-content-between">
                    <Skeleton class="w-4rem border-round h-2rem" />
                    <Skeleton shape="circle" class="w-3rem h-3rem" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<style>
.sidebar-height {
  height: calc(100vh - 23px);
}
.p-listbox-list-wrapper {
  max-height: 300px;
  overflow-y: auto;
}
</style>
