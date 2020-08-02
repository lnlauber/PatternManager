import { HttpClient } from '@angular/common/http';
import { Pattern } from './../models/pattern';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PatternService {
  baseUrl = environment.apiUrl + 'patterns/';

  constructor(private http: HttpClient) { }

  create(model: Pattern){
    console.log(this.baseUrl);
    console.log(model);
    return this.http.post(this.baseUrl + 'create', model);
  }

  get(){
    return this.http.get(this.baseUrl);
  }

}
