import { AlertifyService } from './../../_services/Alertify.service';
import { PatternService } from './../../_services/Pattern.service';
import { Pattern } from './../../models/pattern';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {

  creatingPattern: boolean;
  model: Pattern;
  patterns: Pattern[];
  constructor(private patternService: PatternService, private alertify: AlertifyService) { }

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
    this.patternService.create(this.model).subscribe(() => {
      this.alertify.success('Pattern Created Successfully.');
    }, error => {
      this.alertify.error(error);
    });
    this.creatingPattern = false;

  }

}
