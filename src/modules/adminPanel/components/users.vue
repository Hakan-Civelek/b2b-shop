<script>
import { mapActions } from 'vuex'
import { FilterMatchMode } from 'primevue/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import ToastMixin from '@/mixins/toast.js'

export default {
  name: 'Users',
  data() {
    return {
      users: null,
      userDialog: false,
      deleteUserDialog: false,
      user: {},
      selectedUsers: [],
      filters: {},
      submitted: false,
      items: [],
      isLoading: true,
      customers: []
    }
  },
  components: {
    IconField,
    InputIcon
  },
  mixins: [ToastMixin],
  created() {
    this.initFilters()
    this.fetchData()
  },
  methods: {
    ...mapActions('managementTable', [
      'fetchTableDatas',
      'deleteTableData',
      'updateItem',
      'addItem'
    ]),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
      this.isLoading = true

      return this.fetchTableDatas({
        url: '/user'
      })
        .then(({ data }) => {
          this.items = data
        })
        .catch((error) => {
          this.showErrorMessage(error.message)
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
      this.getCustomers()
      this.user = {}
      this.user.active = true
      this.submitted = false
      this.userDialog = true
    },
    hideDialog() {
      this.userDialog = false
      this.submitted = false
    },
    saveUser() {
      this.submitted = true
      console.log(this.user)
      if (this.user?.name?.trim()) {
        if (this.user.id) {
          this.updateItem({
            url: `/user/${this.user.id}`,
            data: this.user
          })
            .then(() => {
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
        } else {
          this.user.authorities = 'ROLE_CUSTOMER_USER'
          this.addItem({
            url: '/user',
            data: this.user
          })
            .then(() => {
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
        }

        this.userDialog = false
        this.user = {}
      }
    },
    editUser(user) {
      this.getCustomers()
      this.user = { ...user }
      this.userDialog = true
    },
    confirmDeleteUser(user) {
      this.user = user
      this.deleteUserDialog = true
    },
    deleteSelectedUsers() {
      this.isLoading = true
      console.log(this.selectedUsers)

      return this.deleteTableData({
        url: `/user/${this.user.id}`
      })
        .then(() => {
          this.showSuccessMessage('User deleted successfully')
        })
        .catch((error) => {
          this.showErrorMessage(error.message)
        })
        .finally(() => {
          this.isLoading = false
          this.deleteUserDialog = false
          this.fetchData()
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
    getCustomers() {
      return this.fetchTableDatas({
        url: '/customer'
      })
        .then(({ data }) => {
          this.customers = []
          data.forEach((customer) => {
            this.customers.push({
              name: customer.name,
              tenantId: customer.tenantId
            })
          })
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
  }
}
</script>

<template>
  <div>
    <Toolbar class="mb-2">
      <template #start>
        <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
        <Button icon="pi pi-refresh" severity="info" class="mr-2" @click="fetchData" />
      </template>
    </Toolbar>

    <DataTable
      v-model:selection="selectedUsers"
      :value="items"
      dataKey="id"
      :loading="isLoading"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
      scrollable
      scrollHeight="calc(100vh - 249px)"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 class="m-0">{{ Users }}</h4>
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </IconField>
        </div>
      </template>
      <template #loading> Loading users data. Please wait. </template>
      <Column field="id" header="ID" sortable></Column>
      <Column field="authorities" header="Authorities" sortable>
        <template #body="slotProps">
          {{ slotProps.data?.authorities?.map((authority) => authority).join(', ') }}
        </template>
      </Column>
      <Column field="customer" header="Customer" sortable>
        <template #body="slotProps">
          {{ slotProps.data?.customer?.name }}
        </template>
      </Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="username" header="Username" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="phoneNumber" header="Phone Number" sortable></Column>
      <Column field="active" header="Status" sortable>
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.active ? 'Active' : 'Inactive'"
            :severity="getStatusLabel(slotProps.data.active ? 'Active' : 'InActive')"
          />
        </template>
      </Column>
      <Column :exportable="false" frozen alignFrozen="right">
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
      v-model:visible="userDialog"
      :style="{ width: '450px' }"
      header="User Details"
      :modal="true"
      class="p-fluid"
    >
      <div v-if="!user.id" class="field">
        <label for="name">Customer</label>
        <Dropdown
          v-model="user.customerTenantId"
          :invalid="submitted && !user.customerTenantId"
          :options="customers"
          optionLabel="name"
          optionValue="tenantId"
          placeholder="Select a Customer"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="user.name"
          required="true"
          autofocus
          :invalid="submitted && !user.name"
        />
        <small class="p-error" v-if="submitted && !user.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="name">Username</label>
        <InputText id="name" v-model.trim="user.username" autofocus />
      </div>
      <div v-if="!user.id" class="field">
        <label for="name">Password</label>
        <InputText id="name" v-model.trim="user.password" autofocus />
      </div>
      <div class="field">
        <label for="name">Email</label>
        <InputText id="name" v-model.trim="user.email" autofocus />
      </div>
      <div class="field">
        <label for="name">Phone Number</label>
        <InputText id="name" v-model.trim="user.phoneNumber" autofocus />
      </div>
      <div class="field">
        <label for="active">Status</label>
        <InputSwitch v-model="user.active" class="ml-2" />
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
        <span v-if="user"
          >Are you sure you want to delete <b>{{ user.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteUserDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedUsers" />
      </template>
    </Dialog>
  </div>
</template>
