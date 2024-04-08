<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('adminPanel', ['dashboardItems']),
    ...mapState('app', ['user'])
  }
}
</script>

<template>
  <div class="formgrid grid">
    <div class="col-2">
      <Menu :model="dashboardItems" style="height: calc(100vh - 44px)">
        <template #start>
          <span class="inline-flex align-items-center gap-1 px-2 py-2">
            <span class="font-medium text-4xl font-semibold"
              >B2B<span class="text-primary">SHOP</span></span
            >
          </span>
        </template>
        <template #submenuheader="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <router-link v-slot="{ href, navigate }" :to="item.route" custom>
            <a
              v-ripple
              class="flex align-items-center"
              v-bind="props.action"
              :href="href"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
              <span
                v-if="item.shortcut"
                class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
                >{{ item.shortcut }}</span
              >
            </a>
          </router-link>
        </template>
        <template #end>
          <button
            v-ripple
            class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
          >
            <Avatar
              :image="user.image"
              class="mr-2"
              shape="circle"
            />
            <span class="inline-flex flex-column">
              <span class="font-bold">{{ user.firstName + ' ' + user.lastName }}</span>
              <span class="text-sm">Admin</span>
            </span>
          </button>
        </template>
      </Menu>
    </div>
    <div class="col-10">
      <div class="card p-3 mb-0 p-menu" style="height: calc(100vh - 44px)">
        <router-view />
      </div>
    </div>
  </div>
</template>
