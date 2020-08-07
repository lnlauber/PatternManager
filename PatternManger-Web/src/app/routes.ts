import { ContributorProfileComponent } from './contributors/contributor-profile/contributor-profile.component';
import { PatternDetailResolver } from './../_resolvers/patterndetails.resolver';
import { UserProfileResolver } from './../_resolvers/user-profile.resolver';
import { PatternDetailComponent } from './Pattern/pattern-detail/pattern-detail.component';
import { Pattern } from './../models/pattern';
import { AuthGuard } from './../_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { contributorsComponent } from './contributors/contributors.component';
import { PatternsComponent } from './Pattern/patterns/patterns.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { UserAccountResolver } from 'src/_resolvers/user-account.resolver';

export const appRoutes: Routes = [

    {
        path: 'home',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'account', component: AccountComponent, resolve: {user: UserAccountResolver}},
            {path: 'patterns', component: PatternsComponent},
            {path: 'patternDetails/:id', component: PatternDetailComponent, resolve: { pattern: PatternDetailResolver}},
            {path: 'contributors', component: contributorsComponent},
            {path: 'contributors/:username', component: ContributorProfileComponent, resolve: {user: UserProfileResolver}}
        ]
    },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: PatternsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
