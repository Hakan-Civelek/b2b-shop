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
      deleteUserDialog: false,
      deleteCustomersDialog: false,
      customer: {},
      selectedCustomers: [],
      filters: {},
      submitted: false,
      items: [],
      isLoading: true,
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
    ...mapActions('managementTable', ['fetchTableDatas', 'deleteTableData', 'updateItem', 'addItem']),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
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
    saveUser() {
      this.submitted = true
      console.log(this.customer);
      if (this.customer?.name?.trim()) {
        if (this.customer.id) {
          this.updateItem({
            url: `/customer/${this.customer.id}`,
            data: this.customer
          })
            .then(() => {
              this.fetchData()
            })
            .catch((error) => {
              this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 3000
              })
            })
        } else {
          this.addItem({
            url: '/customer',
            data: this.customer
          })
            .then(() => {
              this.fetchData()
            })
            .catch((error) => {
              this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 3000
              })
            })
        }

        this.customerDialog = false
        this.customer = {}
      }
    },
    editUser(customer) {
      this.customer = { ...customer }
      this.customerDialog = true
    },
    confirmDeleteUser(customer) {
      this.customer = customer
      this.deleteUserDialog = true
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
          class="mr-2"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteSelected"
          :disabled="!selectedCustomers || !selectedCustomers.length"
        />
        <Button
          icon="pi pi-refresh"
          severity="info"
          class="mr-2"
          @click="fetchData"
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
      :loading="isLoading"
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
      <template #loading> Loading customers data. Please wait. </template>
      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
      <Column field="tenantId" header="Tenant ID" sortable style="min-width: 12rem"></Column>
      <Column field="shop" header="Shop" sortable style="min-width: 16rem">
        <template #body="slotProps">
          {{ slotProps.data?.shop?.name }}
        </template>
      </Column>
      <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
      <Column field="email" header="Email" sortable style="min-width: 16rem"></Column>
      <Column field="phoneNumber" header="Phone Number" sortable style="min-width: 16rem"></Column>
      <Column field="vatNumber" header="VAT Number" sortable style="min-width: 16rem"></Column>
      <Column :exportable="false" style="min-width: 7rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editUser(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteUser(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="customerDialog"
      :style="{ width: '450px' }"
      header="User Details"
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
        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteUserDialog"
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
        <Button label="No" icon="pi pi-times" text @click="deleteUserDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteUser" />
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
