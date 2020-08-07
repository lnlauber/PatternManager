import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/User.service';
import { AlertifyService } from 'src/_services/Alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contributor-profile',
  templateUrl: './contributor-profile.component.html',
  styleUrls: ['./contributor-profile.component.css']
})
export class ContributorProfileComponent implements OnInit {

  user: any = null;
  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });
  }
}
