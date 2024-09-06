<script>
import { mapActions, mapState } from 'vuex'
import ToastMixin from '@/mixins/toast.js'

export default {
  name: 'Shop Settings',
  data() {
    return {
      shop: {
        name: '',
        email: '',
        phoneNumber: '',
        vatNumber: '',
        privacyPolicy: '',
        aboutUs: '',
      },
    }
  },
  mixins: [ToastMixin],
  mounted() {
    this.getShop()
  },
  computed: {
    ...mapState('app', ['user']),
    shopId() {
      return this.user.shop.tenantId
    }
  },
  methods: {
    ...mapActions('adminPanel', ['fetchShop', 'updateShop']),
    getShop() {
      this.fetchShop(this.shopId).then(({ data }) => {
        this.shop = data
      })
    },
    updateMe() {
      this.shop.id = this.shopId
      this.updateShop(this.shop).then(() => {
        this.getShop()
        this.showSuccessMessage('Shops updated successfully')
      })
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <Button label="Save" class="mb-3" @click="updateMe" severity="success"></Button>
          <Button icon="pi pi-refresh" severity="info" class="ml-2 mb-3" @click="getShop" />

          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="firstname2">Shop Name</label>
              <InputText v-model="shop.name" id="firstname2" type="text" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="email">Email</label>
              <InputText v-model="shop.email" id="email" type="text" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="phone">Phone</label>
              <InputText v-model="shop.phoneNumber" id="phone" type="text" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="vat">VAT Number</label>
              <InputText v-model="shop.vatNumber" id="vat" type="text" />
            </div>
            <div class="field col-12">
              <label for="privacy">Privacy Policy</label>
              <Textarea v-model="shop.privacyPolicy" id="privacy" type="text" />
            </div>
            <div class="field col-12">
              <label for="about">About Us</label>
              <Textarea v-model="shop.aboutUs" id="about" type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>
<style></style>
