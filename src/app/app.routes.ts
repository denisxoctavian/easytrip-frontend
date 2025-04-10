import { Routes } from '@angular/router';
//import { redirectHomeIfAuthenticated, redirectLoginIfNotAuthenticated } from './shared/guards/auth.guards';
import { TripPlannerComponent } from './components/trip-planner/trip-planner.component';
import { AuthGuard } from './shared/guards/auth.guards';
import { LoginComponent } from './features/login/login.component';
import { DealsComponent } from './components/deals/deals.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path:'', component: HomeComponent},
    { path:'', component: HomeComponent},
    { path:'trip-planner', component: TripPlannerComponent}, //canActivate: [AuthGuard] removed just for testing purposes
    { path:'login', component: LoginComponent},
    { path:'home', component: HomeComponent},
    { path:'blog', component: BlogComponent},
    { path:'deals', component: DealsComponent,canActivate: [AuthGuard]}
    
  
  ];
