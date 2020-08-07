import { PatternService } from './../_services/Pattern.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/Alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Pattern } from '../models/pattern';


@Injectable()
export class PatternDetailResolver implements Resolve<Pattern> {
    constructor(private patternService: PatternService,
                private router: Router,
                private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Pattern> {
        return this.patternService.getPattern(route.params['id']).pipe(
            catchError( error => {
                console.log(error);
                return of(null);
            })
        );
    }
}