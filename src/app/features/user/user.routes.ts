import { Routes } from '@angular/router';
import { User } from '../../core/layout/user/user/user';
import { authGuard } from '../../core/guards/auth-guard';
export const userRoutes: Routes = [
  {
    path: "", component: User, canActivate: [authGuard],
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home').then(c => c.Home)
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products').then(c => c.Products)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./products/pages/product-details/product-details').then(c => c.ProductDetails)
      },
      {
        path: 'categories',
        loadComponent: () => import('./categories/categories').then(c => c.Categories)
      },
      {
        path: 'category/:id',
        loadComponent: () => import('./categories/pages/category/category').then(c => c.Category)
      },
      {
        path: 'brands',
        loadComponent: () => import('./brands/brands').then(c => c.Brands)
      },
      {
        path: 'search',
        loadComponent: () => import('./searchresaults/searchresaults').then(c => c.Searchresaults)
      },
      {
        path: 'specific-brand/:id',
        loadComponent: () => import('./brands/pages/brand-details/brand-details').then(c => c.BrandDetails)
      },
      {
        path: '',
        loadComponent: () => import('./payment/payment').then(c => c.Payment),canActivate: [authGuard], children: [
          {
            path: 'onlinePayment/:id',
            loadComponent: () => import('./payment/pages/online-payment/online-payment').then(c => c.OnlinePayment)
          },
          {
            path: 'cashOndelivery/:id',
            loadComponent: () => import('./payment/pages/cash-ondelivery/cash-ondelivery').then(c => c.CashOndelivery)
          },


        ]
      },

      {
        path: 'cart',
        loadComponent: () => import('./cart/cart').then(c => c.Cart)
      },
      {
        path: 'allorders',
        loadComponent: () => import('./all-orders/all-orders').then(c => c.AllOrders)
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./all-orders/pages/order-details/order-details').then(c => c.OrderDetails)
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./wish-list/wish-list').then(c=>c.WishList)
      },

      {
        path: 'settings', title: 'Settings',
        loadComponent: () => import('./settings/settings').then(c => c.Settings), children: [
          {
            path: '', redirectTo: 'Account-Settings', pathMatch: "full"
          }
          , {
            path: 'Account-Settings', title: 'Account Settings',
            loadComponent: () => import('./settings/pages/account-settings/account-settings').then(c => c.AccountSettings)
          },
          {
            path: 'Privacy-Settings', title: 'Privacy Settings',
            loadComponent: () => import('./settings/pages/privacy-settings/privacy-settings').then(c => c.PrivacySettings)
          },
          {
            path: 'Address-Settings', title: 'Address Settings',
            loadComponent: () => import('./settings/pages/address-settings/address-settings').then(c => c.AddressSettings)
          },
        ]
      },

    ]

  },
]