import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { NotificationsComponent } from './features/notifications/pages/notifications/notifications.component';
import { NotFoundComponent } from './features/not-found/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: '', redirectTo: 'register', pathMatch: 'full', title: 'home' },
      { path: 'login', component: LoginComponent, title: 'login' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'profile', component: ProfileComponent, title: 'profile' },
      { path: 'notifications', component: NotificationsComponent, title: 'notifications' },
      { path: '**', component: NotFoundComponent, title: 'notFound' },
    ],
  },
];
