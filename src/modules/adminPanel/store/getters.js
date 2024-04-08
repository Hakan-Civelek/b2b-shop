
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
        label: 'Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        route: '/admin/orders'
      },
      {
        label: 'Customers',
        icon: 'pi pi-fw pi-users',
        route: '/admin/customers'
      },
      {
        separator: true
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        route: '/profile'
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        route: '/settings'
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
