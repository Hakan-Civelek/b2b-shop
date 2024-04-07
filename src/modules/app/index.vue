<script>
import ShopToolbar from '@/shared/ShopToolbar.vue'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    ShopToolbar
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    isNoLayoutPage() {
      return this.$route.meta.noLayout
    }
  },
  created() {
    this.isLoading = true
    this.getLoggedInUser()
      .then(() => {
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions('app', ['getLoggedInUser'])
  }
}
</script>

<template>
  <ShopToolbar v-if="!isNoLayoutPage && !isLoading" />
  <Toast position="bottom-right" group="br" />
  <router-view v-if="!isLoading" />
</template>
