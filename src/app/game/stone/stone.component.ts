import {Component, Input, OnInit} from '@angular/core';
import {Stone} from '../model';

@Component({
  selector: 'tac-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css']
})
export class StoneComponent implements OnInit {

  @Input() public stone: Stone;

  constructor() { }

  ngOnInit() {
  }

}
