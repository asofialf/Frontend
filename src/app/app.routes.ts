import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
      path: '', 
      loadComponent: () => import('./modules/layout/main-layout/main-layout.component'),
      children: [
        {
          path: 'itinerary',
          title: 'Itinerary Detail', 
          loadComponent: () => import('./modules/planification/pages/itinerary/itinerary-detail/itinerary-detail.component')
        },
        {
          path: 'create-new-itinerary',
          title: 'Create new itinerary ', 
          loadComponent: () => import('./modules/planification/pages/itinerary/create-new-itinerary/create-new-itinerary.component')
        }
      ]
  }, 
];
