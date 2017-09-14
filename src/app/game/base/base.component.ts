import {Component, Input, OnInit} from '@angular/core';
import {Base} from '../../core/model.game';

@Component({
  selector: 'tac-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  @Input() public base: Base;

  constructor() { }

  ngOnInit() {
  }

}