import { Router } from '@angular/router';
import { AlertifyService } from './../../_services/Alertify.service';
import { AuthService } from './../../_services/Auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() registeredEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  title = 'Register';
  model: any = {};
  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  register(){
    console.log(this.model.password);
    console.log(this.model.verifyPassword);
    if (this.model.password === this.model.verifyPassword){
      console.log('passwords matched');
      this.authService.register(this.model).subscribe(() => {
        this.alertify.success('Registered Successfully.');
        this.router.navigate(['/login']);
      }, error => {
        this.alertify.error(error);
      });
      this.registeredEvent.emit(false);
    } else {
      this.alertify.error('Passwords do not match.');
    }
  }
  cancel(){
    this.cancelEvent.emit(false);
    console.log('cancel clicked');
  }
}
