<script>
import { mapActions } from 'vuex'
import { FilterMatchMode } from 'primevue/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import ToastMixin from '@/mixins/toast.js'

export default {
  name: 'Brands',
  data() {
    return {
      brands: null,
      brandDialog: false,
      deleteBrandDialog: false,
      brand: {},
      selectedBrands: [],
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
  mixins: [ToastMixin],
  created() {
    this.initFilters();
    this.fetchData();
  },
  methods: {
    ...mapActions('managementTable', ['fetchTableDatas', 'deleteTableData', 'updateItem', 'addItem']),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
      this.isLoading = true

      return this.fetchTableDatas({
        url: '/brand'
      })
        .then(({ data }) => {
          this.items = data
          this.total = data.length
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
      this.brand = {}
      this.submitted = false
      this.brandDialog = true
    },
    hideDialog() {
      this.brandDialog = false
      this.submitted = false
    },
    saveUser() {
      this.submitted = true
      console.log(this.brand);
      if (this.brand?.name?.trim()) {
        if (this.brand.tenantId) {
          this.updateItem({
            url: `/brand/${this.brand.tenantId}`,
            data: this.brand
          })
            .then(() => {
              this.showSuccessMessage('Brand updated successfully')
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
        } else {
          this.brand.isActive = true
          this.addItem({
            url: '/brand',
            data: this.brand
          })
            .then(() => {
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
        }

        this.brandDialog = false
        this.brand = {}
      }
    },
    editUser(brand) {
      this.brand = { ...brand }
      this.brandDialog = true
    },
    confirmDeleteUser(brand) {
      this.brand = brand
      this.deleteBrandDialog = true
    },
    deleteSelectedBrands() {
      console.log(this.brand);
      this.isLoading = true

      return this.deleteTableData({
        url: `/brand/${this.brand.tenantId}`,
      })
        .then(() => {
          this.fetchData()
        })
        .catch((error) => {
          this.showErrorMessage(error.message)
        })
        .finally(() => {
          this.isLoading = false
          this.deleteBrandDialog = false
          this.brand = {}
        })
    },
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.brands.length; i++) {
        if (this.brands[i].id === id) {
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
        formData.append('brandId', this.brand.id)

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
          icon="pi pi-refresh"
          severity="info"
          class="mr-2"
          :loading="isLoading"
          @click="fetchData"
        />
      </template>
    </Toolbar>

    <DataTable
      :value="items"
      v-model:selection="selectedBrands"
      size="small"
      dataKey="tenantId"
      :loading="isLoading"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} brands"
      scrollable
      scrollHeight="calc(100vh - 249px)"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 class="m-0">{{ Brands }}</h4>
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </IconField>
        </div>
      </template>
      <template #loading> Loading brands data. Please wait. </template>
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="active" header="Status" sortable>
        <template #body="slotProps">
          <Tag :value="slotProps.data.active ? 'Active' : 'Inactive'" :severity="getStatusLabel(slotProps.data.active ? 'Active' : 'Inactive')" />
        </template>
      </Column>
      <Column :exportable="false" frozen alignFrozen="right" style="min-width: 7rem">
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
      v-model:visible="brandDialog"
      :style="{ width: '450px' }"
      header="User Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="brand.name"
          required="true"
          autofocus
          :invalid="submitted && !brand.name"
        />
        <small class="p-error" v-if="submitted && !brand.name">Name is required.</small>
      </div>
      <div class="field flex align-items-center">
        <label for="active">Status</label>
        <InputSwitch v-model="brand.active" class="ml-2 mb-2" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBrandDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="brand"
          >Are you sure you want to delete <b>{{ brand.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteBrandDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedBrands()" />
      </template>
    </Dialog>
  </div>
</template>
