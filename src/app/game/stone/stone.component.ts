import {Component, Input, OnInit} from '@angular/core';
import {Marble} from '../../core/model.game';

@Component({
  selector: 'tac-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css']
})
export class StoneComponent implements OnInit {

  @Input() public stone: Marble;

  constructor() { }

  ngOnInit() {
  }

}
