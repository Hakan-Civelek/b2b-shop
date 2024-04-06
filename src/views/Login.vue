<script>
import { mapActions, mapGetters } from 'vuex'
import ToastMixin from '@/mixins/toast.js'
export default {
  data() {
    return {
      credentials: {
        username: 'kminchelle',
        password: '0lelplR'
      }
    }
  },
  mixins: [ToastMixin],
  computed: {
    ...mapGetters('app', ['isAdmin'])
  },
  methods: {
    ...mapActions('app', ['login']),
    doLogin() {
      this.login(this.credentials)
        .then(() => {
          console.log(this.isAdmin)
          if (this.isAdmin) this.$router.push('/admin')
          else this.$router.push('/products')
        })
        .catch(() => {
          this.showErrorMessage('Invalid credentials')
        })
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <div class="text-center mb-5">
        <img
          src="https://blocks.primevue.org/images/blocks/logos/hyper.svg"
          alt="Image"
          height="50"
          class="mb-3"
        />
        <div class="text-900 text-3xl font-medium mb-3">Welcome B2B Shop</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <div>
        <label for="username" class="block text-900 font-medium mb-2">Username</label>
        <InputText
          v-model="credentials.username"
          id="username"
          type="text"
          placeholder="Username"
          class="w-full mb-3"
        />

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText
          v-model="credentials.password"
          id="password1"
          type="password"
          placeholder="Password"
          class="w-full mb-3"
          @keypress.enter="doLogin"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox id="rememberme1" :binary="true" v-model="checked1" class="mr-2"></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <Button label="Sign In" icon="pi pi-user" class="w-full" @click="doLogin"></Button>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
