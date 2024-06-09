
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      productDetails: {},
      isLoading: false,
      selectedIndex: 0,
      quantity: 1
    }
  },
  computed: {
    selectedImage() {
      return this.productDetails?.images[this.selectedIndex]
    }
  },
  created() {
    this.fetchProduct()
  },
  methods: {
    ...mapActions('productDetails', ['fetchProductDetails']),
    ...mapActions('card', ['addBasket']),
    selectImage(index) {
      this.selectedIndex = index
    },
    fetchProduct() {
      this.isLoading = true
      this.fetchProductDetails(this.$route.params.id).then(({ data }) => {
        this.productDetails = data
        this.isLoading = false
      })
    },
    addProductBasket(product) {
      product = {
        productId: this.productDetails.id,
        quantity: this.quantity,
        updateQuantity: false
      }
      this.addBasket(product).then(() => {
        this.showSuccessMessage('Product added to basket')
      })
    },

  }
}
</script>

<template>
  <div class="layout-content">
    <div class="card">
      <div class="grid mb-7">
        <div class="col-12 lg:col-7">
          <div class="flex">
            <div
              v-if="isLoading"
              class="flex flex-column w-12 justify-content-between"
              style="row-gap: 1rem"
            >
              <Skeleton width="100%" height="36rem"></Skeleton>
            </div>
            <template v-else>
              <div class="flex flex-column w-2 justify-content-between" style="row-gap: 1rem">
                <img
                  v-for="(item, index) in productDetails?.images"
                  :key="index"
                  :src="item?.url"
                  :onerror="this.src='https://placehold.co/600x400'"
                  :alt="item?.url"
                  :class="[
                    'h-5rem',
                    'object-contain',
                    'cursor-pointer',
                    'border-2',
                    'border-transparent',
                    'transition-colors',
                    'transition-duration-150',
                    'border-round',
                    { 'border-primary': selectedIndex === index }
                  ]"
                  @mouseover="selectImage(index)"
                />
              </div>
              <div class="pl-3 w-10 flex">
                <img
                  :src="selectedImage?.url"
                  :alt="selectedImage?.id"
                  :onerror="this.src='https://placehold.co/600x400'"
                  class="w-full border-2 border-primary-100 border-round"
                  height="500"
                />
              </div>
            </template>
          </div>
        </div>
        <div class="col-12 lg:col-4 py-3 lg:pl-6">
          <div v-if="isLoading">
            <Skeleton width="100%" height="36rem"></Skeleton>
          </div>
          <template v-else>
            <div class="flex align-items-center text-2xl font-semibold text-gray-500 mb-4">
              {{ productDetails?.category?.name }}
            </div>
            <div class="flex align-items-center text-3xl font-bold text-900 mb-4">
              {{ productDetails?.brand?.name }}
            </div>
            <div class="flex align-items-center text-3xl font-bold text-900 mb-4">
              {{  productDetails?.name }}
            </div>
            <Divider />
            <div class="flex align-items-center text-lg font-medium text-500 mb-4">
              {{ productDetails?.description }}
            </div>
            <div class="flex align-items-center justify-content-between mb-5">
              <span class="text-900 font-medium text-3xl block">{{
                '$' + productDetails?.salesPrice
              }}</span>
            </div>
            <div class="font-bold text-lg text-900 mb-3">Quantity</div>
            <div
              class="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between"
            >
              <div class="flex mr-4 mb-3">
                <InputNumber
                  v-model="quantity"
                  inputId="horizontal-buttons"
                  showButtons
                  buttonLayout="horizontal"
                  inputClass="sm:w-4rem h-3rem"
                  :allowEmpty="false"
                  :min="1"
                  :max="productDetails?.stock"
                >
                  <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                  </template>
                  <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                  </template>
                </InputNumber>
              </div>
              <div class="flex gap-4 mb-3">
                <Button
                  icon="pi pi-shopping-cart"
                  label="Add to Cart"
                  size="large"
                  class="flex-auto w-full white-space-nowrap"
                  @click="addProductBasket(productDetails)"
                ></Button>
                <!-- <Button icon="pi pi-heart" size="large" outlined></Button> -->
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
