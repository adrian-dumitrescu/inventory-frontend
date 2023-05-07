import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule,MatFormFieldModule, MatListModule } from '@angular/material';


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '16127866-11ef-41aa-8113-af95391babd2',
      authority: 'https://login.microsoftonline.com/3f4057f3-b418-4d4e-ba84-d55b4e897d88',
      redirectUri: 'http://localhost:4200/login/oauth2/code/'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  })
}

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap: new Map<string, Array<string>>([
//       ['http://localhost:8080', ['api://16127866-11ef-41aa-8113-af95391babd2/default']]
//     ])
//   };
// }

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['email' ,'openid', 'profile', 'User.Read',],
    },
  }
}

  @NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      HomeComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      MsalModule,
      HttpClientModule,
      MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule ,MatListModule
    ],
    providers: [
      {
        provide: MSAL_INSTANCE,
        useFactory: MSALInstanceFactory
      },
      MsalService,
      {
        provide: MSAL_GUARD_CONFIG,
        useFactory: MSALGuardConfigFactory
      },
      {
        provide: MSAL_INTERCEPTOR_CONFIG,
        useClass: MsalInterceptor,
        multi: true
      },
      MsalInterceptor,
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
