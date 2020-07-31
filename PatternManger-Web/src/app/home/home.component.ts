import { Router } from '@angular/router';
import { AlertifyService } from './../../_services/Alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Pattern Manager';
  loggedIn = !!localStorage.getItem('token');
  constructor(private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  logIn(loggedIn: boolean){
    this.loggedIn = loggedIn;
  }
  logout(){
    localStorage.removeItem('token');
    this.alertify.message('Successfully logged out.');
    this.loggedIn = false;
    window.location.reload();
  }

}
