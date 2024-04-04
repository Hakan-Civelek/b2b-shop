<script>
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
      categories: [
        {
          label: 'Electronics',
          icon: 'pi pi-desktop',
          route: '/products'
        },
        {
          label: 'Furniture',
          icon: 'pi pi-book',
          route: '/products'
        },
        {
          label: 'Clothing',
          icon: 'pi pi-shopping-cart',
          route: '/products'
        },
        {
          label: 'Sports',
          icon: 'pi pi-briefcase',
          route: '/products'
        },
        {
          label: 'Health',
          icon: 'pi pi-heart',
          route: '/products'
        }
      ],
      darkTheme: false
    }
  },
  components: {
    IconField,
    InputIcon
  },
  methods: {
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
    },
    logout() {
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <Menubar :model="categories" class="mb-4 py-3 px-4">
    <template #start>
      <Image
        src="src/assets/images/b2blogo.png"
        width="70"
        height="70"
        class="cursor-pointer"
        @click="routePath('/')"
      />
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a
        v-ripple
        class="flex align-items-center"
        v-bind="props.action"
        @click="routePath(item.route)"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down',
            { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
          ]"
        ></i>
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
          @click="routePath('/cart')"
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
        <Menu ref="menu" id="overlay_tmenu" :model="items" popup />
      </div>
    </template>
  </Menubar>
</template>

<style></style>
