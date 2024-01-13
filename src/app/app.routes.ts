import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignalsComponent } from './pages/signals/signals.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signals',
    component: SignalsComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
