import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from '../../core/model.game';

@Component({
  selector: 'tac-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() public board: Board;

  @Output() public open = new EventEmitter<any>();
  @Output() public move = new EventEmitter<any>();
}
