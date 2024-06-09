<script>
import { mapActions, mapState } from 'vuex'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

export default {
  data() {
    return {
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-home',
          route: '/profile',
          command: () => {
            this.routePath('/profile')
          }
        },
        {
          label: 'Products',
          icon: 'pi pi-star',
          route: '/products'
        },
        {
          label: 'Orders',
          icon: 'pi pi-shopping-cart',
          route: '/orders'
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          route: '/settings'
        },
        {
          label: 'Logout',
          icon: 'pi pi-power-off',
          route: '/logout',
          command: () => {
            this.logout()
          }
        }
      ],
      darkTheme: false
    }
  },
  components: {
    IconField,
    InputIcon
  },
  computed: {
    ...mapState('app', ['isAdmin']),
    ...mapState('productsList', ['categories'])
  },
  methods: {
    ...mapActions('app', ['logout']),
    routePath(event) {
      this.$router.push(event)
    },
    changeTheme(event) {
      this.darkTheme = event
      if (event) {
        this.$primevue.changeTheme('aura-light-indigo', 'aura-dark-indigo', 'theme-link', () => {})
      } else {
        this.$primevue.changeTheme('aura-dark-indigo', 'aura-light-indigo', 'theme-link', () => {})
      }
    },
    toggle(event) {
      this.$refs.menu.toggle(event)
    }
  }
}
</script>

<template>
  <Menubar :model="categories" class="mb-4 py-3 px-4">
    <template #start>
      <span class="inline-flex align-items-center gap-1 px-6 py-2">
        <span class="font-medium text-4xl font-semibold cursor-pointer" @click="routePath('/products')"
          >B2B<span class="text-primary">SHOP</span></span
        >
      </span>
    </template>
    <template #item="{ item, props }">
      <a
        v-ripple
        class="flex align-items-center"
        v-bind="props.action"
        @click="routePath('/products?categoryId=' + item.value)"
      >
        <!-- <span :class="item.icon" /> -->
        <span class="ml-2">{{ item.name.toUpperCase() }}</span>
      </a>
    </template>
    <template #end>
      <div class="flex align-items-center gap-4">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search"> </InputIcon>
          <InputText class="h-3rem" placeholder="Search" />
        </IconField>
        <Button
          v-if="!darkTheme"
          icon="pi pi-moon"
          severity="contrast"
          size="large"
          rounded
          @click="changeTheme(true)"
        />
        <Button
          v-if="darkTheme"
          icon="pi pi-sun"
          severity="warning"
          size="large"
          rounded
          @click="changeTheme(false)"
        />
        <Avatar
          icon="pi pi-shopping-cart"
          shape="circle"
          size="large"
          class="cursor-pointer"
          rounded
          @click="routePath('/card')"
        />
        <Avatar
          icon="pi pi-user"
          size="large"
          shape="circle"
          class="cursor-pointer"
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
          @click="toggle"
        />
        <Menu ref="menu" id="overlay_tmenu" :model="items" popup>
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
        </Menu>
      </div>
    </template>
  </Menubar>
</template>

<style></style>
