import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'sign-in',
        title: 'Sign In',
        loadComponent: () => import('./context/public/pages/sign-in/sign-in.component').then(m => m.SignInComponent),
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
    ]
  }, 
  {
    path: '**',
    redirectTo: '/sign-in'
  }
];
