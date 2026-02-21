import { Routes } from '@angular/router';
import { Auth } from '../../core/layout/auth/auth/auth';
import { userGuard } from '../../core/guards/user-guard';
export const authRoutes: Routes = [
    {
        path:"",component:Auth,canActivate:[userGuard],
        children: [
    {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
    },
      {
        path: 'login',
        loadComponent: () => import('./login/login').then(c => c.Login)
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register').then(c => c.Register)
      },
      {
        path: 'forget-password',
        loadComponent: () => import('./forget-password/forget-password').then(c => c.ForgetPassword)
      }
    ]

    },
]