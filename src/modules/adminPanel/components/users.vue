<script>
import { mapActions } from 'vuex'
import { FilterMatchMode } from 'primevue/api'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

export default {
  name: 'Users',
  data() {
    return {
      users: null,
      userDialog: false,
      deleteUserDialog: false,
      deleteUsersDialog: false,
      user: {},
      selectedUsers: [],
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
        url: '/user'
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
      this.user = {}
      this.submitted = false
      this.userDialog = true
    },
    hideDialog() {
      this.userDialog = false
      this.submitted = false
    },
    saveUser() {
      this.submitted = true
      console.log(this.user);
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
              this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 3000
              })
            })
        } else {
          this.addItem({
            url: '/user',
            data: this.user
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

        this.userDialog = false
        this.user = {}
      }
    },
    editUser(user) {
      this.user = { ...user }
      this.userDialog = true
    },
    confirmDeleteUser(user) {
      this.user = user
      this.deleteUserDialog = true
    },
    deleteSelectedUsers() {
      this.isLoading = true

      return this.deleteTableData({
        url: `/user/${this.selectedUsers[0].id}`,
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
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
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
      this.deleteUsersDialog = true
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
        formData.append('userId', this.user.id)

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
          :disabled="!selectedUsers || !selectedUsers.length"
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
      v-model:selection="selectedUsers"
      size="small"
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
      <template #loading> Loading customers data. Please wait. </template>
      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
      <Column field="id" header="ID" sortable style="min-width: 12rem"></Column>
      <Column field="authorities" header="Authorities" sortable style="min-width: 16rem">
        <template #body="slotProps">
          {{ slotProps.data?.authorities?.map((authority) => authority).join(', ') }}
        </template>
      </Column>
      <Column field="customer" header="Customer" sortable style="min-width: 16rem">
        <template #body="slotProps">
          {{ slotProps.data?.customer?.name }}
        </template>
      </Column>
      <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
      <Column field="username" header="Username" sortable style="min-width: 16rem"></Column>
      <Column field="email" header="Email" sortable style="min-width: 16rem"></Column>
      <Column field="phoneNumber" header="Phone Number" sortable style="min-width: 16rem"></Column>
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
      v-model:visible="userDialog"
      :style="{ width: '450px' }"
      header="User Details"
      :modal="true"
      class="p-fluid"
    >
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
        <InputText
          id="name"
          v-model.trim="user.username"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">Email</label>
        <InputText
          id="name"
          v-model.trim="user.email"
          autofocus
        />
      </div>
      <div class="field">
        <label for="name">Phone Number</label>
        <InputText
          id="name"
          v-model.trim="user.phoneNumber"
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
        <span v-if="user"
          >Are you sure you want to delete <b>{{ user.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteUserDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteUser" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteUsersDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="user">Are you sure you want to delete the selected users?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedUsers" />
      </template>
    </Dialog>
  </div>
</template>
