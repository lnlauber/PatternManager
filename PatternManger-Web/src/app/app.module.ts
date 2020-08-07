import { ContributorProfileComponent } from './contributors/contributor-profile/contributor-profile.component';
import { UserAccountResolver } from './../_resolvers/user-account.resolver';
import { PatternDetailResolver } from './../_resolvers/patterndetails.resolver';
import { UserProfileResolver } from './../_resolvers/user-profile.resolver';
import { PhotouploadmodalComponent } from './photouploadmodal/photouploadmodal.component';
import { NewPatternComponent } from './Pattern/new-pattern/new-pattern.component';
import { PatternDetailComponent } from './Pattern/pattern-detail/pattern-detail.component';
import { PatternService } from './../_services/Pattern.service';
import { UserService } from './../_services/User.service';
import { AuthGuard } from './../_guards/auth.guard';
import { AlertifyService } from './../_services/Alertify.service';
import { AuthService } from './../_services/Auth.service';
import { ErrorInterceptorProvider } from './../_services/error.interceptor';
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
import { PatternsComponent } from './Pattern/patterns/patterns.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { contributorsComponent } from './contributors/contributors.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';

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
      contributorsComponent,
      PatternDetailComponent,
      NewPatternComponent,
      PhotouploadmodalComponent,
      ContributorProfileComponent
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
      FileUploadModule,
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
      UserProfileResolver,
      PatternDetailResolver,
      UserAccountResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
