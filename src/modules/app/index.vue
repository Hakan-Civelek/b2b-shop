<script>
import ShopToolbar from '@/shared/ShopToolbar.vue'
export default {
  name: 'App',
  components: {
    ShopToolbar
  },
  computed: {
    isNoLayoutPage() {
      return this.$route.meta.noLayout
    }
  }
}
</script>

<template>
  <ShopToolbar v-if="!isNoLayoutPage" />
  <Toast position="bottom-right" group="br" />
  <router-view />
</template>
