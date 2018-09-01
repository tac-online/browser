import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Field } from '../../core/model.game';

@Component({
  selector: 'tac-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() public field: Field;

  @Output() public clickField = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public getClasses(): string {
    let classes = 'tac-field';
    if (this.field.startField) {
      classes += ' start-field player-' + this.field.player;
    }
    if (this.field.number % 4 == 0) {
      classes += ' highlighted';
    }
    return classes;
  }

}
