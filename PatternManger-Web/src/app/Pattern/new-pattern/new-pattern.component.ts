import { AlertifyService } from './../../../_services/Alertify.service';
import { PatternService } from './../../../_services/Pattern.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pattern } from 'src/models/pattern';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-new-pattern',
  templateUrl: './new-pattern.component.html',
  styleUrls: ['./new-pattern.component.css']
})
export class NewPatternComponent implements OnInit {

  @Output() cancelCreate = new EventEmitter();

  user = this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
  model: Pattern = {
    url: '',
    title: '',
    contributer: this.user,
    description: '',
    category: '',
    yarnWeight: 0,
    hookSize: 0,

  };

  constructor(private jwtHelper: JwtHelperService,
              private patternService: PatternService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    console.log(this.model);
    
  }

  cancelCreatePattern(bool: boolean){
    this.cancelCreate.emit(bool);
  }

  submitPattern(){
    console.log(this.model);

    this.patternService.create(this.model).subscribe(() => {
      this.alertify.success('Pattern Created Successfully.');
    }, error => {
      this.alertify.error(error);
    });
    this.cancelCreate.emit(false);

  }

}
