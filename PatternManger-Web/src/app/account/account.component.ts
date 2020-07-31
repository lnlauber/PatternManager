import { Router } from '@angular/router';
import { AlertifyService } from './../../_services/Alertify.service';
import { UserService } from './../../_services/User.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any = {};
  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(next => {
      this.user = next;
    }, error => {

    });
    console.log(this.user);

  }


}
