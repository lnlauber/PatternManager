import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/Alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserService } from './../_services/User.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable()
export class UserAccountResolver implements Resolve<User> {
    constructor(private userService: UserService,
                private router: Router,
                private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getCurrentUser().pipe(
            catchError( error => {
                this.alertify.error('Error loading profile. Please sign in again.');
                localStorage.removeItem('token');
                this.router.navigateByUrl('/');
                return of(null);
            })
        );
    }
}