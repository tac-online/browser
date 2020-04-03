import { Injectable } from '@angular/core';

@Injectable()
export class TurnStateService {

  public playCard = false;
  public cardPlayed = false;
  public moveMarble = false;
  public pressSkip = false;
  public pressFinish = false;
  public marbleMoved = false;

  constructor() { }

  public resetAll() {
    this.playCard = false;
    this.cardPlayed = false;
    this.moveMarble = false;
    this.pressSkip = false;
    this.pressFinish = false;
    this.marbleMoved = false;
  }
}
