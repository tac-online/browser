import {Component, Input, OnInit} from '@angular/core';
import {Coordinates, MARBLERADIUS} from '../../core/model.positions';
import {Field, Position} from '../../core/model.game';
import {GameStateService} from '../../core/game-state.service';
import {DragDropService} from '../../core/drag-drop.service';
import {ActionService} from '../../core/action.service';
import {TurnStateService} from '../../core/turn-state.service';

@Component({
  selector: 'tac-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() position: Coordinates;
  @Input() field: Field;

  constructor(private gameStateService: GameStateService, private dragDropService: DragDropService, private actionService: ActionService, private turnStateService: TurnStateService) { }

  ngOnInit(): void {
  }

  public marbleOffset(): Coordinates {
    return new Coordinates(0, 0, MARBLERADIUS);
  }

  public checkDrop(event) {
    if (this.turnStateService.moveMarble && this.dragDropService.getItem() instanceof Position) {
      event.preventDefault();
    }
  }

  public drop(event) {
    event.preventDefault();
    this.actionService.moveMarbleResolve([this.dragDropService.getItem(), this.getPosition()]);
  }

  public getPosition(): Position {
    return new Position(null, this.field, false);
  }

}
