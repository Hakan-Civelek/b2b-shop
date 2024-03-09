<script>
import ShopToolbar from '@/shared/ShopToolbar.vue'
export default {
  components: {
    ShopToolbar,
  },
  computed: {
    isNoLayoutPage() {
      return this.$route.meta.noLayout;
    },
  }
}
</script>

<template>
  <ShopToolbar v-if="!isNoLayoutPage" />
  <router-view />
</template>
