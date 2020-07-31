import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pattern } from './../models/pattern';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PatternService {
  baseUrl = environment.apiUrl + 'patterns/';

  constructor(private http: HttpClient) { }

  create(model: Pattern){
    return this.http.post(this.baseUrl + 'create', model, httpOptions);
  }

  get(){
    return this.http.get(this.baseUrl, httpOptions);
  }

}
