import { Component, Input, OnInit } from '@angular/core';
import { Field } from '../../core/model.game';

@Component({
  selector: 'tac-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() public field: Field;

  constructor() { }

  ngOnInit() {
  }

}
