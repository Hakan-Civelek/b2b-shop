<script>
import { mapActions } from 'vuex'
import ToastMixin from '@/mixins/toast.js'
export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
      },
      passwordDialogVisible: false,
      password: {
        existPassword: '',
        newPassword: ''
      }
    }
  },
  mixins: [ToastMixin],
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapActions('profile', ['fetchProfile', 'updateProfile', 'updatePassword']),
    getProfile() {
      this.fetchProfile().then(({ data }) => {
        this.profile = data
      })
    },
    updateMe() {
      this.updateProfile(this.profile).then(() => {
        this.getProfile()
        this.showSuccessMessage('Profile updated successfully')
      })
    },
    showPasswordDialog() {
      this.passwordDialogVisible = true
    },
    resetPassword() {
      this.password.id = this.profile.id
      this.updatePassword(this.password).then(() => {
        this.getProfile()
        this.passwordDialogVisible = false
        this.showSuccessMessage('Password updated successfully')
      })
      .catch(() => {
        this.showErrorMessage('Wrong existing password!')
      })
    },
  }
}
</script>

<template>
  <div class="card">
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <Button label="Save" class="mb-3" @click="updateMe" severity="success"></Button>
          <Button label="Change Password" class="ml-2 mb-3" @click="showPasswordDialog" />
          <Button icon="pi pi-refresh" severity="info" class="ml-2 mb-3" @click="getProfile" />

          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="firstname2">Firstname</label>
              <InputText v-model="profile.name" id="firstname2" type="text" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="username">Username</label>
              <InputText v-model="profile.username" id="username" type="text" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="email">Email</label>
              <InputText v-model="profile.email" id="email" type="text" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="phone">Phone</label>
              <InputText v-model="profile.phoneNumber" id="phone" type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast />

    <Dialog
      v-model:visible="passwordDialogVisible"
      :style="{ width: '450px' }"
      header="Change Password"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="existPassword">Current Password</label>
        <Password v-model="password.existPassword" toggleMask id="existPassword" :feedback="false" />
      </div>
      <div class="field">
        <label for="newPassword">New Password</label>
        <Password v-model="password.newPassword" toggleMask id="newPassword" :feedback="false" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="passwordDialogVisible = false" />
        <Button label="Save" icon="pi pi-check" text @click="resetPassword" />
      </template>
    </Dialog>
  </div>
</template>
<style></style>
