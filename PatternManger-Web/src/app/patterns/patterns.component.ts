import { AlertifyService } from './../../_services/Alertify.service';
import { PatternService } from './../../_services/Pattern.service';
import { Pattern } from './../../models/pattern';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {

  creatingPattern: boolean;
  user = this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
  model: Pattern = {
    url: '',
    title: '',
    contributer: this.user,
    description: '',
  };
  patterns: Pattern[];
  constructor(private patternService: PatternService,
              private alertify: AlertifyService,
              private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.creatingPattern = false;
    this.loadPatterns();
  }
  loadPatterns(){
    this.patternService.get().subscribe((patterns: Pattern[]) => {
      this.patterns = patterns;
    }, error => {
      this.alertify.error(error);
    });
  }
  createPattern(){
    this.creatingPattern = !this.creatingPattern;
  }
  submitPattern(){
    console.log(this.model);

    this.patternService.create(this.model).subscribe(() => {
      this.alertify.success('Pattern Created Successfully.');
    }, error => {
      this.alertify.error(error);
    });
    this.creatingPattern = false;

  }

}
