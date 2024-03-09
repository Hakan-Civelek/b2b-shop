<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          route: '/'
        },
        {
          label: 'Products',
          icon: 'pi pi-star',
          route: '/products'
        },
        {
          label: 'Projects',
          icon: 'pi pi-search',
          items: [
            {
              label: 'Core',
              icon: 'pi pi-bolt',
              shortcut: '⌘+S'
            },
            {
              label: 'Blocks',
              icon: 'pi pi-server',
              shortcut: '⌘+B'
            },
            {
              label: 'UI Kit',
              icon: 'pi pi-pencil',
              shortcut: '⌘+U'
            },
            {
              separator: true
            },
            {
              label: 'Templates',
              icon: 'pi pi-palette',
              items: [
                {
                  label: 'Apollo',
                  icon: 'pi pi-palette',
                  badge: 2
                },
                {
                  label: 'Ultima',
                  icon: 'pi pi-palette',
                  badge: 3
                }
              ]
            }
          ]
        }
      ],
      darkTheme: false
    }
  },
  methods: {
    routePath(event) {
      console.log(event)
      this.$router.push(event)
    },
    changeTheme(event) {
      this.darkTheme = event
      if (event) {
        this.$primevue.changeTheme('aura-light-indigo', 'aura-dark-indigo', 'theme-link', () => {})
      } else {
        this.$primevue.changeTheme('aura-dark-indigo', 'aura-light-indigo', 'theme-link', () => {})
      }
    }
  }
}
</script>

<template>
  <Menubar :model="items" class="mb-4 py-5">
    <template #start>
      <Avatar :image="logo" shape="circle" />
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
      <div class="flex align-items-center gap-3">
        <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
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
          rounded
          @click="changeTheme(false)"
        />
        <Avatar icon="pi pi-user" size="large" shape="circle" />
      </div>
    </template>
  </Menubar>
</template>

<style>
</style>