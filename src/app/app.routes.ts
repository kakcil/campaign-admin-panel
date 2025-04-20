import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './pages/campaign-create/campaign-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: MainLayoutComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'campaigns', component: CampaignListComponent },
      { path: 'create', component: CampaignCreateComponent },
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
