import { logging } from 'protractor';
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
  route: string;
  constructor(private alertify: AlertifyService,
              private router: Router) {
                this.route = router.url;
                console.log(this.route);
                
              }

  ngOnInit() {
    this.loggedIn = !!localStorage.getItem('token');
  }

  logIn(l: boolean){
    this.loggedIn = l;
  }
  logout(){
    localStorage.removeItem('token');
    this.alertify.message('Successfully logged out.');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
