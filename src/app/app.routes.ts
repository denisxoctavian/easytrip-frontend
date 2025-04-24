import { Routes } from '@angular/router';
//import { redirectHomeIfAuthenticated, redirectLoginIfNotAuthenticated } from './shared/guards/auth.guards';
import { TripPlannerComponent } from './components/trip-planner/trip-planner.component';
import { AuthGuard } from './shared/guards/auth.guards';
import { LoginComponent } from './features/login/login.component';
import { DealsComponent } from './components/deals/deals.component';
import { HomeComponent } from './components/home/home.component';
import { TripsHistoryComponent } from './components/trips-history/trips-history.component';
import { TripComponent } from './components/trip/trip.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path:'', component: HomeComponent},
    { path:'', component: HomeComponent},
    { path:'trip-planner', component: TripPlannerComponent, canActivate: [AuthGuard] },
    { path:'login', component: LoginComponent},
    { path:'home', component: HomeComponent},
    { path:'about', component: AboutComponent},
    { path:'trips', component: TripsHistoryComponent, canActivate: [AuthGuard] },
    { path: 'trip/:id', component: TripComponent },
    { path:'deals', component: DealsComponent,canActivate: [AuthGuard]}
    
  
  ];
