<script>
export default {
  data() {
    return {
      items: [
        {
          separator: true
        },
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home'
        },
        {
          label: 'Products',
          items: [
            {
              label: 'Create',
              icon: 'pi pi-fw pi-plus'
            },
            {
              label: 'List',
              icon: 'pi pi-fw pi-list'
            },
            {
              label: 'Categories',
              icon: 'pi pi-fw pi-tags'
            }
          ]
        },
        {
          label: 'Orders',
          items: [
            {
              label: 'List',
              icon: 'pi pi-fw pi-shopping-cart'
            },
            {
              label: 'Manage',
              icon: 'pi pi-fw pi-pencil'
            },
            {
              label: 'Track',
              icon: 'pi pi-fw pi-map-marker'
            }
          ]
        },
        {
          label: 'Customers',
          items: [
            {
              label: 'Add',
              icon: 'pi pi-fw pi-user-plus'
            },
            {
              label: 'List',
              icon: 'pi pi-fw pi-users'
            },
            {
              label: 'Manage',
              icon: 'pi pi-fw pi-user-edit'
            },
            {
              label: 'Details',
              icon: 'pi pi-fw pi-user'
            }
          ]
        },
        {
          separator: true
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user'
        },
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog'
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off'
        },
        {
          separator: true
        }
      ]
    }
  }
}
</script>

<template>
  <div class="formgrid grid">
    <!-- <div class="col-12">
      <Breadcrumb :home="home" :model="items" />
    </div> -->
    <div class="col-3">
      <Menu :model="items" class="fixed w-3" style="height: 95%">
        <template #start>
          <span class="inline-flex align-items-center gap-1 px-2 py-2">
            <svg
              width="35"
              height="40"
              viewBox="0 0 35 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-2rem"
            >
              <path
                d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                fill="var(--primary-color)"
              />
              <path
                d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                fill="var(--text-color)"
              />
            </svg>
            <span class="font-medium text-xl font-semibold"
              >B2B<span class="text-primary">SHOP</span></span
            >
          </span>
        </template>
        <template #submenuheader="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <a v-ripple class="flex align-items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span
              v-if="item.shortcut"
              class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </a>
        </template>
        <template #end>
          <button
            v-ripple
            class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
          >
            <Avatar
              image="https://avatars.githubusercontent.com/u/46112930?v=4"
              class="mr-2"
              shape="circle"
            />
            <span class="inline-flex flex-column">
              <span class="font-bold">Esat Akpunar</span>
              <span class="text-sm">Admin</span>
            </span>
          </button>
        </template>
      </Menu>
    </div>
    <div class="col ml-3">
      <div class="card p-menu">
        <div class="px-4 py-5 md:px-6">
          <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                  <div>
                    <span class="block text-500 font-medium mb-3">Orders</span>
                    <div class="text-900 font-medium text-xl">152</div>
                  </div>
                  <div
                    class="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style="width: 2.5rem; height: 2.5rem"
                  >
                    <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                  </div>
                </div>
                <span class="text-green-500 font-medium">24 new </span>
                <span class="text-500">since last visit</span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                  <div>
                    <span class="block text-500 font-medium mb-3">Revenue</span>
                    <div class="text-900 font-medium text-xl">$2.100</div>
                  </div>
                  <div
                    class="flex align-items-center justify-content-center bg-orange-100 border-round"
                    style="width: 2.5rem; height: 2.5rem"
                  >
                    <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                  </div>
                </div>
                <span class="text-green-500 font-medium">%52+ </span>
                <span class="text-500">since last week</span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                  <div>
                    <span class="block text-500 font-medium mb-3">Customers</span>
                    <div class="text-900 font-medium text-xl">28441</div>
                  </div>
                  <div
                    class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                    style="width: 2.5rem; height: 2.5rem"
                  >
                    <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                  </div>
                </div>
                <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">newly registered</span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                  <div>
                    <span class="block text-500 font-medium mb-3">Products</span>
                    <div class="text-900 font-medium text-xl">152</div>
                  </div>
                  <div
                    class="flex align-items-center justify-content-center bg-purple-100 border-round"
                    style="width: 2.5rem; height: 2.5rem"
                  >
                    <i class="pi pi-shopping-bag text-purple-500 text-xl"></i>
                  </div>
                </div>
                <span class="text-green-500 font-medium">85 </span>
                <span class="text-500">responded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
