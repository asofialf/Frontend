import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    loadComponent: () => import('./context/public/pages/sign-in/sign-in.component').then(m => m.default),
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./context/public/pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
  },
  {
    path: 'create-transport-company',
    loadComponent: () => import('./context/planification/pages/transport-company/transport-company.component').then(m => m.TransportCompanyComponent),
  },
  {
    path: '',
    loadComponent: () => import('./context/shared/pages/main-layout/main-layout.component').then(m => m.default),
    children: [

    ]
  }, 
  {
    path: '**',
    redirectTo: '/sign-in'
  }
];
