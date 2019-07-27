import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MainComponent } from './pages/main/main.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
