import { AlertifyService } from './../../_services/Alertify.service';
import { UserService } from './../../_services/User.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class contributorsComponent implements OnInit {
  users: User[];
  contributor: string;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    console.log('on init');
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }
  search(){
    console.log('search called');
    
    this.userService.searchUsers(this.contributor).subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    })
  }

}
