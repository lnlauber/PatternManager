import { Component, OnInit } from '@angular/core';
const MAX_SIZE = 1048576;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  theFile: any = null;
  messages: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
