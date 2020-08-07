import { User } from 'src/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/Alertify.service';
import { UserService } from './../../_services/User.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User = null;
  profile = 'profile';
  changePhoto = false;
  editing: boolean;
  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });
    this.changePhoto = false;
  }
  editPhoto(e: boolean){
    this.changePhoto = e;
  }
  onPhotoUpload(){
    this.ngOnInit();
  }
  editProfile(b: boolean){
    this.editing = b;
  }
  update(){
    console.log('updating user');
    console.log(this.user.about);
    
    this.userService.updateAboutUser(this.user).subscribe(next => {
      this.alertify.success('Updated Successfully');
      this.editing = false;
    }, error => {
      this.alertify.error(error);
    });
    
    

  }
  cancelEdit(){
    this.editing = false;
  }

}
