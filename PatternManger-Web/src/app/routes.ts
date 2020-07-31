import { AuthGuard } from './../_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { contributorsComponent } from './contributors/contributors.component';
import { PatternsComponent } from './patterns/patterns.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
            {path: 'patterns', component: PatternsComponent, canActivate: [AuthGuard]},
            {path: 'contributors', component: contributorsComponent, canActivate: [AuthGuard]},
        ]
    },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: PatternsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
