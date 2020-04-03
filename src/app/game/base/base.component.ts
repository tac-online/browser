import {Component, Input, OnInit} from '@angular/core';
import {Coordinates, MARBLERADIUS} from '../../core/model.positions';
import {Base, Position} from '../../core/model.game';

@Component({
  selector: 'tac-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  @Input('base')
  get base(): Base {
    return this._base;
  }

  set base(value: Base) {
    this._base = value;
  }

  @Input() position: Coordinates;
  private _base: Base;

  constructor() { }

  ngOnInit(): void {
  }

  public marbleOffset(index: number): Coordinates {
    if (this._base.occupiers.length === 4) {
      const x = index >= 2 ? 50 : 15;
      const y = index % 2 === 1 ? 50 : 15;
      return new Coordinates(x, y, MARBLERADIUS);
    } else if (this._base.occupiers.length === 3) {
      if (index !== 0) {
        const x = index === 2 ? 50 : 15;
        const y = 45;
        return new Coordinates(x, y, MARBLERADIUS);
      } else {
        return new Coordinates(32, 15, MARBLERADIUS);
      }
    } else if (this._base.occupiers.length === 2) {
      const x = index === 0 ? 15 : 50;
      return  new Coordinates(x, 31, MARBLERADIUS);
    } else {
      return new Coordinates(31, 31, MARBLERADIUS);
    }
  }

  public getPosition(): Position {
    return new Position(this._base, null, true);
  }

}
