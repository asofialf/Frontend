import { Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: '',
      loadComponent: () => import('./modules/layout/main-layout/main-layout.component').then(m=>m.default),
      children: [
        {
          path:'home',
          title:'Home',
          loadComponent: ()=>import('./modules/planification/pages/bus-fleet/driver/views/driver-list/driver-list.component').then(m=>m.DriverListComponent)
        }
        ,
        {
          path:'bus-fleet',
          title:'bus-fleet',
          loadComponent: () => import('./modules/planification/pages/bus-fleet/views/bus-fleet-home-page/bus-fleet-home-page.component').then(m=>m.BusFleetHomePageComponent)
        },
        {
          path: 'itinerary',
          title: 'Itinerary Detail',
          loadComponent: () => import('./modules/planification/pages/itinerary/itinerary-detail/itinerary-detail.component').then(m=>m.default)
        },
        {
          path: 'create-new-itinerary',
          title: 'Create new itinerary ',
          loadComponent: () => import('./modules/planification/pages/itinerary/create-new-itinerary/create-new-itinerary.component')
        },
      ]
  },
];
