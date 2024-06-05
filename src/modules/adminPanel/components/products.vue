<script>
import { mapActions } from 'vuex'
import { FilterMatchMode } from 'primevue/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

export default {
  data() {
    return {
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: [],
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
    ...mapActions('managementTable', ['fetchTableDatas', 'deleteTableData', 'addItem', 'updateItem']),
    ...mapActions('adminPanel', ['uploadImage']),
    fetchData() {
      this.isLoading = true

      return this.fetchTableDatas({
        url: '/product'
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
      this.product = {
        active: true,
      }
      this.submitted = false
      this.productDialog = true
    },
    hideDialog() {
      this.productDialog = false
      this.submitted = false
    },
    saveProduct() {
      this.submitted = true

      if (this.product?.name?.trim()) {
        if (this.product.id) {
          this.updateItem({
            url: `/product/${this.product.id}`,
            data: this.product
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
            url: '/product',
            data: this.product
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

        this.productDialog = false
        this.product = {}
      }
    },
    editProduct(product) {
      this.product = { ...product }
      this.productDialog = true
    },
    confirmDeleteProduct(product) {
      this.product = product
      this.deleteProductDialog = true
    },
    deleteSelectedProducts() {
      this.isLoading = true

      return this.deleteTableData({
        url: `/product/${this.selectedProducts[0].id}`,
      })
        .then(() => {
          this.fetchData()
          this.deleteProductsDialog = false;
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
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true
    },
    deleteSelectedProductss() {
      this.products = this.products.filter((val) => !this.selectedProducts.includes(val))
      this.deleteProductsDialog = false
      this.selectedProducts = null
      this.$toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Products Deleted',
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
        formData.append('productId', this.product.id)

        this.uploadImage(formData)
          .then(({ data }) => {
            this.product.images.push(
              {
                url: data[0],
                isThumbnail: false
              }
            )
          })
      }
    },
    selectMainPicture(index) {
      this.product.images.forEach(image => {
        image.isThumbnail = false;
      });

      const selectedImage = this.product.images[index];
      selectedImage.isThumbnail = true;
    },
    getThumbnail(images) {
      return images.find(image => image.isThumbnail) ? images.find(image => image.isThumbnail) : images[0];
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
          :disabled="!selectedProducts || !selectedProducts.length"
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
      v-model:selection="selectedProducts"
      size="small"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      scrollable
      scrollHeight="calc(100vh - 249px)"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 class="m-0">{{ Products }}</h4>
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Search..." />
          </IconField>
        </div>
      </template>
      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
      <Column field="id" header="ID" sortable style="min-width: 12rem"></Column>
      <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
      <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.images.length"
            :src="getThumbnail(slotProps.data.images)?.url"
            :alt="getThumbnail(slotProps.data.images)?.id"
            class="border-round"
            style="width: 64px"
          />
        </template>
      </Column>
      <Column field="salesPrice" header="Sales Price" sortable style="min-width: 8rem">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.salesPrice) }}
        </template>
      </Column>
      <Column field="grossPrice" header="Gross Price" sortable style="min-width: 8rem">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.grossPrice) }}
        </template>
      </Column>
      <Column field="vatRate" header="VAT Rate" sortable style="min-width: 8rem">
        <template #body="slotProps">
          {{ slotProps.data.vatRate }}%
        </template>
      </Column>
      <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
      <Column field="stock" header="Stock" sortable style="min-width: 8rem"></Column>
      <Column field="active" header="Status" sortable style="min-width: 8rem">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.active ? 'Active' : 'Inactive'"
            :severity="getStatusLabel(slotProps.data.active ? 'Active' : 'InActive')"
          />
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 7rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <img
        v-for="(image, index) in product.images"
        :key="image.id"
        :src="image.imageUrl ? image.imageUrl : image.url"
        :alt="image.imageUrl"
        width="75"
        class="inline m-auto pb-3 mr-1 border-1 border-round"
        :class="image.isThumbnail ? 'border-orange-500' : ''"
        @click="selectMainPicture(index)"
      />
      <div class="field">
        <label for="image">Image</label>
        <FileUpload mode="basic" name="demo[]" url="api/image" accept="image/*" customUpload @uploader="myUploader" :auto="true" :multiple="true" />
      </div>
      <div class="field">
        <label for="code">Code</label>
        <InputText
          id="code"
          v-model.trim="product.code"
          required="true"
          autofocus
          :invalid="submitted && !product.code"
        />
        <small class="p-error" v-if="submitted && !product.code">Code is required.</small>
      </div>
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="product.name"
          required="true"
          autofocus
          :invalid="submitted && !product.name"
        />
        <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="gtin">GTIN</label>
        <InputText id="gtin" v-model.trim="product.gtin" />
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea
          id="description"
          v-model="product.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="active">Status</label>
        <Checkbox id="active" v-model="product.active" binary />
      </div>

      <div class="field">
        <label for="stock">Stock</label>
        <InputNumber id="stock" v-model="product.stock" integeronly />
      </div>

      <div class="field">
        <label for="category">Category</label>
        <Dropdown
          id="category"
          v-model="product.category"
          :options="categories"
          optionLabel="name"
          optionValue="name"
          placeholder="Select a Category"
        />
      </div>
      <div class="field">
        <label for="vatRate">VAT Rate</label>
        <InputNumber id="vatRate" v-model="product.vatRate" mode="decimal" prefix="%" />
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Sales Price</label>
          <InputNumber
            id="price"
            v-model="product.salesPrice"
            mode="currency"
            currency="TRY"
            locale="tr-tr"
          />
        </div>
        <div class="field col">
          <label for="cost">Gross Price</label>
          <InputNumber
            id="cost"
            v-model="product.grossPrice"
            mode="currency"
            currency="TRY"
            locale="tr-tr"
          />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete <b>{{ product.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete the selected products?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
      </template>
    </Dialog>
  </div>
</template>
