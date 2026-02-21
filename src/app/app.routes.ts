import { Routes } from '@angular/router';
import { userRoutes } from './features/user/user.routes';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path:"",children: authRoutes
    },
    {
        path:"",children:userRoutes
    }
];
