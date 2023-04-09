import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'}, // set default path
  {path:'home',component:HomeComponent}
  // {path: '**', component: MsalRedirectComponent,canActivate: [MsalGuard]},// if path not found or any other request

  // {path: '', component: MsalRedirectComponent, canActivate: [MsalGuard]},
  // {path: '', redirectTo: 'main', pathMatch: 'full'}, // set default path
  // { path: 'auth', component: MsalRedirectComponent },
  // { path: '**', pathMatch: 'full', redirectTo: '' } // catch any unfound routes and redirect to home page
];
// const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
