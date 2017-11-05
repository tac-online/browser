import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from '../../core/model.game';
import {Card} from '../../core/model.card';

@Component({
  selector: 'tac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() public board: Board;
  @Input() public currentCard: Card;

  @Output() public open = new EventEmitter<any>();
  @Output() public move = new EventEmitter<any>();
}
