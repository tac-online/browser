import {Component, Input, OnInit} from '@angular/core';

import {Coordinates} from '../../core/model.positions';
import {GameStateService} from '../../core/game-state.service';
import {DragDropService} from '../../core/drag-drop.service';
import {CardContainer} from '../../core/model.card';
import {TurnStateService} from '../../core/turn-state.service';

@Component({
  selector: 'tac-cardstack',
  templateUrl: './cardstack.component.html',
  styleUrls: ['./cardstack.component.css']
})
export class CardstackComponent implements OnInit {

  @Input() position: Coordinates;

  public cardsOffset = new Coordinates(70, 37, 0);

  constructor(private gameStateService: GameStateService, private dragDropService: DragDropService, private turnStateService: TurnStateService) { }

  ngOnInit(): void {
  }

  public checkDrop(event) {
    if (this.turnStateService.playCard && this.dragDropService.getItem() instanceof CardContainer) {
      event.preventDefault();
    }
  }

  public drop(event) {
    event.preventDefault();
    this.gameStateService.playCard(this.dragDropService.getItem().card);
  }

}
