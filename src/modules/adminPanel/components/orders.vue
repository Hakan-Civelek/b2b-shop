<script>
import ManagementTable from '@/shared/managementTable/index.vue'

export default {
  components: {
    ManagementTable
  },
}
</script>

<template>
  <div>
    <ManagementTable
      domain="/order"
      title="Orders"
    />
  </div>
</template>
