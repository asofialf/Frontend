import { Routes } from '@angular/router';

export const routes: Routes = [
        {
        path: 'sign-in',
        loadComponent: () => import('./context/public/pages/sign-in/sign-in.component').then(m=>m.SignInComponent),
        },
        {
        path: 'sign-up',
        loadComponent: () => import('./context/public/pages/sign-up/sign-up.component').then(m=>m.SignUpComponent),
        },
        {
          path:'create-transport-company',
          loadComponent: () => import('./context/planification/pages/transport-company/transport-company.component').then(m=>m.TransportCompanyComponent),
        },
        {    
          path: '',
          loadComponent: () => import('./context/shared/pages/main-layout/main-layout.component').then(m=>m.default),
          children: [
          {
            path:'home',
            title:'Home',
            loadComponent: ()=>import('./context/monitoring/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent)
          },
          {
            path:'profile',
            loadComponent: () => import('./context/account/pages/profile/profile.component').then(m=>m.ProfileComponent),
          },
        {
          path:'bus-fleet',
          children:[
            {
              path:'',
              title:'bus-fleet',
              loadComponent: () => import('./context/planification/pages/bus-fleet/bus-fleet-home-page/bus-fleet-home-page.component').then(m=>m.BusFleetHomePageComponent),
            },
            {
              path:'buses',
              title:'Buses',
              loadComponent:()=> import("./context/planification/pages/bus-fleet/bus-administration/bus-administration.component").then(m=>m.BusAdministrationComponent)
            },
            {
              path:'unity',
              children: [
                {
                  path:'',
                  title:'Unity',
                  loadComponent:()=> import("./context/planification/pages/bus-unity/bus-unity-list/bus-unity-list.component").then(m=>m.BusUnityListComponent)
                },
                {
                  path:'add-bus-unit',
                  title:'Add Bus Unit',
                  loadComponent:()=> import("./context/planification/pages/bus-unity/add-bus-unity/add-bus-unity.component").then(m=>m.AddBusUnityComponent)
                },
                {
                  path:'edit-bus-unit',
                  title:'Edit Bus Unit',
                  loadComponent:()=> import("./context/planification/pages/bus-unity/edit-bus-unity/edit-bus-unity.component").then(m=>m.EditBusUnityComponent)
                },
              ]
            },
            {
              path:'drivers',
              children:[
                {
                  path:'',
                  title:'Drivers',
                  loadComponent:()=> import("./context/planification/pages/bus-fleet/driver-administration/driver-administration.component").then(m=>m.DriverAdministrationComponent),
                  children:[
                    {
                      path:':id/heartbeat-analytics',
                      title:'Driver Details',
                      loadComponent:()=> import("./context/monitoring/pages/hearbeat/heartbeat-analytics.component").then(m=>m.HeartbeatAnalyticsComponent)
                    }
                  ]
                },
                {
                  path:'add-new-driver',
                  title:'Add New Driver',
                  loadComponent:()=> import("./context/planification/pages/bus-fleet/driver-register/driver-register.component").then(m=>m.DriverRegisterComponent)
                },



              ]
            }
          ]
        },



        {
          path:':id/heartbeat-analytics',
          title:'Driver Details',
          loadComponent:()=> import("./context/monitoring/pages/hearbeat/heartbeat-analytics.component").then(m=>m.HeartbeatAnalyticsComponent)
        },


        
        {
          path: 'itinerary',
          title: 'Itinerary Detail',
          loadComponent: () => import('./context/planification/pages/itinerary/itinerary-detail/itinerary-detail.component'),
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
          loadComponent: () => import('./context/planification/pages/itinerary/create-new-itinerary/create-new-itinerary.component').then(m=>m.default)
        },
        {
          path: 'edit-itinerary',
          title: 'Edit itinerary ',
          loadComponent: () => import('./context/planification/pages/itinerary/edit-itinerary/edit-itinerary.component').then(m=>m.default)
        }
        ,
        {
          path: 'departure-schedule',
          title: 'Departure Schedule',
          loadComponent: () => import('./context/planification/pages/departure-schedule/departure-schedule-list/departure-schedule-list.component').then(m=>m.DepartureScheduleListComponent),
          /*children: [
            {
              path: 'create-new-departure-schedule',
              title: 'Create new departure schedule',
              loadComponent: () => import('./context/planification/interface/pages/departure-schedule/create-new-departure-schedule/create-new-departure-schedule.component').then(m=>m.CreateNewDepartureScheduleComponent)
            },
          ]*/
        },
        {
          path: 'create-new-departure-schedule',
          title: 'Create new departure schedule',
          loadComponent: () => import('./context/planification/pages/departure-schedule/create-new-departure-schedule/create-new-departure-schedule.component').then(m=>m.CreateNewDepartureScheduleComponent)
        },
      ]
  },
];
