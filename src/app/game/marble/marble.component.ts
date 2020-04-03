import {Component, Input, OnInit} from '@angular/core';
import {Marble, Position} from '../../core/model.game';
import {Coordinates} from '../../core/model.positions';
import {TurnStateService} from '../../core/turn-state.service';

@Component({
  selector: 'tac-marble',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.css']
})
export class MarbleComponent implements OnInit {

  @Input() marble: Marble;
  @Input() offset: Coordinates;
  @Input() position: Position;

  constructor(public turnStateService: TurnStateService) { }

  ngOnInit(): void {
    if (!this.position.isBase) console.log(this.position);
  }

}
