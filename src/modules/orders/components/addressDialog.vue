<script>
import { mapActions } from 'vuex';
export default {
  name: 'AddressDialog',
  data() {
    return {
      addressDialog: true,
      submitted: false,
      address: {
        title: '',
        countryId: null,
        city: '',
        addressLine: '',
      },
    }
  },
  mounted() {
    this.getCountries()
  },
  methods: {
    ...mapActions('app', ['fetchCountries', 'createAddress']),
    hideDialog() {
      this.addressDialog = false
      this.$emit('close');
    },
    getCountries() {
      this.fetchCountries().then(({ data }) => {
        this.countries = data
      })
    },
    saveAddress() {
      this.submitted = true
      if (this.address.title) {
        this.createAddress(this.address).then(() => {
          this.$emit('save')
          this.addressDialog = false
        })
      }
    }
  }
}
</script>

<template>
  <div>
    <Dialog
      v-model:visible="addressDialog"
      :style="{ width: '450px' }"
      header="New Address"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Title</label>
        <InputText
          id="Title"
          v-model.trim="address.title"
          required="true"
          autofocus
          :invalid="submitted && !address.title"
        />
        <small class="p-error" v-if="submitted && !address.title">Title is required.</small>
      </div>
      <div class="field">
        <label for="name">Country</label>
        <Dropdown
          :options="countries"
          optionLabel="countryName"
          optionValue="id"
          v-model="address.countryId"
          placeholder="Select a Country"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">City</label>
        <InputText
          id="city"
          v-model.trim="address.city"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">Address</label>
        <InputText
          id="addressLine"
          v-model.trim="address.addressLine"
          autofocus
        />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveAddress" />
      </template>
    </Dialog>

  </div>
</template>

<style></style>
