import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../core/model.card';

@Component({
  selector: 'tac-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  @Input() cards: Card[];
  @Input() turn: boolean;
  @Input() playernumber: number;

  @Output() playCard = new EventEmitter<Card>();

  constructor() { }

}
