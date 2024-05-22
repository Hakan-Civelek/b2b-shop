<script>
import { mapActions } from 'vuex'
import { FilterMatchMode } from 'primevue/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

export default {
  name: 'Customers',
  data() {
    return {
      customers: null,
      customerDialog: false,
      deleteCustomerDialog: false,
      deleteCustomersDialog: false,
      customer: {},
      selectedCustomers: [],
      filters: {},
      submitted: false,
      statuses: [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
      ],
      items: [],
    }
  },
  components: {
    IconField,
    InputIcon
  },
  created() {
    this.initFilters();
    this.fetchData();
  },
  methods: {
    ...mapActions('managementTable', ['fetchTableDatas', 'deleteTableData']),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
      this.isLoading = true

      return this.fetchTableDatas({
        url: '/customer'
      })
        .then(({ data }) => {
          // this.headers = response.meta.tableSettings
          this.items = data
          this.total = data.length
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
    openNew() {
      this.customer = {}
      this.submitted = false
      this.customerDialog = true
    },
    hideDialog() {
      this.customerDialog = false
      this.submitted = false
    },
    saveCustomer() {
      this.submitted = true

      if (this.customer?.name?.trim()) {
        if (this.customer.id) {
          this.customer.inventoryStatus = this.customer.inventoryStatus.value
            ? this.customer.inventoryStatus.value
            : this.customer.inventoryStatus
          this.customers[this.findIndexById(this.customer.id)] = this.customer
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Customer Updated',
            life: 3000
          })
        } else {
          this.customer.id = this.createId()
          this.customer.code = this.createId()
          this.customer.image = 'customer-placeholder.svg'
          this.customer.inventoryStatus = this.customer.inventoryStatus
            ? this.customer.inventoryStatus.value
            : 'INSTOCK'
          this.customers.push(this.customer)
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Customer Created',
            life: 3000
          })
        }

        this.customerDialog = false
        this.customer = {}
      }
    },
    editCustomer(customer) {
      this.customer = { ...customer }
      this.customerDialog = true
    },
    confirmDeleteCustomer(customer) {
      this.customer = customer
      this.deleteCustomerDialog = true
    },
    deleteSelectedCustomers() {
      this.isLoading = true

      return this.deleteTableData({
        url: `/customer/${this.selectedCustomers[0].id}`,
      })
        .then(({ data }) => {
          // this.headers = response.meta.tableSettings
          console.log(data);
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
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].id === id) {
          index = i
          break
        }
      }

      return index
    },
    createId() {
      let id = ''
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      return id
    },
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    confirmDeleteSelected() {
      this.deleteCustomersDialog = true
    },
    deleteSelectedCustomerss() {
      console.log(this.selectedCustomers);
      this.customers = this.customers.filter((val) => !this.selectedCustomers.includes(val))
      this.deleteCustomersDialog = false
      this.selectedCustomers = null
      this.$toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Customers Deleted',
        life: 3000
      })
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case 'Active':
          return 'success'

        case 'Inactive':
          return 'warning'

        default:
          return null
      }
    },
    myUploader(event) {
      const file = event.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('customerId', this.customer.id)

        this.uploadImage(formData)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<template>
  <div>
    <Toolbar class="mb-2">
      <template #start>
        <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteSelected"
          :disabled="!selectedCustomers || !selectedCustomers.length"
        />
      </template>

      <template #end>
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          label="Import"
          chooseLabel="Import"
          class="mr-2 inline-block"
        />
        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      :value="items"
      v-model:selection="selectedCustomers"
      size="small"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers"
      scrollable
      scrollHeight="calc(100vh - 249px)"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 class="m-0">{{ Customers }}</h4>
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </IconField>
        </div>
      </template>
      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
      <Column field="tenantId" header="Tenant Id" sortable style="min-width: 12rem"></Column>
      <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
      <Column field="email" header="Email" sortable style="min-width: 16rem"></Column>
      <Column field="phoneNumber" header="Phone Number" sortable style="min-width: 16rem"></Column>
      <Column field="vatNumber" header="VAT Number" sortable style="min-width: 8rem"></Column>
      <Column :exportable="false" style="min-width: 7rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editCustomer(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteCustomer(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="customerDialog"
      :style="{ width: '450px' }"
      header="Customer Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="customer.name"
          required="true"
          autofocus
          :invalid="submitted && !customer.name"
        />
        <small class="p-error" v-if="submitted && !customer.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="name">Email</label>
        <InputText
          id="name"
          v-model.trim="customer.email"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">Phone Number</label>
        <InputText
          id="name"
          v-model.trim="customer.phoneNumber"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">VAT Number</label>
        <InputText
          id="name"
          v-model.trim="customer.vatNumber"
          autofocus
        />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveCustomer" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCustomerDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="customer"
          >Are you sure you want to delete <b>{{ customer.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteCustomerDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteCustomer" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCustomersDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="customer">Are you sure you want to delete the selected customers?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteCustomersDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCustomers" />
      </template>
    </Dialog>
  </div>
</template>
