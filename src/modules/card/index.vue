<script>
import { mapActions } from 'vuex'
export default {
    name: 'Card',
    data() {
      return {
        items: [],
        loading: false,
        shippingOptions: [
          { id: 1, name: 'Shipping Option 1' },
          { id: 2, name: 'Shipping Option 2' },
          { id: 3, name: 'Shipping Option 3' },
        ],
        receiverOptions: [
          { id: 1, name: 'Receiver Option 1' },
          { id: 2, name: 'Receiver Option 2' },
          { id: 3, name: 'Receiver Option 3' },
        ],
        selectedShipping: null,
        selectedReceiver: null,
      }
    },
    mounted() {
      this.getBasket()
    },
    methods: {
      ...mapActions('card', ['fetchBasket', 'addBasket', 'removeItemFromBasket']),
      getBasket() {
        this.fetchBasket().then(({ data }) => {
          this.items = data.basketItems;
        })
      },
      getThumbnail(item) {
        return item.images?.find(image => image.isThumbnail) ? item.images.find(image => image.isThumbnail) : ''
      },
      removeProductBasket(item) {
        const payload = {
          productId: item.productId,
        }
        this.removeItemFromBasket(payload).then(() => {
          this.getBasket()
        })
      },
      updateProductBasket(item) {
        console.log(item);
        const payload = {
          productId: item.productId,
          quantity: item.quantity,
          updateQuantity: true,
        }
        this.addBasket(payload).then(() => {
          this.getBasket()
        })
      },
    }
}
</script>

<template>
  <div class="card p-0 mb-0 p-menu" style="height: calc(100vh - 143px)">
    <div class="flex border-round p-0 m-0 h-full">
        <div class="w-8 font-bold p-8 flex flex-column">
          <div class="flex justify-content-between w-full mb-2">
            <h1>Shopping Card</h1>
            <h1>3 Items</h1>
          </div>
          <Divider />
        <DataView
          :value="items"
          :rows="4"
          class="overflow-auto"
        >
        <template #header>
            <div class="flex flex-row justify-content-between gap-4">
              <div class="flex w-3 flex-column md:align-items-start gap-5">
                <span class="text-lg font-semibold text-900">Product</span>
              </div>
              <div class="flex w-2 flex-column md:align-items-end gap-5">
                <span class="text-lg font-semibold text-900">Quantity</span>
              </div>
              <div class="flex w-2 flex-column md:align-items-end gap-5">
                <span class="text-lg font-semibold text-900">Price</span>
              </div>
              <div class="flex w-2 flex-column md:align-items-end gap-5">
                <span class="text-lg font-semibold text-900">Total</span>
              </div>
            </div>
          </template>
          <template #list="slotProps">
            <div class="grid grid-nogutter">
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
                  <div class="flex w-12 flex-column md:flex-row justify-content-between md:align-items-center gap-4">
                    <div class="flex w-3 flex-row md:flex-column justify-content-between align-items-start gap-2">
                      <div>
                        <!-- <span class="font-medium text-secondary text-sm">{{ item.brand }}</span> -->
                        <div
                          class="text-lg font-medium text-900 mt-2 cursor-pointer"
                          @click="goProductDetail(item)"
                        >
                          {{ item.productName }}
                        </div>
                        <Button
                          label="Remove"
                          icon="pi pi-trash"
                          class="p-button-danger p-button-outlined mt-4"
                          @click="removeProductBasket(item)"
                        ></Button>
                      </div>
                    </div>
                    <div class="flex w-2 flex-column md:align-items-end gap-5">
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
                          :max="item?.productStock"
                          @update:modelValue="updateProductBasket(item)"
                        >
                          <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                          </template>
                          <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                          </template>
                        </InputNumber>
                      </div>
                      </div>
                    </div>
                    <div class="flex w-2 flex-column md:align-items-end gap-5">
                      <span class="text-xl font-semibold text-900">${{ item.salesPrice }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                      </div>
                    </div>
                    <div class="flex w-2 flex-column md:align-items-end gap-5">
                      <span class="text-xl font-semibold text-900">${{ item.quantity * item.salesPrice }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
        </div>
        <div class="w-4 surface-100 border-round-right font-bold p-8 flex flex-column">
          <div class="flex justify-content-between w-full mb-2">
            <h1>Order Summary</h1>
          </div>
          <Divider />
          <div class="flex justify-content-between w-full mb-2">
            <h1>Shipping Address</h1>
          </div>
          <div class="flex justify-content-between w-full mb-2">
            <Dropdown
              :options="shippingOptions"
              optionLabel="name"
              optionValue="id"
              v-model="selectedShipping"
              placeholder="Select Shipping"
              class="w-full"
            />
          </div>
          <div class="flex justify-content-between w-full mb-2">
            <h1>Receiver Address</h1>
          </div>
          <div class="flex justify-content-between w-full mb-2">
            <Dropdown
              :options="receiverOptions"
              optionLabel="name"
              optionValue="id"
              v-model="selectedReceiver"
              placeholder="Select Receiver"
              class="w-full"
            />
          </div>
          <Divider />
          <div class="flex justify-content-between w-full mb-2">
            <h2>Subtotal</h2>
            <h2>$ 0.00</h2>
          </div>
          <div class="flex justify-content-between w-full mb-2">
            <h2>Total TAX</h2>
            <h2>$ 0.00</h2>
          </div>
          <div class="flex justify-content-between w-full mb-2">
            <h2>Total Amount</h2>
            <h2>$ 1,200.00</h2>
          </div>
          <div class="flex justify-content-between w-full mb-2">
            <Button label="Checkout" class="p-button-success w-full"></Button>
          </div>
        </div>
    </div>
  </div>
</template>

<style></style>
