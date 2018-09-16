import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-window',
  templateUrl: './display-window.component.html',
  styleUrls: ['./display-window.component.css']
})
export class DisplayWindowComponent implements OnInit {

  @Input() displayText = '';
  @Input() isDisplayResult = false;

  constructor() {
  }

  ngOnInit() {
  }

}
