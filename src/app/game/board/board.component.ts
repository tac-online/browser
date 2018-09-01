import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Base, Board, Field, Position} from '../../core/model.game';
import {Card} from '../../core/model.card';

@Component({
  selector: 'tac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() public board: Board;
  @Input() public currentCard: Card;

  @Output() public clickField = new EventEmitter<Field>();
  @Output() public clickMarble = new EventEmitter<Position>();

  public clicked(field: Field) {
    this.clickField.emit(field);
    if (field.occupier) {
      this.clickMarble.emit(Position.fromField(field));
    }
  }

  public clickedBase(base: Base) {
    if (base.occupiers.length > 0) {
      this.clickMarble.emit(Position.fromBase(base));
    }
  }
}
