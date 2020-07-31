import { AuthService } from './../_services/Auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;
  registering = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.signedIn();
  }

  signedIn(){
    return this.authService.loggedIn();
  }

  registerEventHandler(registering: boolean){
    this.registering = true;
  }


}
