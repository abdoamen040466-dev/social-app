import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { NotificationsComponent } from './features/notifications/pages/notifications/notifications.component';
import { NotFoundComponent } from './features/not-found/pages/not-found/not-found.component';
import { authGuard } from './core/auth/guards/auth-guard-guard';
import { guestGuard } from './core/auth/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'register',
        canActivate: [guestGuard],
      },
      { path: '', redirectTo: 'register', pathMatch: 'full', title: 'home' },
      { path: 'login', component: LoginComponent, title: 'login', canActivate: [guestGuard] },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'home', canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, title: 'profile', canActivate: [authGuard] },
      {
        path: 'notifications',
        component: NotificationsComponent,
        title: 'notifications',
        canActivate: [authGuard],
      },
      { path: '**', component: NotFoundComponent, title: 'notFound' },
    ],
  },
];
