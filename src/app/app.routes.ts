import { Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: '',
      loadComponent: () => import('./context/shared/layout/main-layout/main-layout.component').then(m=>m.default),
      children: [
        {
          path:'home',
          title:'Home',
          loadComponent: ()=>import('./context/planification/interface/pages/bus-fleet/bus-fleet-home-page/bus-fleet-home-page.component').then(m=>m.BusFleetHomePageComponent)
        }
        ,
        {
          path:'bus-fleet',
          title:'bus-fleet',
          loadComponent: () => import('./context/planification/interface/pages/bus-fleet/bus-fleet-home-page/bus-fleet-home-page.component').then(m=>m.BusFleetHomePageComponent)
        },
        {
          path: 'itinerary',
          title: 'Itinerary Detail',
          loadComponent: () => import('./context/planification/interface/pages/itinerary/itinerary-detail/itinerary-detail.component'),
        /*   children: [
            {
              path: 'create-new-itinerary',
              title: 'Create new itinerary ',
              loadComponent: () => import('./context/planification/interface/pages/itinerary/create-new-itinerary/create-new-itinerary.component')
            },
          ], */
        },
        {
          path: 'create-new-itinerary',
          title: 'Create new itinerary ',
          loadComponent: () => import('./context/planification/interface/pages/itinerary/create-new-itinerary/create-new-itinerary.component').then(m=>m.default)
        },
        {
          path: 'edit-itinerary',
          title: 'Edit itinerary ',
          loadComponent: () => import('./context/planification/interface/pages/itinerary/edit-itinerary/edit-itinerary.component').then(m=>m.default)
        }

      ]
  },
];
