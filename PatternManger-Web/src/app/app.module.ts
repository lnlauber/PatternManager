import { PatternService } from './../_services/Pattern.service';
import { UserService } from './../_services/User.service';
import { AuthGuard } from './../_guards/auth.guard';
import { AlertifyService } from './../_services/Alertify.service';
import { AuthService } from './../_services/Auth.service';
import { ErrorInterceptor, ErrorInterceptorProvider } from './../_services/error.interceptor';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PatternsComponent } from './patterns/patterns.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { contributorsComponent } from './contributors/contributors.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      SidebarComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      PatternsComponent,
      DashboardComponent,
      AccountComponent,
      contributorsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatGridListModule,
      FormsModule,
      HttpClientModule,
      RouterModule,
      CommonModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/auth'],
         },
      }),
   ],
   providers: [
      ErrorInterceptorProvider,
      AuthService,
      AlertifyService,
      AuthGuard,
      UserService,
      PatternService,
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
