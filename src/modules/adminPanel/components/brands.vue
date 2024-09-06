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
      isLoading: true
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
    openNew() {
      this.brand = {}
      this.submitted = false
      this.brandDialog = true
    },
    hideDialog() {
      this.brandDialog = false
      this.submitted = false
    },
    saveBrand() {
      this.submitted = true
      if (this.brand?.name?.trim()) {
        if (this.brand.id) {
          this.updateItem({
            url: `/brand/${this.brand.id}`,
            data: this.brand
          })
            .then(() => {
              this.showSuccessMessage('Brand updated successfully')
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
            .finally(() => {
              this.brandDialog = false
              this.brand = {}
            })
        } else {
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
            .finally(() => {
              this.brandDialog = false
              this.brand = {}
            })
        }

        this.brandDialog = false
        this.brand = {}
      }
    },
    editBrand(brand) {
      this.brand = { ...brand }
      this.brandDialog = true
    },
    confirmDeleteBrand(brand) {
      this.brand = brand
      this.deleteBrandDialog = true
    },
    deleteSelectedBrands() {
      this.isLoading = true

      return this.deleteTableData({
        url: `/brand/${this.brand.id}`
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
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
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
      <Column :exportable="false" frozen alignFrozen="right" style="min-width: 7rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editBrand(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteBrand(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="brandDialog"
      :style="{ width: '450px' }"
      header="Brand Details"
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
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveBrand" />
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
