import { AlertifyService } from './../../_services/Alertify.service';
import { AuthService } from './../../_services/Auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loadRegister = new EventEmitter();
  @Output() signInOrOut = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }
  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
      this.signInOrOut.emit(true);
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/home/account']);
    });
  }
  register(){
    this.loadRegister.emit(true);
  }

}
