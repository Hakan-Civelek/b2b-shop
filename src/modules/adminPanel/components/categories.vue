<script>
import { mapActions } from 'vuex'
import { FilterMatchMode } from 'primevue/api'
import ToastMixin from '@/mixins/toast.js'

export default {
  name: 'Categories',
  data() {
    return {
      categories: null,
      categoryDialog: false,
      deleteCategoryDialog: false,
      deleteCategoriesDialog: false,
      category: {},
      selectedCategories: [],
      filters: {},
      submitted: false,
      items: [],
      isLoading: true,
      expandedRows: {},
      editingRows: [],
    }
  },
  mixins: [ToastMixin],
  created() {
    this.initFilters();
    this.fetchData();
  },
  computed: {
    selectedSubCategories: {
      get() {
        return this.category.subCategories
      },
      set(value) {
        this.category.subCategories = value
      }
    },
  },
  methods: {
    ...mapActions('managementTable', ['fetchTableDatas', 'deleteTableData', 'updateItem', 'addItem']),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
      this.isLoading = true

      return this.fetchTableDatas({
        url: '/category'
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
      this.category = {}
      this.submitted = false
      this.categoryDialog = true
    },
    hideDialog() {
      this.categoryDialog = false
      this.submitted = false
    },
    saveCategory() {
      this.submitted = true
      if (this.category?.name?.trim()) {
        if (this.category.id) {
          this.updateItem({
            url: `/category/${this.category.id}`,
            data: this.category
          })
            .then(() => {
              this.showSuccessMessage('Category updated successfully')
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
        } else {
          this.category.isActive = true
          this.addItem({
            url: '/category',
            data: this.category
          })
            .then(() => {
              this.fetchData()
            })
            .catch((error) => {
              this.showErrorMessage(error.message)
            })
        }

        this.categoryDialog = false
        this.category = {}
      }
    },
    editCategory(category) {
      this.category = { ...category }
      this.categoryDialog = true
    },
    confirmDeleteCategory(category) {
      this.category = category
      this.deleteCategoryDialog = true
    },
    deleteSelectedCategories() {
      console.log(this.category);
      this.isLoading = true

      return this.deleteTableData({
        url: `/category/${this.category.id}`,
      })
        .then(() => {
          this.fetchData()
        })
        .catch((error) => {
          this.showErrorMessage(error.message)
        })
        .finally(() => {
          this.isLoading = false
          this.deleteCategoryDialog = false
          this.category = {}
        })
    },
    confirmDeleteSelected() {
      this.deleteCategoriesDialog = true
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
        formData.append('categoryId', this.category.id)

        this.uploadImage(formData)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    onRowEditSave(event) {
      let { newData, index } = event;
      console.log(event);
      this.products[index] = newData;
    },

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
          v-model:expandedRows="expandedRows"
          :value="items" dataKey="id" tableStyle="min-width: 60rem"
         >
            <template #header>
                <div class="flex flex-wrap justify-content-end gap-2">
                    <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
                    <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column expander style="width: 5rem" />
            <Column field="id" header="ID">
                </Column>
            <Column field="name" header="Category Name"></Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.isActive" :severity="getStatusLabel(slotProps.data.isActive)" />
                </template>
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteCategory(slotProps.data)" />
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-3">
                    <h5>Sub Categories for {{ slotProps.data.name }}</h5>
                    <DataTable
                      :value="slotProps.data.subCategories"
                      dataKey="id"
                    >
                        <Column field="id" header="Id" sortable class="w-1"></Column>
                        <Column field="name" header="Category Name"></Column>
                        <Column header="Actions">
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteCategory(slotProps.data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>

    <Dialog
      v-model:visible="categoryDialog"
      :style="{ width: '450px' }"
      header="Category Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="category.name"
          required="true"
          autofocus
          :invalid="submitted && !category.name"
        />
        <small class="p-error" v-if="submitted && !category.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="name">Parent Category</label>
        <Dropdown
          v-model="category.parentCategoryId"
          :invalid="submitted && !category.parentCategoryId"
          :options="items"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a Parent Category"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">Sub Category</label>
        <MultiSelect
          v-model="selectedSubCategories"
          :options="category.subCategories"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a Sub Category"
          autofocus
        />
      </div>
      <div class="field flex align-items-center">
        <label for="active">Status</label>
        <InputSwitch v-model="category.active" class="ml-2 mb-2" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveCategory" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCategoryDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="category"
          >Are you sure you want to delete <b>{{ category.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteCategoryDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCategories()" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCategoriesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="category">Are you sure you want to delete the selected categories?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteCategoriesDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCategories" />
      </template>
    </Dialog>
  </div>
</template>
