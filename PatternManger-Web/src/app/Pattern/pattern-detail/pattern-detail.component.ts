import { AlertifyService } from './../../../_services/Alertify.service';
import { User } from 'src/models/user';
import { PatternService } from './../../../_services/Pattern.service';
import { Component, OnInit } from '@angular/core';
import { Pattern } from 'src/models/pattern';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.css']
})
export class PatternDetailComponent implements OnInit {

  pattern: Pattern = null;
  addingPhoto: boolean = false;

  constructor(private patternService: PatternService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadPattern();
  }
  loadPattern(){
    this.patternService.getPattern(+this.route.snapshot.params['id']).subscribe((pattern: Pattern) => {
      this.pattern = pattern;
    }, error => {
      this.alertify.error(error);
    });
  }
  addPattern(e: boolean) {
    this.addingPhoto = e;
  }

}
