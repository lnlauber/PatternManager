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
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registered Successfully.');
    }, error => {
      this.alertify.error(error);
    });
    this.registeredEvent.emit(false);
  }
  cancel(){
    this.cancelEvent.emit(false);
    console.log('cancel clicked');
  }
}
