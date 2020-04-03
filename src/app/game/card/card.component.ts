import {Component, Input, OnInit} from '@angular/core';
import {Card, CardContainer} from '../../core/model.card';
import {TurnStateService} from '../../core/turn-state.service';

@Component({
  selector: 'tac-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public card: Card;

  @Input() public player: number;

  constructor(public turnStateService: TurnStateService) { }

  ngOnInit() {
  }

  public getCardContainer() {
    return new CardContainer(this.card);
  }

}
