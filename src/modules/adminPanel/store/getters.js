
export default {
  dashboardItems() {
    return [
      {
        separator: true
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        route: '/admin/dashboard'
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-star',
        route: '/admin/products'
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-th-large',
        route: '/admin/categories'
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        route: '/admin/orders'
      },
      {
        label: 'Customers',
        icon: 'pi pi-fw pi-user',
        route: '/admin/customers'
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        route: '/admin/users'
      },
      {
        separator: true
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        route: '/admin/profile'
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        route: '/admin/settings'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        route: '/logout'
      },
      {
        separator: true
      }
    ]
  }
}
