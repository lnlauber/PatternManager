import { User } from './../models/user';
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl + 'users/';
constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, httpOptions);
  }
  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + username, httpOptions);
  }

  getCurrentUser(){
    const currentUrl = 'current?username=';
    const user = this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
    return this.http.get(this.baseUrl + currentUrl + user, httpOptions);
  }

  searchUsers(searched: string): Observable<User[]> {
    const searchUrl = 'search?searched=';
    return this.http.get<User[]>(this.baseUrl + searchUrl + searched, httpOptions);
  }

}