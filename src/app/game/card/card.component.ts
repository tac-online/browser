import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../core/model.game';
import {Card} from '../../core/model.card';

@Component({
  selector: 'tac-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public card: Card;

  @Output() public playCard = new EventEmitter<Card>();

  constructor() { }

  ngOnInit() {
  }

}
